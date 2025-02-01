import ConfigurationAnswer from "@/data/configurator/ConfigurationAnswer"
import ConfigurationQuestion from "@/data/configurator/ConfigurationQuestion"
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline"
import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material"
import Button from "@mui/material/Button"
import { useEffect, useState } from "react"
import "react-quill/dist/quill.snow.css"
import { QuestionProps } from "../Properties"
import { getAllQuestions, getQuestion } from "../utils/PropertiesUtils"

const OptionHide = (props: QuestionProps) => {
  const question = getQuestion(props)

  const [allQuestions, setAllQuestions] = useState<ConfigurationQuestion[]>([])
  const [answers, setAnswers] = useState<ConfigurationAnswer[]>([])
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | undefined>(question.optionHide?.questionId ?? undefined)
  const [selectedAnswerId, setSelectedAnswerId] = useState<string | undefined>(question.optionHide?.answerId ?? undefined)

  useEffect(() => {
    if (!selectedQuestionId || !selectedAnswerId)
      return

    const optionHide = {
      questionId: selectedQuestionId,
      answerId: selectedAnswerId
    }

    props.saveQuestion(question.id, (x) => {
      x.optionHide = optionHide
    })

  }, [selectedAnswerId])

  const clearQuestion = () => {
    setSelectedQuestionId(undefined)
    setSelectedAnswerId(undefined)

    props.saveQuestion(question.id, (x) => {
      x.optionHide = undefined
    })
  }

  useEffect(() => {
    if (!selectedQuestionId)
      return

    const selectedQuestion = allQuestions.find(x => x.id === selectedQuestionId)
    setAnswers(selectedQuestion?.answers || [])

  }, [selectedQuestionId])

  useEffect(() => {
    setAllQuestions(getAllQuestions(props))
    if(selectedQuestionId) {
      const selectedQuestion = allQuestions.find(x => x.id === selectedQuestionId)
      setAnswers(selectedQuestion?.answers || [])
    }
  }, [props.data])

  return <>
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={6} style={{ textAlign: "right" }}>
        <b>Hide when this question</b>
      </Grid>
      <Grid item xs={6} style={{ textAlign: "left" }}>
        <b>is answered with this answer</b>
      </Grid>

      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel id={`question-select-label-${question.id}`}>Question</InputLabel>
          <Select
            labelId={`question-select-label-${question.id}`}
            value={selectedQuestionId}
            onChange={(e) => setSelectedQuestionId(e.target.value as string)}
          >
            {allQuestions.map((q) => (
              <MenuItem key={q.id} value={q.id}>
                {q.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {selectedQuestionId && (

        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id={`answer-select-label-${question.id}`}>Answer</InputLabel>
            <Select
              labelId={`answer-select-label-${question.id}`}
              value={selectedAnswerId}
              onChange={(e) => setSelectedAnswerId(e.target.value as string)}
            >
              {answers.map((q) => (
                <MenuItem key={q.id} value={q.id}>
                  {q.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      )}

      {selectedAnswerId && (
        <Grid item xs={12}>
          <Button
            startIcon={<RemoveCircleOutlineIcon />}
            variant='contained'
            color='error'
            onClick={clearQuestion}>Clear</Button>
        </Grid>
      )}
    </Grid>
  </>
}

export default OptionHide