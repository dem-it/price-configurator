import SelectedAnswerMultiple from "./SelectedAnswerMultiple"
import SelectedAnswerOpenText from "./SelectedAnswerOpenText"
import SelectedAnswerRegular from "./SelectedAnswerRegular"

export default interface SelectedAnswer
{
    questionId: string,
    regular?: SelectedAnswerRegular,
    multiple?: SelectedAnswerMultiple,
    openText?: SelectedAnswerOpenText
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
