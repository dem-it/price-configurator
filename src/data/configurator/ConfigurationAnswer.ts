import ConfigurationOptionHide from "./options/ConfigurationOptionHide"

export default interface ConfigurationAnswer {
    id: string
    title: string
    description: string
    imageId?: string | undefined
    surchargeHidden?: boolean | undefined
    surcharge: number
    optionHide?: ConfigurationOptionHide
}
