import SelectedAnswer from "@/data/configurator/selection/SelectedAnswer"
import { formatPrice } from "@/utils/format"
import { Checkbox, FormControlLabel, Stack } from "@mui/material"
import { useEffect, useState } from "react"
import Header from "../Header"
import QuestionProps from "../QuestionProps"

const MultipleQuestion = (props: QuestionProps) => {
  const question = props.question

  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([])

  const answersUpdated = (answers: string[]) => {
    setSelectedAnswers(answers)

    const answer: SelectedAnswer = {
      questionId: question.id,
      multiple: {
        answerIds: answers
      }
    }

    props.answerSelected && props.answerSelected(answer)
  }

  useEffect(() => {
    if (!props.selectedAnswers || !question) {
      setSelectedAnswers([])
      return
    }

    const questionAnswer = props.selectedAnswers.find(answer => answer.questionId === question.id)
    setSelectedAnswers(questionAnswer?.multiple?.answerIds || [])
  }, [props.selectedAnswers, question])

  return (
    <Stack
      id={`question-${question.id}`}
      spacing={2}
      direction="column">
      <Header {...props} />

      <Stack direction="column" spacing={1}>
        {question.answers.map((answer) => {
          const isSelected = selectedAnswers.includes(answer.id)

          const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const answers = selectedAnswers.filter(x => x !== answer.id)
            if (event.target.checked) {
              answers.push(answer.id)
            }

            answersUpdated(answers)
          }

          return (
            <Stack
              key={answer.id}
              direction="row"
              spacing={1}
              className="answer multiple">
              <FormControlLabel
                control={<Checkbox
                  checked={isSelected}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}

                />}
                label={<Stack direction="column" spacing={0}>
                  <div className="label">
                    {answer.title} - {formatPrice(answer.surcharge)}
                  </div>
                  {answer.description && (
                    <div
                      className="description"
                      dangerouslySetInnerHTML={{ __html: answer.description }} />
                  )}
                </Stack>}
              />

            </Stack>
          )
        })}
      </Stack>
    </Stack>
  )
}

export default MultipleQuestion