import { ConfigurationDto } from "@/api/tables/ConfigurationDto"
import ConfigurationData from "@/data/configurator/ConfigurationData"
import SelectedAnswer from "@/data/configurator/selection/SelectedAnswer"
import * as React from "react"

export interface PreviewProps {
  configuration: ConfigurationDto
  data: ConfigurationData
}

export interface PreviewPropsWithAnswers extends PreviewProps {
    selectedAnswers: SelectedAnswer[],
    setSelectedAnswers: React.Dispatch<React.SetStateAction<SelectedAnswer[]>>
  }