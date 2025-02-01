import { TextField } from "@mui/material"
import { useState } from "react"
import "react-quill/dist/quill.snow.css"
import { QuestionProps } from "../Properties"
import { getQuestion } from "../utils/PropertiesUtils"

const Title = (props: QuestionProps) => {
  const question = getQuestion(props)

  const [title, setTitle] = useState(question.title)

  const updateTitle = (value: string) => {
    props.saveQuestion(props.questionId, (updatedQuestion) => {
      updatedQuestion.title = value
    })
  }

  return <>
    <TextField
      label="Title"
      variant="standard"
      sx={{ minWidth: "300px", width: "50%" }}
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      onBlur={(e) => updateTitle(e.target.value)}
    />
  </>
}

export default Title