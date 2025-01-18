export interface ConfigurationDto {
    partitionKey: string;
    rowKey: string;
    name: string;
    data?: string | undefined;
}

export const EntityToConfigurationDto = (entity: any): ConfigurationDto => {
    return {
        partitionKey: entity.partitionKey ?? "",
        rowKey: entity.rowKey ?? "",
        name: entity.Name as string,
        data: entity.data as string | undefined
    }
}