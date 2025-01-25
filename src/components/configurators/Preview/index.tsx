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

  return <>
    <PreviewAsStepper {...newProps} />
  </>
}

export default Preview