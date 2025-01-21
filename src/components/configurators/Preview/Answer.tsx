import { ConfigurationDto } from "@/api/tables/ConfigurationDto"
import ConfigurationAnswer from "@/data/configurator/ConfigurationAnswer"
import ConfigurationQuestion from "@/data/configurator/ConfigurationQuestion"
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
        height: '100%', 
        paddingBottom: 3 
      }}>
        
      <h3>{answer.title}</h3>
      <p>{answer.description}</p>
      {answer.imageId && (
        <img
          src={`/api/blobs/images/${answer.imageId}?organizationId=${props.configuration.partitionKey}&configurationId=${props.configuration.rowKey}`}
          alt="Answer"
          width={200}
        />
      )}
      <Chip 
        className="surcharge"
        variant="outlined"
        label={new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(answer.surcharge)}
        sx={{
          position: "absolute",
          bottom: 0,
          right: 0,
          padding: 1,
          borderRadius: 1,
          boxShadow: 1
        }}
      />
        
    </Stack>
  )
}

export default Answer