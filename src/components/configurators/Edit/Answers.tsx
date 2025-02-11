import ConfigurationAnswer from "@/data/configurator/ConfigurationAnswer"
import { calculateRandomConfigurationAnswerId } from "@/utils/calculations/calculateNewConfigurationId"
import AddIcon from "@mui/icons-material/Add"
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward"
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward"
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline"
import { Button, ButtonGroup, Grid, Paper, Stack } from "@mui/material"
import Answer from "./Answer"
import { QuestionProps } from "./Properties"
import { getAnswerById, getQuestion } from "./utils/PropertiesUtils"

const Answers = (props: QuestionProps) => {

  const saveAnswer = (id: string, updateAnswers: (arg0: ConfigurationAnswer) => void) => {
    const answerToUpdate = getAnswerById(props, id)

    updateAnswers(answerToUpdate)

    const question = getQuestion(props)
    const answers = question.answers

    props.saveQuestion(question.id, (updatedQuestion) => {
      updatedQuestion.answers = answers
    })
  }

  const removeAnswer = (id: string) => {
    const question = getQuestion(props)
    const updatedAnswers = question.answers.filter(x => x.id !== id)

    props.saveQuestion(question.id, (updatedQuestion) => {
      updatedQuestion.answers = updatedAnswers
    })
  }

  const addAnswer = () => {
    const generatedId = calculateRandomConfigurationAnswerId()
    const newAnswer: ConfigurationAnswer = {
      id: generatedId,
      title: "",
      description: "",
      surcharge: 0
    }

    const question = getQuestion(props)
    const updatedAnswers = question.answers
    updatedAnswers.push(newAnswer)

    props.saveQuestion(question.id, (updatedQuestion) => {
      updatedQuestion.answers = updatedAnswers
    })
  }

  const moveAnswerUp = (index: number) => {
    const question = getQuestion(props)
    const updatedAnswers = question.answers
    const temp = updatedAnswers[index - 1]
    updatedAnswers[index - 1] = updatedAnswers[index]
    updatedAnswers[index] = temp

    props.saveQuestion(question.id, (updatedQuestion) => {
      updatedQuestion.answers = updatedAnswers
    })
  }

  const moveAnswerDown = (index: number) => {
    const question = getQuestion(props)
    const updatedAnswers = question.answers
    const temp = updatedAnswers[index + 1]
    updatedAnswers[index + 1] = updatedAnswers[index]
    updatedAnswers[index] = temp

    props.saveQuestion(question.id, (updatedQuestion) => {
      updatedQuestion.answers = updatedAnswers
    })
  }

  const question = getQuestion(props)

  return <Grid container spacing={1} sx={{ marginLeft: 1 }}>
    <Grid item xs={12}>
      <h3>Answers</h3>
    </Grid>
    <Grid item xs={12}>
      <Button
        startIcon={<AddIcon />}
        color="primary"
        variant="contained" onClick={addAnswer}>Add new answer</Button>
    </Grid>
    <Grid item xs={12}>
      <Stack direction="column" spacing={2}>
        {question.answers.map((answer, index) => {
          return <Paper
            key={`groups-${props.groupId}-question-${question.id}-answer-${answer.id}`}
            variant="outlined"
            sx={{ borderWidth: 2, padding: 1 }}
          >

            <div style={{ position: "relative" }}>
              <Stack
                direction='row'
                spacing={2}
                sx={{ position: "absolute", right: 0, top: 0 }}
              >
                {question.answers.length > 1 && (
                  <ButtonGroup variant='outlined'>
                    <Button
                      variant='outlined'
                      color='inherit'
                      size='small'
                      sx={{
                        marginLeft: "0 !important",
                      }}
                      onClick={() => moveAnswerDown(index)}
                      disabled={index === question.answers.length - 1}
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
                      onClick={() => moveAnswerUp(index)}
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
                  onClick={() => removeAnswer(answer.id)}
                >
                  Remove
                </Button>
              </Stack>
            </div>
            <Answer
              {...props}
              answerId={answer.id}
              answerIndex={index}
              saveAnswer={saveAnswer} />
          </Paper>
        })}
      </Stack>
    </Grid>

    {question.answers.length > 0 && (
      <Grid item xs={12}>
        <Button
          startIcon={<AddIcon />}
          color="primary"
          variant="contained" onClick={addAnswer}>Add new answer</Button>
      </Grid>
    )}
  </Grid>
}

export default Answers
