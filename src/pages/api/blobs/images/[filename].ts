import { BlobServiceClient, ContainerClient } from "@azure/storage-blob"
import dotenv from "dotenv"
import { NextApiRequest, NextApiResponse } from "next"

dotenv.config()

interface InputProps {
  organizationId: string,
  configurationId: string,
  filename: string
}

/**
 * Helper function to create blob service client
 *
 * @param connectionString
 * @returns
 */
const getBlobServiceClient = (connectionString: string) => {
  return BlobServiceClient.fromConnectionString(connectionString)
}

const validateInput = (req: NextApiRequest): string | undefined => {

  if (req.query.organizationId === undefined)
    return "organizationId is not defined"

  if (req.query.configurationId === undefined)
    return "organizationId is not defined"

  if (req.query.filename === undefined)
    return "filename is not defined"

  return undefined
}

const getInputs = (req: NextApiRequest): InputProps => {
  return {
    organizationId: req.query.organizationId as string,
    configurationId: req.query.configurationId as string,
    filename: req.query.filename as string
  }
}

const apiroute = async (req: NextApiRequest, res: NextApiResponse) => {
  const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING
  const containerName = "images"

  const error = validateInput(req)
  if (error) {
    res.status(400).json({ error: error })
    return
  }

  const inputs = getInputs(req)

  if (!connectionString) {
    throw new Error("AZURE_STORAGE_CONNECTION_STRING is not defined")
  }

  const blobServiceClient = getBlobServiceClient(connectionString)
  const containerClient = blobServiceClient.getContainerClient(containerName)

  switch (req.method) {
  case "GET":
    return handleGetRequest(req, res, containerClient, inputs)
  case "POST":
    return handlePostRequest(req, res, containerClient, inputs)
  default:
    res.setHeader("Allow", ["GET"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

/**
 * Get the image by the request and store it to blob storage
 *
 * @param req
 * @param res
 * @param containerClient
 * @param organizationId
 * @param filename
 */
const handlePostRequest = async (req: NextApiRequest, res: NextApiResponse, containerClient: ContainerClient, payload: InputProps) => {

  if (!req.body) {
    res.status(400).json({ error: "No image provided" })
    return
  }

  console.log("Body length: ", req.body.length)
  if (req.body.length > 5 * 1024 * 1024) {
    res.status(400).json({ error: "Image is too large, maximum 1 MB" })
    return
  }

  const allowedFileTypes = [".jpg", ".jpeg", ".gif", ".bmp", ".tiff", ".svg", ".png"]
  const isValidFileType = allowedFileTypes.some(type => payload.filename.endsWith(type))

  if (!isValidFileType) {
    res.status(400).json({ error: "Invalid file type, please use .png or .jpg" })
    return
  }

  try {
    const blobName = constructBlobName(payload)
    const blockBlobClient = containerClient.getBlockBlobClient(blobName)

    const base64File = req.body.file
    const buffer = Buffer.from(base64File, "base64")

    await blockBlobClient.uploadData(buffer)

    res.status(201).json({ message: "Image uploaded successfully" })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

const handleGetRequest = async (req: NextApiRequest, res: NextApiResponse, containerClient: ContainerClient, payload: InputProps) => {

  try {
    const blockBlobClient = containerClient.getBlockBlobClient(constructBlobName(payload))
    const result = await blockBlobClient.downloadToBuffer()

    const filename = payload.filename
    if (filename.endsWith(".jpg") || filename.endsWith(".jpeg"))
      res.setHeader("Content-Type", "image/jpeg")
    else if (filename.endsWith(".gif"))
      res.setHeader("Content-Type", "image/gif")
    else if (filename.endsWith(".bmp"))
      res.setHeader("Content-Type", "image/bmp")
    else if (filename.endsWith(".tiff"))
      res.setHeader("Content-Type", "image/tiff")
    else if (filename.endsWith(".svg"))
      res.setHeader("Content-Type", "image/svg+xml")
    else
      res.setHeader("Content-Type", "image/png")

    res.setHeader("Content-Disposition", `inline; filename="${filename}"`)
    res.setHeader("Cache-Control", "public, max-age=31536000")
    res.status(200).send(result)

  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

const constructBlobName = (payload: InputProps) => {
  return `${payload.organizationId}/${payload.configurationId}/${payload.filename}`
}

export default apiroute