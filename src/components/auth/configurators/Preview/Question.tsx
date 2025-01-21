import { ConfigurationDto } from "@/api/tables/ConfigurationDto"
import { ConfigurationQuestion } from "@/data/configurator/ConfigurationData"
import { Grid, Paper, Stack } from "@mui/material"
import Answer from "./Answer"

interface QuestionProps {
  configuration: ConfigurationDto,
  question: ConfigurationQuestion
}

const Question = (props: QuestionProps) => {
  const question = props.question

  return (
    <Stack
      id={`question-${question.id}`}
      spacing={2}
      direction="column">
      <h2>{question.title}</h2>
      <p>{question.description}</p>

      <Grid spacing={2} container>
        {question.answers.map((answer) => (
          <Grid
            item
            key={answer.id}
            xs={Math.floor(12 / question.answers.length)}
          >
            <Paper sx={{
              p: 1,
              height: '100%',
              cursor: "pointer",
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                borderColor: 'rgba(0, 0, 0, 0.2)',
              }
            }}>
              <Answer configuration={props.configuration} question={question} answer={answer} />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Stack>
  )
}

export default Question