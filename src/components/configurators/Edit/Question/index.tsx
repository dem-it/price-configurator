import PreviewQuestion from "@/components/configurators/Preview/Question/index"
import ConfigurationQuestionType from "@/data/configurator/ConfigurationQuestionType"
import EditIcon from "@mui/icons-material/Edit"
import VisibilityIcon from "@mui/icons-material/Visibility"
import { Button, Grid, Stack } from "@mui/material"
import { useState } from "react"
import "react-quill/dist/quill.snow.css"
import Answers from "../Answers"
import { QuestionProps } from "../Properties"
import { getQuestion } from "../utils/PropertiesUtils"
import Description from "./Description"
import OptionHide from "./OptionHide"
import SingleRow from "./SingleRow"
import { CustomTabs, CustomTabsProps } from "./Tabs"
import Title from "./Title"
import Variant from "./Variant"

const Question = (props: QuestionProps) => {

  const [isEdit, setIsEdit] = useState(true)

  const action = <Stack direction='row' spacing={2}>
    {isEdit ? <Button
      variant='contained'
      color='primary'
      onClick={() => setIsEdit(false)}
      startIcon={<VisibilityIcon />}
    >
      View
    </Button> : <Button
      variant='contained'
      color='primary'
      onClick={() => setIsEdit(true)}
      startIcon={<EditIcon />}
    >
      Edit
    </Button>
    }
  </Stack>

  const showAnswers = () => {
    const question = getQuestion(props)
    if (question.type === ConfigurationQuestionType.OpenText)
      return false
    return true
  }

  const tabs: CustomTabsProps = {
    tabs: [
      {
        label: "Information",
        content: <Grid container spacing={2} alignItems="center">
          <SingleRow label="Title" content={<Title {...props} />} />
          <SingleRow label="Description" content={<Description {...props} />} />
          <SingleRow label="Variant" content={<Variant {...props} />} />
        </Grid>
      },
      {
        label: "Options",
        content: <OptionHide {...props} />
      }
    ]
  }

  return <>
    <div style={{ position: "relative" }}>
      <div style={{ position: "absolute", right: 0 }}>
        {action}
      </div>
    </div>

    {!isEdit && <PreviewQuestion
      {...props}
      selectedAnswers={[]}
      setSelectedAnswers={() => { }} />}

    {isEdit && <CustomTabs {...tabs} />}

    {showAnswers() && <Answers {...props} />}
  </>
}

export default Question