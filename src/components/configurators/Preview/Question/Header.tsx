import { Stack } from "@mui/material"
import QuestionProps from "./QuestionProps"

const QuestionHeader = (props: QuestionProps) => {
  const question = props.question

  return (
    <Stack direction="column" spacing={2}>
        <h2>{question.title}</h2>
        <p>{question.description}</p>
    </Stack>
  )
}

export default QuestionHeader