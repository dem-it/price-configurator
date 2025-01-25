import SelectedAnswer from "@/data/configurator/selection/SelectedAnswer"
import { Grid, Paper, Stack } from "@mui/material"
import { useEffect, useState } from "react"
import Answer from "../../Answer"
import { QuestionProps } from "../../Properties"
import { getQuestion } from "../../utils/PropertiesUtils"
import Header from "../Header"

const RegularQuestion = (props: QuestionProps) => {
  const question = getQuestion(props)

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)

  const answerSelected = (answerId: string) => {

    setSelectedAnswer(answerId)

    const answer: SelectedAnswer = {
      questionId: question.id,
      regular: {
        answerId: answerId
      }
    }

    props.setSelectedAnswers([...props.selectedAnswers.filter(x => x.questionId !== question.id), answer])
  }

  useEffect(() => {
    const questionAnswer = props.selectedAnswers.find(answer => answer.questionId === question.id)
    setSelectedAnswer(questionAnswer?.regular?.answerId || null)
  }, [props.selectedAnswers, props.questionId])

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
        className="answer regular"
        sx={{ width: "100%" }}>
        {question.answers.map((answer) => {
          const isSelected = selectedAnswer === answer.id
          return <Grid
            item
            key={`regular-answer-${answer.id}`}
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