import { ConfigurationDto } from "@/api/tables/ConfigurationDto"
import ConfigurationData from "@/data/configurator/ConfigurationData"
import ConfigurationQuestion from "@/data/configurator/ConfigurationQuestion"
import ConfigurationQuestionType from "@/data/configurator/ConfigurationQuestionType"
import { calculateRandomConfigurationQuestionId } from "@/utils/calculations/calculateNewConfigurationId"
import AddIcon from "@mui/icons-material/Add"
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Grid, Stack } from "@mui/material"

interface EditProps {
  configuration: ConfigurationDto,
  data: ConfigurationData | undefined,
  saveToDatabase: (updatedData: ConfigurationData) => void
}

const Edit = (props: EditProps) => {
  const configuration = props.configuration
  const data = props.data

  const addRegularQuestion = () => addQuestion(ConfigurationQuestionType.Regular)
  const addMultipleQuestion = () => addQuestion(ConfigurationQuestionType.Multiple)

  const addQuestion = (type: ConfigurationQuestionType) => {
    if (!data)
      return

    const generatedId = calculateRandomConfigurationQuestionId()
    const newQuestion: ConfigurationQuestion = {
      id: generatedId,
      title: "",
      description: "",
      type: type,
      answers: []
    }

    const updatedData = data
    updatedData.questions.push(newQuestion)

    props.saveToDatabase(updatedData)
  }

  return <Grid container spacing={1}>
    <Grid item xs={12}>
      <input type="hidden" value={JSON.stringify(data)} />
      {data && (
        <Accordion
          sx={{
            width: "600px",
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
              >
                <Grid container spacing={1}>
                  <Grid item xs="auto">
                    <Button
                      startIcon={<AddIcon />}
                      color="primary"
                      variant="contained" onClick={addRegularQuestion}>Add regular question</Button>
                  </Grid>
                  <Grid item xs>
                    [Screenshot of a regular question]
                  </Grid>
                </Grid>
              </Box>

              <Box
                border={1}
                borderColor="primary.main"
              >
                <Grid container spacing={1}>
                  <Grid item xs="auto">
                    <Button
                      startIcon={<AddIcon />}
                      color="primary"
                      variant="contained" onClick={addMultipleQuestion}>Add multiple question</Button>
                  </Grid>
                  <Grid item xs>
                    [Screenshot of a multiple question]
                  </Grid>
                </Grid>
              </Box>
            </Stack>
          </AccordionDetails>
        </Accordion>
      )}
    </Grid>
  </Grid>
}

export default Edit
