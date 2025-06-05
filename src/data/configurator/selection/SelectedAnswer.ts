import ConfigurationQuestion from "../ConfigurationQuestion"
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
  },
  hasAnswer: (answers: SelectedAnswer[], question: ConfigurationQuestion): boolean => {
    //check if the answers array contains an answer for the given question
    const answer = answers.find((answer) => answer.questionId === question.id)
    if (!answer)
      return false

    if( answer.regular !== undefined) {
      //regular answers are always answered
      return true
    }
    if( answer.multiple !== undefined) {
      //multiple answers are answered if there are any answerIds
      return answer.multiple.answerIds.length > 0
    }
    if( answer.openText !== undefined) {
      //open text answers are answered if the answer is not empty
      return answer.openText.answer.trim().length > 0
    }

  }
}
