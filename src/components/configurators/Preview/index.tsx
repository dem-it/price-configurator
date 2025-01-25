import SelectedAnswer from "@/data/configurator/selection/SelectedAnswer"
import { useState } from "react"
import PreviewAsStepper from "./PreviewAsStepper"
import { PreviewProps, PreviewPropsWithAnswers } from "./Properties"

const Preview = (props: PreviewProps) => {

  const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswer[]>([])

  const newProps: PreviewPropsWithAnswers = {
    selectedAnswers: selectedAnswers,
    setSelectedAnswers: setSelectedAnswers,
    ...props
  }

  if(props.data.groups.length === 0)
    return <b>No questions available, please configure your first question</b>

  return <>
    <PreviewAsStepper {...newProps} />
  </>
}

export default Preview