import { TextField } from "@mui/material"
import { useState } from "react"
import { GroupsProps } from "../Properties"

const ConfiguratorGoogleAnalytics = (props: GroupsProps) => {

  const [googleAnalyticsId, setGoogleAnalyticsId] = useState(props.data.meta?.googleAnalyticsId || "")

  const googleAnalyticsIdUpdated = (id: string) => {
    if(!props.data.meta)
      props.data.meta = {}

    props.data.meta.googleAnalyticsId = id
    props.saveToDatabase(props.data)
  }

  return (<>
    <p>
      Configure Google Analytics tracking for this configurator. Enter your Google Analytics Measurement ID (e.g., G-XXXXXXXXXX).
    </p>
    <TextField
      variant="standard"
      value={googleAnalyticsId}
      onChange={(e) => setGoogleAnalyticsId(e.target.value)}
      onBlur={(e) => googleAnalyticsIdUpdated(e.target.value)}
      label="Google Analytics Measurement ID"
      placeholder="G-XXXXXXXXXX"
      sx={{ width: "50%" }}
      helperText="This will enable page view and event tracking in the preview mode"
    />
  </>)
}

export default ConfiguratorGoogleAnalytics
