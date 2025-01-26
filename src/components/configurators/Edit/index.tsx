import { ConfigurationDto } from "@/api/tables/ConfigurationDto"
import ConfigurationData from "@/data/configurator/ConfigurationData"
import { Grid } from "@mui/material"
import AddGroup from "./AddGroup"

interface EditProps {
  configuration: ConfigurationDto,
  data: ConfigurationData | undefined,
  saveToDatabase: (updatedData: ConfigurationData) => void
}

const Edit = (props: EditProps) => {
  const configuration = props.configuration
  const data = props.data

  return <Grid container spacing={1}>
    <Grid item xs={12}>
      <input type="hidden" value={JSON.stringify(data)} />

      <AddGroup data={data} saveToDatabase={props.saveToDatabase} />

    </Grid>
  </Grid>
}

export default Edit
