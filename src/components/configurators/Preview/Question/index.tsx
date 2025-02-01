import ConfigurationQuestionType from "@/data/configurator/ConfigurationQuestionType"
import { QuestionProps } from "../Properties"
import { checkIfNeedsToBeHidden } from "../utils/OptionHideUtils"
import { getQuestion } from "../utils/PropertiesUtils"
import MultipleQuestion from "./MultipleQuestion"
import OpenTextQuestion from "./OpenTextQuestion"
import RegularQuestion from "./RegularQuestion"

const Question = (props: QuestionProps) => {
  const question = getQuestion(props)
  const type = question.type

  if(!type)
    return <></>
    
  if(checkIfNeedsToBeHidden({optionHide: question.optionHide, propsWithAnswers: props}))
    return <></>
  if (type === ConfigurationQuestionType.Regular)
    return <RegularQuestion {...props} />
  if (type === ConfigurationQuestionType.Multiple)
    return <MultipleQuestion {...props} />
  if (type === ConfigurationQuestionType.OpenText)
    return <OpenTextQuestion {...props} />

  return <>Question type not implemented</>
}

export default Question