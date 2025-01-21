import { ConfigurationDto } from "@/api/tables/ConfigurationDto"
import Identifier from "@/components/display/Identifier"
import Loading from "@/components/display/Loading"
import ConfigurationData from "@/data/configurator/ConfigurationData"
import ConfigurationQuestion from "@/data/configurator/ConfigurationQuestion"
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward"
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline"
import { Accordion, AccordionDetails, AccordionSummary, Button, ButtonGroup, Stack } from "@mui/material"
import Question from "./Question"

interface QuestionsProps {
  configuration: ConfigurationDto,
  data: ConfigurationData | undefined,
  saveToDatabase: (updatedData: ConfigurationData) => void
}

const Questions = (props: QuestionsProps) => {
  const configuration = props.configuration
  const data = props.data

  const saveQuestion = (id: string, updateQuestion: (arg0: ConfigurationQuestion) => void) => {
    if (!data)
      return

    const updatedData = data
    const questionToUpdate = updatedData.questions.find(x => x.id === id)

    if (!questionToUpdate) {
      console.error("Question not found")
      return
    }

    // the caller decides what to update in the question
    updateQuestion(questionToUpdate)

    props.saveToDatabase(updatedData)
  }

  const removeQuestion = (id: string) => {
    if (!data)
      return

    const updatedQuestions = data.questions.filter(x => x.id !== id)

    const updatedData = data
    updatedData.questions = updatedQuestions
    props.saveToDatabase(updatedData)
  }

  const moveAnswerUp = (index: number) => {
    if (!data)
      return

    const updatedQuestion = data.questions
    const temp = updatedQuestion[index - 1]
    updatedQuestion[index - 1] = updatedQuestion[index]
    updatedQuestion[index] = temp

    const updatedData = data
    updatedData.questions = updatedQuestion
    props.saveToDatabase(updatedData)
  }

  const moveAnswerDown = (index: number) => {
    if (!data)
      return

    const updatedQuestion = data.questions
    const temp = updatedQuestion[index + 1]
    updatedQuestion[index + 1] = updatedQuestion[index]
    updatedQuestion[index] = temp

    const updatedData = data
    updatedData.questions = updatedQuestion
    props.saveToDatabase(updatedData)
  }

  if (!data)
    return <Loading />

  return <>
    {data.questions?.map((question, index) => {

      const Actions = (props: any) => (
        <Stack direction="row" spacing={2} {...props}>

          <ButtonGroup variant="outlined">
            <Button
              variant='outlined'
              color='inherit'
              size='small'
              sx={{
                marginLeft: "0 !important",
              }}
              onClick={(e) => {
                e.stopPropagation()
                moveAnswerDown(index)
              }}
              disabled={index === data.questions.length - 1}
            >
              <ArrowDownwardIcon />
            </Button>

            <Button
              variant='outlined'
              color='inherit'
              size='small'
              sx={{
                marginLeft: "0 !important",
                borderLeft: "1px solid #000000FF !important",
              }}
              onClick={(e) => {
                e.stopPropagation()
                moveAnswerUp(index)
              }}
              disabled={index === 0}
            >
              <ArrowUpwardIcon />
            </Button>
          </ButtonGroup>

          <Button
            startIcon={<RemoveCircleOutlineIcon />}
            variant='contained'
            color='error'
            onClick={(e) => {
              e.stopPropagation()
              removeQuestion(question.id)
            }}
          >
            Remove
          </Button>
        </Stack>
      )

      return <Accordion key={index}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Stack
            direction='row'
            spacing={2}
            justifyContent='space-between'
            sx={{ width: "100%" }}>
            <Identifier id={question.id} description={`Question ${index + 1}: ${question.title}`} />
            <Actions sx={{ paddingRight: 2 }} />
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          <Question
            configuration={configuration}
            question={question}
            saveQuestion={saveQuestion} />

        </AccordionDetails>
      </Accordion>
    })}
  </>
}

export default Questions
