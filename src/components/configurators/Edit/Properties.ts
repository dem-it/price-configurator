import { ConfigurationDto } from "@/api/tables/ConfigurationDto"
import ConfigurationAnswer from "@/data/configurator/ConfigurationAnswer"
import ConfigurationData from "@/data/configurator/ConfigurationData"
import ConfigurationQuestion from "@/data/configurator/ConfigurationQuestion"


export interface GroupsProps {
    configuration: ConfigurationDto,
    data: ConfigurationData,
    saveToDatabase: (updatedData: ConfigurationData) => void
}

export interface GroupProps extends GroupsProps {
    groupId: string
}

export interface QuestionProps extends GroupProps {
    questionId: string,
    saveQuestion: (id: string, updateQuestion: (arg0: ConfigurationQuestion) => void) => void
}

export interface AnswerProps extends QuestionProps {
    answerId: string,
    answerIndex: number,
    saveAnswer: (id: string, updateAnswer: (arg0: ConfigurationAnswer) => void) => void
}