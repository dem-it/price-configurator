import { ConfigurationDto } from "@/api/tables/ConfigurationDto"
import ConfigurationData from "@/data/configurator/ConfigurationData"
import ConfigurationQuestion from "@/data/configurator/ConfigurationQuestion"
import ConfigurationQuestionType from "@/data/configurator/ConfigurationQuestionType"
import { calculateRandomConfigurationQuestionId } from "@/utils/calculations/calculateNewConfigurationId"
import AddIcon from "@mui/icons-material/Add"
import { Button, Grid } from "@mui/material"

interface EditProps {
  configuration: ConfigurationDto,
  data: ConfigurationData | undefined,
  saveToDatabase: (updatedData: ConfigurationData) => void
}

const Edit = (props: EditProps) => {
  const configuration = props.configuration
  const data = props.data

  const addQuestion = () => {
    if(!data)
      return

    const generatedId = calculateRandomConfigurationQuestionId()
    const newQuestion: ConfigurationQuestion = {
      id: generatedId,
      title: "",
      description: "Place your description here",
      type: ConfigurationQuestionType.Regular,
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
        <Button
          startIcon={<AddIcon />}
          color="primary"
          variant="contained" onClick={addQuestion}>Add question</Button>
      )}
    </Grid>
  </Grid>
}

export default Edit
