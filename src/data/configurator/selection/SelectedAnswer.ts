import SelectedAnswerMultiple from "./SelectedAnswerMultiple"
import SelectedAnswerRegular from "./SelectedAnswerRegular"

export default interface SelectedAnswer
{
    questionId: string,
    regular?: SelectedAnswerRegular,
    multiple?: SelectedAnswerMultiple,
}

export const SelectedAnswerUtils = 
{
    getAnswerIds: (answer: SelectedAnswer): string[] => {
        if (answer.regular !== undefined) {
            return [answer.regular.answerId]
        }
        if (answer.multiple !== undefined) {
            return answer.multiple.answerIds
        }
        return []
    }
}
