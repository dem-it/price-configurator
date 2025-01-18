import { EntityToConfigurationDto } from "@/api/tables/ConfigurationDto"
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
    case 'GET':
      return handleGetRequest(req, res, tableClient, organizationId, id)
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

const handleGetRequest = async (req: NextApiRequest, res: NextApiResponse, tableClient: TableClient, organizationId: string, id: string) => {

  try {
    const entity = await tableClient.getEntity(organizationId, id)

    const result = EntityToConfigurationDto(entity)

    res.status(200).json(result)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

export default apiroute