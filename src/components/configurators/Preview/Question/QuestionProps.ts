import { ConfigurationDto } from "@/api/tables/ConfigurationDto"
import ConfigurationQuestion from "@/data/configurator/ConfigurationQuestion"
import SelectedAnswer from "@/data/configurator/selection/SelectedAnswer"

interface QuestionProps {
    configuration: ConfigurationDto,
    question: ConfigurationQuestion,
    answerSelected?: (answer: SelectedAnswer) => void
  }

export default QuestionProps