import { Stack } from "@mui/material"
import { QuestionProps } from "../Properties"
import { getQuestion } from "../utils/PropertiesUtils"

const Header = (props: QuestionProps) => {
  const question = getQuestion(props)

  return (
    <Stack direction="column" spacing={2}>
      <h2 className="title">
        {question.title}
        {question.optionMandatory && <span className="required" style={{ color: "black" }}>*</span>}
      </h2>
      {question.description && <div className="description" dangerouslySetInnerHTML={{ __html: question.description }} />}
    </Stack>
  )
}

export default Header