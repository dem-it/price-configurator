import SelectedAnswer from "@/data/configurator/selection/SelectedAnswer"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import PreviewAsStepper from "./PreviewAsStepper"
import { PreviewProps, PreviewPropsWithAnswers } from "./Properties"

const Preview = (props: PreviewProps) => {
  const { i18n } = useTranslation(["configurator"])

  const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswer[]>([])

  const newProps: PreviewPropsWithAnswers = {
    selectedAnswers: selectedAnswers,
    setSelectedAnswers: setSelectedAnswers,
    ...props
  }

  useEffect(() => {
    const configuratorLanguage = props.data.meta?.language || "nl"
    i18n.changeLanguage(configuratorLanguage)
  }, [i18n])

  if(props.data.groups.length === 0)
    return <b>No questions available, please configure your first question</b>

  return <>
    <PreviewAsStepper {...newProps} />
  </>
}

export default Preview