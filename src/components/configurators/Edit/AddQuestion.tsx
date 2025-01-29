import ConfigurationQuestion from "@/data/configurator/ConfigurationQuestion"
import ConfigurationQuestionType from "@/data/configurator/ConfigurationQuestionType"
import { calculateRandomConfigurationQuestionId } from "@/utils/calculations/calculateNewConfigurationId"
import AddIcon from "@mui/icons-material/Add"
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Grid, Stack } from "@mui/material"
import { GroupProps } from "./Properties"

const AddQuestion = (props: GroupProps) => {
  const data = props.data

  const getGroup = () => data.groups.find(x => x.id === props.groupId)!
  const addRegularQuestion = () => addQuestion(ConfigurationQuestionType.Regular)
  const addMultipleQuestion = () => addQuestion(ConfigurationQuestionType.Multiple)
  const addOpenTextQuestion = () => addQuestion(ConfigurationQuestionType.OpenText)

  const addQuestion = (type: ConfigurationQuestionType) => {
    const generatedId = calculateRandomConfigurationQuestionId()
    const newQuestion: ConfigurationQuestion = {
      id: generatedId,
      title: "",
      description: "",
      type: type,
      answers: []
    }

    getGroup().questions.push(newQuestion)

    props.saveToDatabase(data)
  }

  return (
    <Accordion
      sx={{
        width: "100%",
        border: "1px solid",
        borderColor: "primary.main"
      }}>
      <AccordionSummary
        sx={{
          fontWeight: "bold"
        }}
        expandIcon={<AddIcon color="primary" />}>
                Add question
      </AccordionSummary>
      <AccordionDetails>
        <Stack direction="column" spacing={2}>
          <Box
            border={1}
            borderColor="primary.main"
            p={1}
          >
            <Grid container spacing={3} justifyContent="center" alignItems="center">
              <Grid item xs="auto">
                <Button
                  startIcon={<AddIcon />}
                  color="primary"
                  variant="contained" onClick={addRegularQuestion}>Add regular question</Button>
              </Grid>
              <Grid item xs>
                <img src="/images/configurator/regular-question.png" alt="Regular question" style={{ height: "200px" }} />
              </Grid>
            </Grid>
          </Box>

          <Box
            border={1}
            borderColor="primary.main"
            p={1}
          >
            <Grid container spacing={3} justifyContent="center" alignItems="center">
              <Grid item xs="auto" >
                <Button
                  startIcon={<AddIcon />}
                  color="primary"
                  variant="contained" onClick={addMultipleQuestion}>Add multiple question</Button>
              </Grid>
              <Grid item xs>
                <img src="/images/configurator/multiple-question.png" alt="Multiple question" style={{ height: "100px" }} />
              </Grid>
            </Grid>
          </Box>

          <Box
            border={1}
            borderColor="primary.main"
            p={1}
          >
            <Grid container spacing={3} justifyContent="center" alignItems="center">
              <Grid item xs="auto" >
                <Button
                  startIcon={<AddIcon />}
                  color="primary"
                  variant="contained" onClick={addOpenTextQuestion}>Add open text question</Button>
              </Grid>
              <Grid item xs>
                <img src="/images/configurator/open-text-question.png" alt="Open text question" style={{ height: "150px" }} />
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </AccordionDetails>
    </Accordion>
  )
}

export default AddQuestion