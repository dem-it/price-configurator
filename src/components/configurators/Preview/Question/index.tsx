import ConfigurationQuestionType from "@/data/configurator/ConfigurationQuestionType"
import QuestionProps from "./QuestionProps"
import RegularQuestion from "./RegularQuestion"

const Question = (props: QuestionProps) => {
  const question = props.question

  if (question && question.type === ConfigurationQuestionType.Regular)
    return <RegularQuestion {...props} />
  else
    return <></>
}

export default Question