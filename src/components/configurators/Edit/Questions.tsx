import Identifier from "@/components/display/Identifier"
import { useSnackbar } from "@/components/hoc/SnackbarContext"
import ConfigurationQuestion from "@/data/configurator/ConfigurationQuestion"
import ConfigurationQuestionType from "@/data/configurator/ConfigurationQuestionType"
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward"
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline"
import { Accordion, AccordionDetails, AccordionSummary, Button, ButtonGroup, Stack } from "@mui/material"
import { GroupProps } from "./Properties"
import Question from "./Question/index"
import { getGroup, getQuestionById } from "./utils/PropertiesUtils"

const Questions = (props: GroupProps) => {
  const data = props.data!

  const { showSnackbar } = useSnackbar()

  const saveQuestion = (id: string, updateQuestion: (arg0: ConfigurationQuestion) => void) => {
    const updatedData = data
    const questionToUpdate = getQuestionById(props, id)

    // the caller decides what to update in the question
    updateQuestion(questionToUpdate)

    props.saveToDatabase(updatedData)
  }

  const removeQuestion = (id: string) => {
    getGroup(props).questions = getGroup(props).questions.filter(x => x.id !== id)
    props.saveToDatabase(data)

    showSnackbar("Question removed", 'error')
  }

  const moveAnswerUp = (index: number) => {
    const group = getGroup(props)
    // const updatedQuestion = data.questions
    const temp = group.questions[index - 1]
    group.questions[index - 1] = group.questions[index]
    group.questions[index] = temp

    // const updatedData = data
    // updatedData.questions = updatedQuestion
    props.saveToDatabase(data)
  }

  const moveAnswerDown = (index: number) => {
    const group = getGroup(props)
    // const updatedQuestion = data.questions
    const temp = group.questions[index + 1]
    group.questions[index + 1] = group.questions[index]
    group.questions[index] = temp

    // const updatedData = data
    // updatedData.questions = updatedQuestion
    props.saveToDatabase(data)
  }

  const questions = getGroup(props)?.questions ?? []

  return <>
    {questions.map((question, index) => {

      const Actions = (props: any) => (
        <Stack direction="row" spacing={2} {...props}>

          {questions.length > 1 && (
            <ButtonGroup
              variant="outlined"
            >
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
                disabled={index === questions.length - 1}
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
          )}

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

      let typeName = "Regular"
      switch (question.type) {
      case ConfigurationQuestionType.Regular:
        typeName = "Regular"
        break
      case ConfigurationQuestionType.Multiple:
        typeName = "Multiple"
        break
      case ConfigurationQuestionType.OpenText:
        typeName = "OpenText"
        break
      }

      return <Accordion key={`group-${props.groupId}-question-${question.id}`} className="question">
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
            <Identifier id={question.id} description={`Question ${index + 1}: ${question.title} (${typeName})`} />
            <Actions sx={{ paddingRight: 2 }} />
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          <Question {...props} saveQuestion={saveQuestion} questionId={question.id} />
        </AccordionDetails>
      </Accordion>
    })}
  </>
}

export default Questions
