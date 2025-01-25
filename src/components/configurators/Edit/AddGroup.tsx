import Loading from "@/components/display/Loading"
import ConfigurationData from "@/data/configurator/ConfigurationData"
import ConfigurationQuestionGroup from "@/data/configurator/ConfigurationQuestionGroup"
import { calculateRandomConfigurationGroupId } from "@/utils/calculations/calculateNewConfigurationId"
import AddIcon from "@mui/icons-material/Add"
import { Button } from "@mui/material"

interface AddGroupProps {
  data: ConfigurationData | undefined,
  saveToDatabase: (updatedData: ConfigurationData) => void
}

const AddGroup = (props: AddGroupProps) => {
    const data = props.data

    const addGroup = () => {
      if (!data)
        return
  
      const generatedId = calculateRandomConfigurationGroupId()
      const newGroup: ConfigurationQuestionGroup = {
        id: generatedId,
        title: "",
        questions: []
      }
  
      const updatedData = data
      updatedData.groups.push(newGroup)
      props.saveToDatabase(updatedData)
    }

    if(!data) 
        return <Loading />

    return (
        <Button 
          startIcon={<AddIcon />}
          color="primary"
          variant="contained" onClick={addGroup}>
            Add group
          </Button>
      )
}

export default AddGroup