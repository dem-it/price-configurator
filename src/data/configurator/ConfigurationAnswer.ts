import ConfigurationOptionHide from "./options/ConfigurationOptionHide"

export default interface ConfigurationAnswer {
    id: string
    title: string
    description: string
    imageId?: string | undefined
    surcharge: number
    optionHide?: ConfigurationOptionHide
}
