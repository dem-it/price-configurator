import ConfigurationQuestionType from "@/data/configurator/ConfigurationQuestionType"
import ConfigurationOptionHide from "@/data/configurator/options/ConfigurationOptionHide"
import { PreviewPropsWithAnswers } from "../Properties"
import { getQuestionByIdWithProps } from "./PropertiesUtils"

interface OptionHideProps {
  optionHide?: ConfigurationOptionHide
  propsWithAnswers: PreviewPropsWithAnswers
}

export const checkIfNeedsToBeHidden = (props: OptionHideProps) => {
  if (!props.optionHide)
    return false

  const groupProps = props.propsWithAnswers
  const optionHide = props.optionHide

  const question = getQuestionByIdWithProps(groupProps, optionHide.questionId)
  const selectedAnswer = groupProps.selectedAnswers.find(x => x.questionId === optionHide.questionId)

  switch (question.type) {
  case ConfigurationQuestionType.Regular:
    if (selectedAnswer?.regular?.answerId === optionHide.answerId)
      return true
    break
  case ConfigurationQuestionType.Multiple:
    if (selectedAnswer?.multiple?.answerIds.includes(optionHide.answerId))
      return true
    break
  case ConfigurationQuestionType.OpenText:
    break
  }
  return false
}