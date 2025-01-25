import { Stack } from "@mui/material"
import { QuestionProps } from "../Properties"
import { getQuestion } from "../utils/PropertiesUtils"

const Header = (props: QuestionProps) => {
  const question = getQuestion(props)

  return (
    <Stack direction="column" spacing={2}>
      <h2>{question.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: question.description }} />
    </Stack>
  )
}

export default Header