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

  let imageUrl: string | undefined = undefined
  if (answer.imageId)
    imageUrl = `/api/blobs/images/${answer.imageId}?organizationId=${props.configuration.partitionKey}&configurationId=${props.configuration.rowKey}`
  else if (answer.imageUrl)
    imageUrl = answer.imageUrl

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

      {imageUrl && (
        <img
          src={imageUrl}
          alt="Answer"
          style={{
            width: answer.imageWidth ? answer.imageWidth : "200px",
            height: answer.imageHeight ? answer.imageHeight : "auto",
            maxWidth: answer.imageWidth === "auto" ? "max-content" : "100%"
          }}
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
