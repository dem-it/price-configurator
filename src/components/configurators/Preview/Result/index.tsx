import StyledTable from "@/components/layout/shared/StyledTable"
import ConfigurationAnswer from "@/data/configurator/ConfigurationAnswer"
import ConfigurationQuestion from "@/data/configurator/ConfigurationQuestion"
import { SelectedAnswerUtils } from "@/data/configurator/selection/SelectedAnswer"
import { formatPrice } from "@/utils/format"
import InfoIcon from "@mui/icons-material/Info"
import { Stack, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import Chip from "@mui/material/Chip"
import IconButton from "@mui/material/IconButton"
import Popover from "@mui/material/Popover"
import { useState } from "react"
import { PreviewPropsWithAnswers } from "../Properties"
import { getQuestionByIdWithProps } from "../utils/PropertiesUtils"
import SendAsQuote from "./SendAsQuote"

const Result = (props: PreviewPropsWithAnswers) => {

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [popoverContent, setPopoverContent] = useState<string>("")

  const getQuestion = (questionId: string): ConfigurationQuestion => {
    return getQuestionByIdWithProps(props, questionId)
  }

  const getTotalPrice = () => {
    let total = 0
    props.selectedAnswers.forEach(answer => {
      const question = getQuestion(answer.questionId)

      SelectedAnswerUtils.getAnswerIds(answer).forEach(answerId => {
        total += question.answers.find(x => x.id === answerId)!.surcharge
      })
    })

    return total
  }

  function getAnswer(question: ConfigurationQuestion, answerId: string): ConfigurationAnswer {
    return question.answers.find(x => x.id === answerId)!
  }

  const openTextAnswers = props.selectedAnswers.filter(x => x.openText)

  return (
    <Stack direction="column" spacing={2} className="result">

      <h2>Result</h2>
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell>Question</TableCell>
            <TableCell>Answer</TableCell>
            <TableCell>Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.selectedAnswers.map((answer, index) => {

            const question = getQuestion(answer.questionId)
            const answers = SelectedAnswerUtils.getAnswerIds(answer)

            return answers.map(answerId => {
              const configurationAnswer = getAnswer(question, answerId)
              return (
                <TableRow key={`result-question-${question.id}-answer-${configurationAnswer.id}`}>
                  <TableCell>{question.title}</TableCell>
                  <TableCell>
                    {configurationAnswer.title}

                    {configurationAnswer.description
                      && configurationAnswer.description.trim().length > 0
                      && configurationAnswer.description != "<p><br></p>"
                      && (
                        <>

                          <IconButton
                            aria-label="info"
                            onClick={(event) => {
                              setAnchorEl(event.currentTarget)
                              setPopoverContent(configurationAnswer.description)
                            }}
                          >
                            <InfoIcon />
                          </IconButton>
                        </>)}
                  </TableCell>
                  <TableCell>{formatPrice(configurationAnswer.surcharge)}</TableCell>
                </TableRow>
              )
            })
          })}

          {openTextAnswers.map((answer) => {
            const question = getQuestion(answer.questionId)

            return (
              <TableRow key={`result-question-${question.id}-answer`}>
                <TableCell>
                  {question.title}

                  <IconButton
                    aria-label="info"
                    onClick={(event) => {
                      setAnchorEl(event.currentTarget)
                      setPopoverContent(question.description)
                    }}
                  >
                    <InfoIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  {answer.openText?.answer}
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            )
          })}

          <TableRow>
            <TableCell
              colSpan={2}
              align="right"
              style={{ fontWeight: "bold" }}>
              Grand total:
            </TableCell>
            <TableCell
              style={{ fontWeight: "bold" }}>
              <Chip color="primary" variant="outlined" label={formatPrice(getTotalPrice())} />
            </TableCell>
          </TableRow>
        </TableBody>
      </StyledTable>

      <SendAsQuote {...props} />

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div style={{ padding: "8px 24px" }} dangerouslySetInnerHTML={{ __html: popoverContent }} />
      </Popover>
    </Stack>
  )
}

export default Result

