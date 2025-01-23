import { ConfigurationDto } from "@/api/tables/ConfigurationDto"
import ConfigurationAnswer from "@/data/configurator/ConfigurationAnswer"
import ConfigurationQuestion from "@/data/configurator/ConfigurationQuestion"
import "react-quill/dist/quill.snow.css"

export default interface AnswerProps {
  configuration: ConfigurationDto,
  question: ConfigurationQuestion,
  answer: ConfigurationAnswer,
  index: number,
  saveAnswer: (id: string, updateAnswer: (arg0: ConfigurationAnswer) => void) => void
}