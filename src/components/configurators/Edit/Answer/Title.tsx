import { TextField } from "@mui/material"
import { useState } from "react"
import "react-quill/dist/quill.snow.css"
import AnswerProps from "./AnswerProps"

const Title = (props: AnswerProps) => {
  const answer = props.answer

  const [title, setTitle] = useState(answer.title)

  const updateTitle = (value: string) => {
    props.saveAnswer(answer.id, (x) => {
      x.title = value
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