// import ConfigurationAnswer from "@/data/configurator/ConfigurationAnswer"
import ConfigurationQuestion from "@/data/configurator/ConfigurationQuestion"
import ConfigurationGroup from "@/data/configurator/ConfigurationQuestionGroup"
import { GroupProps, PreviewPropsWithAnswers, QuestionProps } from "../Properties"

export const getGroupById = (previewPropsWithAnswers: PreviewPropsWithAnswers, groupId: string) : ConfigurationGroup => {
    return previewPropsWithAnswers.data.groups.find(x => x.id === groupId)!
}

export const getGroup = (groupProps: GroupProps) : ConfigurationGroup => {
    return getGroupById(groupProps, groupProps.groupId)
}

export const getQuestionByIdWithProps = (previewPropsWithAnswers: PreviewPropsWithAnswers, questionId: string) : ConfigurationQuestion => {
    for (const group of previewPropsWithAnswers.data.groups) {
        const question = group.questions.find(x => x.id === questionId)
        if (question) {
            return question
        }
    }
    throw new Error(`Question with id ${questionId} not found`)
}

export const getQuestionById = (groupProps: GroupProps, questionId: string) : ConfigurationQuestion => {
    const group = getGroup(groupProps)
    return group.questions.find(x => x.id === questionId)!
}

export const getQuestion = (questionProps: QuestionProps) : ConfigurationQuestion => {
    return getQuestionById(questionProps, questionProps.questionId)
}

// export const getAnswerById = (questionProps: QuestionProps, answerId: string) : ConfigurationAnswer => {
//     const question = getQuestion(questionProps)
//     return question.answers.find(x => x.id === answerId)!
// }

// export const getAnswer = (answerProps: AnswerProps) : ConfigurationAnswer => {
//     return getAnswerById(answerProps, answerProps.answerId)
// }