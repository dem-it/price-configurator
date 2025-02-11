import SelectedAnswer from "@/data/configurator/selection/SelectedAnswer"
import { formatPrice } from "@/utils/format"
import { Checkbox, FormControlLabel, Stack } from "@mui/material"
import { useEffect, useState } from "react"
import { QuestionProps } from "../../Properties"
import { checkIfNeedsToBeHidden } from "../../utils/OptionHideUtils"
import { getQuestion } from "../../utils/PropertiesUtils"
import Header from "../Header"

const MultipleQuestion = (props: QuestionProps) => {
  const question = getQuestion(props)

  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([])

  const answersUpdated = (answers: string[]) => {
    setSelectedAnswers(answers)

    const answer: SelectedAnswer = {
      questionId: question.id,
      multiple: {
        answerIds: answers
      }
    }

    props.setSelectedAnswers([...props.selectedAnswers.filter(x => x.questionId !== question.id), answer])
  }

  useEffect(() => {
    if (!props.selectedAnswers || !question) {
      setSelectedAnswers([])
      return
    }

    const questionAnswer = props.selectedAnswers.find(answer => answer.questionId === question.id)
    setSelectedAnswers(questionAnswer?.multiple?.answerIds || [])
  }, [props.selectedAnswers, question])

  const getAnswersToShow = () => {
    return question.answers.filter(x => {
      return !checkIfNeedsToBeHidden({ optionHide: x.optionHide, propsWithAnswers: props })
    })
  }

  return (
    <Stack
      id={`question-${question.id}`}
      spacing={2}
      direction="column">
      <Header {...props} />

      <Stack direction="column" spacing={1}>
        {getAnswersToShow().map((answer) => {
          const isSelected = selectedAnswers.includes(answer.id)

          const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const answers = selectedAnswers.filter(x => x !== answer.id)
            if (event.target.checked) {
              answers.push(answer.id)
            }

            answersUpdated(answers)
          }

          let imageUrl: string | undefined = undefined
          if (answer.imageId)
            imageUrl = `/api/blobs/images/${answer.imageId}?organizationId=${props.configuration.partitionKey}&configurationId=${props.configuration.rowKey}`
          else if (answer.imageUrl)
            imageUrl = answer.imageUrl

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
                label={<Stack direction="row" spacing={2} alignItems="center">

                  {imageUrl && (
                    <img
                      src={imageUrl}
                      alt="Answer"
                      style={{
                        width: answer.imageWidth ? answer.imageWidth : "30px",
                        height: answer.imageHeight ? answer.imageHeight : "30px",
                        maxWidth: answer.imageWidth === "auto" ? "max-content" : "100%"
                      }}
                    />
                  )}

                  <Stack direction="column" spacing={0}>
                    <div className="label">
                      {answer.title} - {formatPrice(answer.surcharge)}
                    </div>

                    {answer.description
                      && answer.description.trim().length > 0
                      && answer.description != "<p><br></p>"
                      && (
                        <div
                          className="description"
                          dangerouslySetInnerHTML={{ __html: answer.description }} />
                      )}
                  </Stack>
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