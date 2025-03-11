import { BlobServiceClient, ContainerClient } from "@azure/storage-blob"
import dotenv from "dotenv"
import { NextApiRequest, NextApiResponse } from "next"

dotenv.config()

interface InputProps {
  organizationId: string,
  configurationId: string
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
    return "configuration is not defined"

  return undefined
}

const getInputs = (req: NextApiRequest): InputProps => {
  return {
    organizationId: req.query.organizationId as string,
    configurationId: req.query.configurationId as string
  }
}

const apiroute = async (req: NextApiRequest, res: NextApiResponse) => {
  const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING
  const containerName = "email-templates"

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
    res.setHeader("Allow", ["GET", "POST"])
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
    res.status(400).json({ error: "No html provided" })
    return
  }

  if (req.body.length > 5 * 1024 * 1024) {
    res.status(400).json({ error: "Html is too large, maximum 1 MB" })
    return
  }

  try {
    const blobName = constructBlobName(payload)
    const blockBlobClient = containerClient.getBlockBlobClient(blobName)

    const template = req.body.template

    const templateBuffer = Buffer.from(template, "utf-8")
    await blockBlobClient.uploadData(templateBuffer)

    res.status(201).json({ message: "Html uploaded successfully" })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

const handleGetRequest = async (req: NextApiRequest, res: NextApiResponse, containerClient: ContainerClient, payload: InputProps) => {

  try {
    const blockBlobClient = containerClient.getBlockBlobClient(constructBlobName(payload))
    if(!await blockBlobClient.exists())
    {
      res.status(204).json({ message: "No content" })
      return
    }

    const result = await blockBlobClient.downloadToBuffer()
    res.setHeader("Content-Type", "text/html")
    res.setHeader("Content-Disposition", `inline; filename="${payload.configurationId}.html"`)
    res.setHeader("Cache-Control", "public, max-age=31536000")
    res.status(200).send(result)

  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

const constructBlobName = (payload: InputProps) => {
  return `${payload.organizationId}/${payload.configurationId}.html`
}

export default apiroute