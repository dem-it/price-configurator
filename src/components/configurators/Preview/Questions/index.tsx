import { Stack } from "@mui/material"
import { GroupProps } from "../Properties"
import QuestionPreview from "../Question/index"
import { getGroup } from "../utils/PropertiesUtils"

const Questions = (props: GroupProps) => {

  const group = getGroup(props)

  return <Stack direction="column" spacing={4}>

    {group.questions.map((question) => {
      return <div
        className="question"
        key={`group-${group.id}-question-${question.id}`}
        // style={{marginBottom: '20px'}}
      >
        <QuestionPreview {...props} questionId={question.id} />
      </div>
    })}

  </Stack>
}

export default Questions