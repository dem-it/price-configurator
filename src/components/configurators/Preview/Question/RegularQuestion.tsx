import SelectedAnswer from "@/data/configurator/selection/SelectedAnswer"
import { Grid, Paper, Stack } from "@mui/material"
import { useState } from "react"
import Answer from "../Answer"
import QuestionHeader from "./Header"
import QuestionProps from "./QuestionProps"

const RegularQuestion = (props: QuestionProps) => {
  const question = props.question

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)

  const answerSelected = (answerId: string) => {
    setSelectedAnswer(answerId)

    const answer: SelectedAnswer = {
      questionId: question.id,
      regular: {
        answerId: answerId
      }
    }

    props.answerSelected && props.answerSelected(answer)
  }

  const questionProps: QuestionProps = {
    configuration: props.configuration,
    question: question,
    answerSelected: props.answerSelected
  }

  return (
    <Stack
      id={`question-${question.id}`}
      spacing={2}
      direction="column">
      <QuestionHeader {...questionProps} />

      <Grid
        spacing={2}
        container
        justifyContent="space-between"
        sx={{ width: "100%" }}>
        {question.answers.map((answer) => {
          const isSelected = selectedAnswer === answer.id

          return (
            <Grid
              item
              key={answer.id}
              xs
            >
              <Paper
                className={`${isSelected ? "answer-selected" : ""}`}
                sx={{
                  p: 2,
                  height: "100%",
                  cursor: "pointer",
                  border: isSelected ? "2px solid" : "inherit",
                  borderColor: isSelected ? "primary.main" : "inherit",
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)"
                  }
                }}
                onClick={() => answerSelected(answer.id)}>
                <Answer configuration={props.configuration} question={question} answer={answer} />
              </Paper>
            </Grid>
          )
        })}
      </Grid>
    </Stack>
  )
}

export default RegularQuestion