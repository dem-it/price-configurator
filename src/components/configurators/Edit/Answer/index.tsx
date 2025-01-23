import Identifier from "@/components/display/Identifier"
import ConfigurationQuestionType from "@/data/configurator/ConfigurationQuestionType"
import AnswerProps from "./AnswerProps"
import MultipleAnswer from "./MultipleAnswer"
import RegularAnswer from "./RegularAnswer"

const Answer = (props: AnswerProps) => {
  const question = props.question
  const answer = props.answer

  return <>
    <Identifier id={answer.id} description={`Answer ${props.index + 1}: ${answer.title}`} />

    {question.type === ConfigurationQuestionType.Regular && <RegularAnswer {...props} />}
    {question.type === ConfigurationQuestionType.Multiple && <MultipleAnswer {...props} />}
  </>
}

export default Answer