import { ConfigurationDto } from "@/api/tables/ConfigurationDto"
import ConfigurationAnswer from "@/data/configurator/ConfigurationAnswer"
import ConfigurationQuestion from "@/data/configurator/ConfigurationQuestion"
import { formatPrice } from "@/utils/format"
import { Chip, Stack } from "@mui/material"

interface AnswerProps {
  configuration: ConfigurationDto,
  question: ConfigurationQuestion,
  answer: ConfigurationAnswer,
}

const Answer = (props: AnswerProps) => {
  const answer = props.answer
  const question = props.question

  return (
    <Stack
      id={`question-${question.id}-answer-${answer.id}`}
      direction="column"
      alignItems="center"
      spacing={2}
      sx={{
        position: "relative",
        height: "100%",
        paddingBottom: 5
      }}>

      <h3>{answer.title}</h3>
      <div className="description" dangerouslySetInnerHTML={{ __html: answer.description }} />
      {answer.imageId && (
        <img
          src={`/api/blobs/images/${answer.imageId}?organizationId=${props.configuration.partitionKey}&configurationId=${props.configuration.rowKey}`}
          alt="Answer"
          width={200}
        />
      )}
      {answer.imageUrl && (
        <img
          src={answer.imageUrl}
          alt="Answer"
          width={200}
        />
      )}
      {!answer.surchargeHidden && (
        <Chip
          className="surcharge"
          variant="outlined"
          label={formatPrice(answer.surcharge)}
          sx={{
            position: "absolute",
            bottom: 0,
            right: 0,
            padding: 1,
            borderRadius: 1,
            boxShadow: 1
          }}
        />
      )}

    </Stack>
  )
}

export default Answer
