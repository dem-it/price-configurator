import Identifier from "@/components/display/Identifier"
import ConfigurationQuestionType from "@/data/configurator/ConfigurationQuestionType"
import { AnswerProps } from "../Properties"
import { getAnswer, getQuestion } from "../utils/PropertiesUtils"
import MultipleAnswer from "./MultipleAnswer"
import OpenTextAnswer from "./OpenTextAnswer"
import RegularAnswer from "./RegularAnswer/index"

const Answer = (props: AnswerProps) => {
  const question = getQuestion(props)
  const answer = getAnswer(props)

  return <>
    <Identifier id={answer.id} description={`Question ${question.title} - Answer ${props.answerIndex + 1}: ${answer.title}`} />

    {question.type === ConfigurationQuestionType.Regular && <RegularAnswer {...props} />}
    {question.type === ConfigurationQuestionType.Multiple && <MultipleAnswer {...props} />}
    {question.type === ConfigurationQuestionType.OpenText && <OpenTextAnswer {...props} />}
  </>
}

export default Answer