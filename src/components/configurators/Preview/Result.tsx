import StyledTable from "@/components/layout/shared/StyledTable"
import ConfigurationAnswer from "@/data/configurator/ConfigurationAnswer"
import ConfigurationQuestion from "@/data/configurator/ConfigurationQuestion"
import { SelectedAnswerUtils } from "@/data/configurator/selection/SelectedAnswer"
import { formatPrice } from "@/utils/format"
import { Stack, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import Chip from "@mui/material/Chip"
import { PreviewPropsWithAnswers } from "./Properties"
import { getQuestionByIdWithProps } from "./utils/PropertiesUtils"

const Result = (props: PreviewPropsWithAnswers) => {

    const getQuestion = (questionId: string) : ConfigurationQuestion => {
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

  return (
    <Stack direction="column" spacing={2}>

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
              return <TableRow key={`result-question-${question.id}-answer-${configurationAnswer.id}`}>
                <TableCell>{question.title}</TableCell>
                <TableCell>
                  {configurationAnswer.title}
                    {/* <IconButton
                    aria-label="info"
                    onClick={(event) => {
                      setAnchorEl(event.currentTarget);
                      setPopoverContent(configurationAnswer.description);
                    }}
                    >
                    <InfoIcon />
                    </IconButton>
                    <Popover
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    onClose={() => setAnchorEl(null)}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    >
                    <Typography sx={{ p: 2 }}>{popoverContent}</Typography>
                    </Popover> */}
                </TableCell>
                <TableCell>{formatPrice(configurationAnswer.surcharge)}</TableCell>
              </TableRow>
            })
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
      <hr />

      <p>
        TODO: Save this (send e-mail to customer)
      </p>
    </Stack>
  )
}

export default Result

