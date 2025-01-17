import { ConfigurationDto } from "@/api/tables/ConfigurationDto"
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

  const partitionKey = req.query.organizationId as string

  if (!connectionString) {
    throw new Error("AZURE_STORAGE_CONNECTION_STRING is not defined")
  }

  try {
    const tableServiceClient = getTableServiceClient(connectionString)

    await tableServiceClient.createTable(tableName)

    const tableClient = getTableClient(connectionString, tableName)

    const entities = tableClient.listEntities({
      queryOptions: { filter: `PartitionKey eq '${partitionKey}'` }
    })
    const result = []
    for await (const entity of entities) {
      const configData: ConfigurationDto = {
        PartitionKey: entity.partitionKey ?? "",
        RowKey: entity.rowKey ?? "",
        Name: entity.Name as string,
      }
      result.push(configData)
    }
    res.status(200).json(result)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

export default apiroute