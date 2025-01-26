import PreviewQuestion from "@/components/configurators/Preview/Question/index"
import quillToolbarConfig from "@/config/quillToolbarConfig"
import ConfigurationQuestionType from "@/data/configurator/ConfigurationQuestionType"
import EditIcon from "@mui/icons-material/Edit"
import VisibilityIcon from "@mui/icons-material/Visibility"
import { Button, Grid, Stack, TextField } from "@mui/material"
import dynamic from "next/dynamic"
import { useState } from "react"
import "react-quill/dist/quill.snow.css"
import Answers from "../Answers"
import { QuestionProps } from "../Properties"
import { getQuestion } from "../utils/PropertiesUtils"
import Variant from "./Variant"

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false })

const Question = (props: QuestionProps) => {

  const [isEdit, setIsEdit] = useState(true)

  const [title, setTitle] = useState(getQuestion(props).title)
  const [description, setDescription] = useState(getQuestion(props).description)

  const updateTitle = (value: string) => {
    props.saveQuestion(props.questionId, (updatedQuestion) => {
      updatedQuestion.title = value
    })
  }

  const updateDescription = (value: string) => {
    props.saveQuestion(props.questionId, (updatedQuestion) => {
      updatedQuestion.description = value
    })
  }

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
    if(question.type === ConfigurationQuestionType.OpenText)
      return false
    return true
  }

  return <>
    <div style={{ position: "relative" }}>
      <div style={{ position: "absolute", right: 0 }}>
        {action}
      </div>
    </div>

    {isEdit ? (

      <Grid container spacing={2}>
        <Grid item xs={2}>Title</Grid>
        <Grid item xs={10}>
          <TextField
            label="Title"
            variant="standard"
            sx={{ minWidth: "300px", width: "50%" }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={(e) => updateTitle(e.target.value)}
          />
        </Grid>

        <Grid item xs={2}>Description</Grid>
        <Grid item xs={10}>
          <ReactQuill
            value={description}
            onChange={setDescription}
            onBlur={() => updateDescription(description)}
            modules={quillToolbarConfig}
          />
        </Grid>

        <Variant {...props} />

        {showAnswers() && <Answers {...props} /> }
      </Grid>
    ) : <PreviewQuestion
      {...props}
      selectedAnswers={[]}
      setSelectedAnswers={() => {}} />
    }
  </>
}

export default Question