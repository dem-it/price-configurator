import { ConfigurationDto } from '@/api/tables/ConfigurationDto'
import { ConfigurationAnswer, ConfigurationQuestion } from "@/data/configurator/ConfigurationData"
import { calculateRandomConfigurationAnswerId } from "@/utils/calculations/calculateNewConfigurationId"
import AddIcon from '@mui/icons-material/Add'
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward"
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline"
import { Button, Grid, Paper, Stack } from "@mui/material"
import Answer from "./Answer"

interface AnswersProps {
  configuration: ConfigurationDto,
  question: ConfigurationQuestion,
  saveQuestion: (id: string, updateQuestion: (arg0: ConfigurationQuestion) => void) => void
}

const Answers = (props: AnswersProps) => {
  const question = props.question

  const saveAnswer = (id: string, updateAnswers: (arg0: ConfigurationAnswer) => void) => {
    const updatedAnswers = question.answers
    const answerToUpdate = updatedAnswers.find(x => x.id === id)

    if (!answerToUpdate) {
      console.error("Answer not found")
      return
    }

    updateAnswers(answerToUpdate)

    props.saveQuestion(question.id, (updatedQuestion) => {
      updatedQuestion.answers = updatedAnswers
    })
  }

  const removeAnswer = (id: string) => {
    const updatedAnswers = question.answers.filter(x => x.id !== id)

    props.saveQuestion(question.id, (updatedQuestion) => {
      updatedQuestion.answers = updatedAnswers
    })
  }

  const addAnswer = () => {
    const generatedId = calculateRandomConfigurationAnswerId()
    const newAnswer: ConfigurationAnswer = {
      id: generatedId,
      title: ``,
      description: '',
      surcharge: 0
    }

    const updatedAnswers = question.answers
    updatedAnswers.push(newAnswer)

    props.saveQuestion(question.id, (updatedQuestion) => {
      updatedQuestion.answers = updatedAnswers
    })
  }

  const moveAnswerUp = (index: number) => {
    const updatedAnswers = question.answers
    const temp = updatedAnswers[index - 1]
    updatedAnswers[index - 1] = updatedAnswers[index]
    updatedAnswers[index] = temp

    props.saveQuestion(question.id, (updatedQuestion) => {
      updatedQuestion.answers = updatedAnswers
    })
  }

  const moveAnswerDown = (index: number) => {
    const updatedAnswers = question.answers
    const temp = updatedAnswers[index + 1]
    updatedAnswers[index + 1] = updatedAnswers[index]
    updatedAnswers[index] = temp

    props.saveQuestion(question.id, (updatedQuestion) => {
      updatedQuestion.answers = updatedAnswers
    })
  }

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
            key={`question-${question.id}-answer-${answer.id}`}
            variant="outlined"
            sx={{ borderWidth: 2, padding: 1 }}
          >

            <div style={{ position: 'relative' }}>
              <Stack
                direction='row'
                spacing={2}
                sx={{ position: 'absolute', right: 0, top: 0 }}
              >

                <Button
                  variant='outlined'
                  color='inherit'
                  size='small'
                  sx={{
                    marginLeft: '0 !important',
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
                    marginLeft: '0 !important',
                  }}
                  onClick={() => moveAnswerUp(index)}
                  disabled={index === 0}
                >
                  <ArrowUpwardIcon />
                </Button>

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
              configuration={props.configuration}
              question={question}
              answer={answer}
              index={index}
              saveAnswer={saveAnswer} />
          </Paper>
        })}
      </Stack>
    </Grid>
  </Grid>
}

export default Answers
