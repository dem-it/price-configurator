import ConfigurationAnswer from "@/data/configurator/ConfigurationAnswer"
import ConfigurationQuestion from "@/data/configurator/ConfigurationQuestion"
import { SelectedAnswerUtils } from "@/data/configurator/selection/SelectedAnswer"
import { formatPrice } from "@/utils/format"
import { Paper } from "@mui/material"
import { PreviewPropsWithAnswers } from "./Properties"
import { getQuestionByIdWithProps } from "./utils/PropertiesUtils"

const ResultSmall = (props: PreviewPropsWithAnswers) => {

  const getQuestion = (questionId: string): ConfigurationQuestion => {
    return getQuestionByIdWithProps(props, questionId)
  }

  const getTotalPrice = () => {
    let total = 0
    props.selectedAnswers.forEach(answer => {
      const question = getQuestion(answer.questionId)

      SelectedAnswerUtils.getAnswerIds(answer).forEach(answerId => {
        total += question.answers.find(x => x.id === answerId)!.surcharge
      })
    })

    return total
  }

  function getAnswer(question: ConfigurationQuestion, answerId: string): ConfigurationAnswer {
    return question.answers.find(x => x.id === answerId)!
  }

  const openTextAnswers = props.selectedAnswers.filter(x => x.openText)

  return (
    <Paper
      sx={{ padding: 2 }}>
      <h2>Result</h2>
      Selected options:
      {props.selectedAnswers.length === 0 && <p>No options selected</p>}
      <ul>
        {props.selectedAnswers.map((answer, index) => {
          const question = getQuestion(answer.questionId)

          const answers = SelectedAnswerUtils.getAnswerIds(answer)

          return answers.map(answerId => {
            const configurationAnswer = getAnswer(question, answerId)
            return <li key={`result-question-${question.id}-answer-${configurationAnswer.id}`}>
              {question.title}: {configurationAnswer.title} ({formatPrice(configurationAnswer.surcharge)})
            </li>
          })
        })}
      </ul>

      {openTextAnswers.length > 0 && (
        <>
          Open text answers:
          <ul>
            {openTextAnswers.map((answer) => {
              const question = getQuestion(answer.questionId)

              return (
                <li key={`result-question-${question.id}-answer`}>
                  {question.title}: {answer.openText?.answer}
                </li>
              )
            })}
          </ul>
        </>
      )}
      <hr />
      <b>
        Grand total: {formatPrice(getTotalPrice())}
      </b>
    </Paper>
  )
}

export default ResultSmall

