import { ConfigurationDto, EntityToConfigurationDto } from "@/api/tables/ConfigurationDto"
import { calculateRandomConfigurationId } from "@/utils/calculations/calculateNewConfigurationId"
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

  if(req.query.organizationId === undefined) {
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
      return handleGetRequest(req, res, tableClient, organizationId)
    case 'POST':
      return handlePostRequest(req, res, tableClient, organizationId)
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}


const handleGetRequest = async (req: NextApiRequest, res: NextApiResponse, tableClient: TableClient, organizationId: string) => {
 try {
    const entities = tableClient.listEntities({
      queryOptions: { filter: `PartitionKey eq '${organizationId}'` }
    })
    const result = []
    for await (const entity of entities) {
      const configData = EntityToConfigurationDto(entity)
      result.push(configData)
    }
    res.status(200).json(result)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

const handlePostRequest = async (req: NextApiRequest, res: NextApiResponse, tableClient: TableClient, organizationId: string) => {
  try
  {
    const id = calculateRandomConfigurationId()

    const data: ConfigurationDto = {
      partitionKey: organizationId,
      rowKey: id,
      name: `Configurator ${id}`,
    }

    await tableClient.createEntity(data)
    
    res.status(200).json({ id: id })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

export default apiroute