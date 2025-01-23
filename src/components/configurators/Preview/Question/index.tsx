import ConfigurationQuestionType from "@/data/configurator/ConfigurationQuestionType"
import MultipleQuestion from "./MultipleQuestion"
import QuestionProps from "./QuestionProps"
import RegularQuestion from "./RegularQuestion"

const Question = (props: QuestionProps) => {
  const type = props.question?.type

  if(!type)
    return <></>
  if (type === ConfigurationQuestionType.Regular)
    return <RegularQuestion {...props} />
  if (type === ConfigurationQuestionType.Multiple)
    return <MultipleQuestion {...props} />

  return <></>
}

export default Question