import { VariantType } from "@/components/configurators/Edit/Question/Variant"
import SelectedAnswer from "@/data/configurator/selection/SelectedAnswer"
import { Grid, Paper, Stack } from "@mui/material"
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
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
        className={`answer regular ${question.variant}`}
        sx={{ width: "100%" }}>

        {question.variant === VariantType.Dropdown ? (
          <>
            <Grid item xs={12}>
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel id={`regular-question-dropdown-${question.id}`}>Select an option</InputLabel>
                <Select
                  labelId={`regular-question-dropdown-${question.id}`}
                  value={selectedAnswer || ""}
                  onChange={(e) => answerSelected(e.target.value)}
                  
                  label="Select an option"
                >
                  <MenuItem value="">
                    <em>Select an answer</em>
                  </MenuItem>

                  {question.answers.map((answer) => (
                    <MenuItem key={answer.id} value={answer.id}>
                      <Stack direction="row" spacing={2} alignItems="center">
                        {answer.imageId && (
                          <img
                            src={`/api/blobs/images/${answer.imageId}?organizationId=${props.configuration.partitionKey}&configurationId=${props.configuration.rowKey}`}
                            alt="Answer"
                            width={25}
                            height={25}
                          />
                        )}

                        <span>{answer.title}</span>

                        {answer.description
                          && answer.description.trim().length > 0
                          && answer.description != "<p><br></p>"
                          && (
                            <div
                              className="description"
                              dangerouslySetInnerHTML={{ __html: answer.description }} />
                          )}
                      </Stack>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </>
        ) : (
          <>
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
          </>
        )}
      </Grid>
    </Stack >
  )
}

export default RegularQuestion