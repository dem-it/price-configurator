import SelectedAnswer from "@/data/configurator/selection/SelectedAnswer"
import { Grid, Paper, Stack } from "@mui/material"
import { useEffect, useState } from "react"
import Answer from "../../Answer"
import Header from "../Header"
import QuestionProps from "../QuestionProps"

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

  useEffect(() => {
    if (!props.selectedAnswers || !question) {
      setSelectedAnswer(null)
      return
    }

    const questionAnswer = props.selectedAnswers.find(answer => answer.questionId === question.id)
    setSelectedAnswer(questionAnswer?.regular?.answerId || null)
  }, [props.selectedAnswers, question])

  return (
    <Stack
      id={`question-${question.id}`}
      spacing={2}
      direction="column">
      <Header {...props} />

      <Grid
        spacing={2}
        container
        justifyContent="space-between"
        sx={{ width: "100%" }}>
        {question.answers.map((answer) => {
          const isSelected = selectedAnswer === answer.id
          return <Grid
            item
            key={`regular-ansewr-${answer.id}`}
            xs
            onClick={() => answerSelected(answer.id)}>
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
              }}>
              <Answer configuration={props.configuration} question={question} answer={answer} />
            </Paper>
          </Grid>
        })}
      </Grid>
    </Stack>
  )
}

export default RegularQuestion