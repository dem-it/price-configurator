import ConfigurationQuestion from "./ConfigurationQuestion"

export default interface ConfigurationQuestionGroup {
    questions: ConfigurationQuestion[];
    title: string;
    id: string;
}