import { GroupProps } from "../Properties"
import QuestionPreview from "../Question/index"
import { getGroup } from "../utils/PropertiesUtils"

const Questions = (props: GroupProps) => {

  const group = getGroup(props)

  return <>

    {group.questions.map((question) => {
      return <div
        key={`group-${group.id}-question-${question.id}`}
        // style={{marginBottom: '20px'}}
      >
        <QuestionPreview {...props} questionId={question.id} />
      </div>
    })}

    {/*  */}

    {/*  */}
  </>
}

export default Questions