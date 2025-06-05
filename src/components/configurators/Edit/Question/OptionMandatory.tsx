import { FormControlLabel, Switch } from "@mui/material"
import { useState } from "react"
import { QuestionProps } from "../Properties"
import { getQuestion } from "../utils/PropertiesUtils"

const OptionMandatory = (props: QuestionProps) => {
  const question = getQuestion(props)

  const [mandatory, setMandatory] = useState(question.optionMandatory || false)

  const handleToggleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked

    props.saveQuestion(props.questionId, (updatedQuestion) => {
      updatedQuestion.optionMandatory = checked
    })
    setMandatory(checked)
  }

  return (<>
    <p>
      Should this question be mandatory:
    </p>

    <FormControlLabel
      control={
        <Switch
          checked={mandatory}
          onChange={handleToggleChange}
          name="setOptionMandatory"
          color="primary"
        />
      }
      label="Mandatory"
    />
  </>)
}

export default OptionMandatory