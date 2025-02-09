import ConfigurationAnswer from "@/data/configurator/ConfigurationAnswer"
import ConfigurationQuestion from "@/data/configurator/ConfigurationQuestion"
import { SelectedAnswerUtils } from "@/data/configurator/selection/SelectedAnswer"
import { formatPrice } from "@/utils/format"
import { Paper } from "@mui/material"
import { useTranslation } from "react-i18next"
import { PreviewPropsWithAnswers } from "./Properties"
import { getQuestionByIdWithProps } from "./utils/PropertiesUtils"

const ResultSmall = (props: PreviewPropsWithAnswers) => {
  const { t, i18n } = useTranslation(["configurator"])

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
      <h2>{t("resultsmall.title")}</h2>
      {t("resultsmall.selected-options")}
      {props.selectedAnswers.length === 0 && <p>{t("resultsmall.no-options-selected")}</p>}
      <ul>
        {props.selectedAnswers.map((answer, index) => {
          const question = getQuestion(answer.questionId)

          const answers = SelectedAnswerUtils.getAnswerIds(answer)

          return answers.map(answerId => {
            const configurationAnswer = getAnswer(question, answerId)
            return <li key={`result-question-${question.id}-answer-${configurationAnswer.id}`}>
              {configurationAnswer.title} {!configurationAnswer.surchargeHidden && (<><br />+ {formatPrice(configurationAnswer.surcharge)}</>)}
            </li>
          })
        })}
      </ul>

      {openTextAnswers.length > 0 && (
        <>
          {t("resultsmall.open-text-answers")}
          <ul>
            {openTextAnswers.map((answer) => {
              const question = getQuestion(answer.questionId)

              return (
                <li key={`result-question-${question.id}-answer`}>
                  <b>{question.title}</b>
                  <br />{answer.openText?.answer}
                </li>
              )
            })}
          </ul>
        </>
      )}
      <hr />
      <b>
        {t("resultsmall.grand-total")}
        <br />{formatPrice(getTotalPrice())}
      </b>
    </Paper>
  )
}

export default ResultSmall

