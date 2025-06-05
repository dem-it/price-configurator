import ConfigurationAnswer from "./ConfigurationAnswer"
import ConfigurationQuestionType from "./ConfigurationQuestionType"
import ConfigurationOptionHide from "./options/ConfigurationOptionHide"

export default interface ConfigurationQuestion {
    id: string;
    title: string;
    description: string;
    variant?: string;
    type: ConfigurationQuestionType;
    answers: ConfigurationAnswer[];
    optionHide?: ConfigurationOptionHide;
    optionMandatory?: boolean;
}