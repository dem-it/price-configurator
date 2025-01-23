import { ConfigurationDto } from "@/api/tables/ConfigurationDto"
import PreviewQuestion from "@/components/configurators/Preview/Question/index"
import quillToolbarConfig from "@/config/quillToolbarConfig"
import ConfigurationQuestion from "@/data/configurator/ConfigurationQuestion"
import EditIcon from "@mui/icons-material/Edit"
import VisibilityIcon from "@mui/icons-material/Visibility"
import { Button, Grid, Stack, TextField } from "@mui/material"
import dynamic from "next/dynamic"
import { useState } from "react"
import "react-quill/dist/quill.snow.css"
import Answers from "./Answers"

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false })

interface QuestionProps {
  configuration: ConfigurationDto,
  question: ConfigurationQuestion,
  saveQuestion: (id: string, updateQuestion: (arg0: ConfigurationQuestion) => void) => void
}

const Question = (props: QuestionProps) => {
  const question = props.question

  const [isEdit, setIsEdit] = useState(true)

  const [title, setTitle] = useState(question.title)
  const [description, setDescription] = useState(question.description)

  const updateTitle = (value: string) => {
    props.saveQuestion(question.id, (updatedQuestion) => {
      updatedQuestion.title = value
    })
  }

  const updateDescription = (value: string) => {
    props.saveQuestion(question.id, (updatedQuestion) => {
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

        <Answers configuration={props.configuration} question={question} saveQuestion={props.saveQuestion} />
      </Grid>
    ) : <PreviewQuestion configuration={props.configuration} question={question} selectedAnswers={[]} />
    }
  </>
}

export default Question