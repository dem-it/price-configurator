import ConfigurationAnswer from "./ConfigurationAnswer"
import ConfigurationQuestionType from "./ConfigurationQuestionType"

export default interface ConfigurationQuestion {
    id: string;
    title: string;
    description: string;
    type: ConfigurationQuestionType;
    answers: ConfigurationAnswer[];
}