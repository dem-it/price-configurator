import { ConfigurationDto } from "@/api/tables/ConfigurationDto"
import AddIcon from '@mui/icons-material/Add'
import { Button, Stack } from "@mui/material"
import { useState } from "react"
import { ConfigurationData } from "./ConfigurationData"

interface EditProps {
  configuration: ConfigurationDto
}

const Edit = (props: EditProps) => {
  const configuration = props.configuration

  const [data, setData] = useState<ConfigurationData>(configuration.data ? JSON.parse(configuration.data) : { steps: [] })

  const addStep = () => {

    const newStep = {
      name: `Step ${data.steps.length + 1}`,
    }

    const updatedData = data
    updatedData.steps.push(newStep)
    console.log("Updated step", updatedData, newStep)

    // Save to database
    fetch(`/api/tables/configurations/${configuration.rowKey}/data?organizationId=${configuration.partitionKey}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    }).then(response => {

      setData(updatedData)
    })
  }

  return <>
    <Stack direction="column" spacing={2}>
      <Button 
        startIcon={<AddIcon />}
        color="primary" 
        variant="contained" onClick={addStep}>Add Step</Button>
      <pre>
        {JSON.stringify(data)}
      </pre>
      <p>
        {configuration.name}
      </p>
    </Stack>
  </>
}

export default Edit