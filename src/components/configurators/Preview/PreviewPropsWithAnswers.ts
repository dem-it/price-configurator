import SelectedAnswer from "@/data/configurator/selection/SelectedAnswer"
import * as React from "react"
import PreviewProps from "./PreviewProps"

interface PreviewPropsWithAnswers extends PreviewProps {
  selectedAnswers: SelectedAnswer[],
  setSelectedAnswers: React.Dispatch<React.SetStateAction<SelectedAnswer[]>>
}

export default PreviewPropsWithAnswers