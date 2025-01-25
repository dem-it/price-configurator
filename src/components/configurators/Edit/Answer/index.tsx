import { getAnswer, getQuestion } from "@/components/configurators/utils/DataUtils"
import Identifier from "@/components/display/Identifier"
import ConfigurationQuestionType from "@/data/configurator/ConfigurationQuestionType"
import { AnswerProps } from "../Properties"
import MultipleAnswer from "./MultipleAnswer"
import RegularAnswer from "./RegularAnswer"

const Answer = (props: AnswerProps) => {
  const question = getQuestion(props)
  const answer = getAnswer(props)

  return <>
    <Identifier id={answer.id} description={`Question ${question.title} - Answer ${props.answerIndex + 1}: ${answer.title}`} />

    {question.type === ConfigurationQuestionType.Regular && <RegularAnswer {...props} />}
    {question.type === ConfigurationQuestionType.Multiple && <MultipleAnswer {...props} />}
  </>
}

export default Answer