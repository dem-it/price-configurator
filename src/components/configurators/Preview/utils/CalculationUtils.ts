import { SelectedAnswerUtils } from "@/data/configurator/selection/SelectedAnswer"
import { GroupProps } from "../Properties"
import { getGroup } from "./PropertiesUtils"

export const calculateCanGoNext = (props: GroupProps) => {
  if(!props.groupId)
    return false

  const group = getGroup(props)

  //check if all the mandatory questions in this group are answered
  const allMandatoryAnswered = group.questions.every((question) => {
    if (question.optionMandatory)
      return SelectedAnswerUtils.hasAnswer(props.selectedAnswers, question)
    return true
  })

  return allMandatoryAnswered

  //   else if (currentGroup.type === ConfigurationQuestionType.Multiple)
  //     setCanGoNext(true)
  //   else if (selectedAnswer)
  //     setCanGoNext(true)
  //   else
  //     setCanGoNext(false)
  return true
}