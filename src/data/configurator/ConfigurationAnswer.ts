import ConfigurationOptionHide from "./options/ConfigurationOptionHide"

export default interface ConfigurationAnswer {
    id: string
    title: string
    description: string
    imageId?: string | undefined
    imageUrl?: string | undefined
    surchargeHidden?: boolean | undefined
    surcharge: number
    optionHide?: ConfigurationOptionHide
    imageWidth?: string | number
    imageHeight?: string | number
}
