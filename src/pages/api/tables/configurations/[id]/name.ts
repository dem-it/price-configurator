import { TableClient, TableServiceClient } from "@azure/data-tables"
import dotenv from "dotenv"
import { NextApiRequest, NextApiResponse } from "next"

dotenv.config()

/**
 * Helper function to create table client
 *
 * @param connectionString
 * @param tableName
 * @returns
 */
const getTableClient = (connectionString: string, tableName: string) => {
  return TableClient.fromConnectionString(connectionString, tableName)
}

/**
 * Helper function to create table service client
 *
 * @param connectionString
 * @returns
 */
const getTableServiceClient = (connectionString: string) => {
  return TableServiceClient.fromConnectionString(connectionString)
}

const apiroute = async (req: NextApiRequest, res: NextApiResponse) => {
  const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING
  const tableName = "configurations"
  const id = req.query.id as string

  if (req.query.organizationId === undefined) {
    res.status(400).json({ error: "organizationId is not defined" })
    return
  }

  const organizationId = req.query.organizationId as string

  if (!connectionString) {
    throw new Error("AZURE_STORAGE_CONNECTION_STRING is not defined")
  }

  const tableServiceClient = getTableServiceClient(connectionString)
  await tableServiceClient.createTable(tableName)
  const tableClient = getTableClient(connectionString, tableName)

  switch (req.method) {
  case "PUT":
    return handlePutRequest(req, res, tableClient, organizationId, id)
  default:
    res.setHeader("Allow", ["PUT"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

const handlePutRequest = async (req: NextApiRequest, res: NextApiResponse, tableClient: TableClient, organizationId: string, id: string) => {

  try {
    const body = req.body
    console.log("Body", body)

    const entity = {
      partitionKey: organizationId,
      rowKey: id,
      name: body
    }

    await tableClient.updateEntity(entity)

    res.status(204).json({ })
  } catch (error: any) {
    console.error(error)
    res.status(500).json({ error: error.message })
  }
}

export default apiroute