import SelectedAnswer from "@/data/configurator/selection/SelectedAnswer"
import { Stack, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { QuestionProps } from "../../Properties"
import { getQuestion } from "../../utils/PropertiesUtils"
import Header from "../Header"

const OpenTextQuestion = (props: QuestionProps) => {
  const question = getQuestion(props)

  const [selectedAnswer, setSelectedAnswer] = useState<string | undefined>(undefined)

  const answerSelected = (answerText: string) => {

    setSelectedAnswer(answerText)

    const answer: SelectedAnswer = {
      questionId: question.id,
      openText: {
        answer: answerText
      }
    }

    props.setSelectedAnswers([...props.selectedAnswers.filter(x => x.questionId !== question.id), answer])
  }

  useEffect(() => {
    const questionAnswer = props.selectedAnswers.find(answer => answer.questionId === question.id)
    setSelectedAnswer(questionAnswer?.openText?.answer || undefined)
  }, [props.selectedAnswers, props.questionId])

  return (
    <Stack
      id={`question-${question.id}`}
      spacing={2}
      direction="column">
      <Header {...props} />

      <TextField
        label={getQuestion(props).title}
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={selectedAnswer}
        onChange={(e) => setSelectedAnswer(e.target.value)}
        onBlur={(e) => answerSelected(e.target.value)}
      />
    </Stack>
  )
}

export default OpenTextQuestion