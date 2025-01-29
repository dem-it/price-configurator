import ConfigurationMeta from "./ConfigurationMeta"
import ConfigurationQuestionGroup from "./ConfigurationQuestionGroup"

export default interface ConfigurationData {
    groups: ConfigurationQuestionGroup[];
    meta?: ConfigurationMeta;
}

