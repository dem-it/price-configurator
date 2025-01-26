import { GroupProps } from "../Properties"
import { getGroup } from "./PropertiesUtils"

export const calculateCanGoNext = (props: GroupProps) => {
  if(!props.groupId)
    return false

  const group = getGroup(props)

  //   else if (currentGroup.type === ConfigurationQuestionType.Multiple)
  //     setCanGoNext(true)
  //   else if (selectedAnswer)
  //     setCanGoNext(true)
  //   else
  //     setCanGoNext(false)
  return true
}