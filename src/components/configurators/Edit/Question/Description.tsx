import quillToolbarConfig from "@/config/quillToolbarConfig"
import dynamic from "next/dynamic"
import { useState } from "react"
import "react-quill/dist/quill.snow.css"
import { QuestionProps } from "../Properties"
import { getQuestion } from "../utils/PropertiesUtils"

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false })

const Description = (props: QuestionProps) => {
  const question = getQuestion(props)

  const [description, setDescription] = useState(question.description)

  const updateDescription = (value: string) => {
    props.saveQuestion(props.questionId, (updatedQuestion) => {
      updatedQuestion.description = value
    })
  }

  return <>
    <ReactQuill
      value={description}
      onChange={setDescription}
      onBlur={() => updateDescription(description)}
      modules={quillToolbarConfig}
    />
  </>
}

export default Description