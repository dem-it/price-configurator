import { Grid, Link, Paper, Tab, Tabs } from "@mui/material"
import Stack from "@mui/material/Stack"
import { useState } from "react"
import { GroupsProps } from "../Properties"
import ConfiguratorEmail from "./ConfiguratorEmail"
import ConfiguratorLanguage from "./ConfiguratorLanguage"
import ConfiguratorStyle from "./ConfiguratorStyle"

const Metadata = (props: GroupsProps) => {
  const [tabIndex, setTabIndex] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue)
  }

  const configuration = props.configuration
  if (!configuration) return <div>No configuration found</div>

  const host = typeof window !== "undefined" ? window.location.host : ""
  const http = host.includes("localhost") ? "http" : "https"
  const previewUrl = `${http}://${host}/configurators/${configuration.partitionKey}/${configuration.rowKey}`

  return (
    <Grid container>
      <Grid item xs='auto'>
        <Tabs
          orientation="vertical"
          // variant="scrollable"
          value={tabIndex}
          onChange={handleChange}
          aria-label="Configurator tab"
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          <Tab label="Accessibility" />
          <Tab label="Settings" />
          <Tab label="Style" />
        </Tabs>
      </Grid>
      <Grid item xs sx={{ p: 3 }}>
        {tabIndex === 0 && (
          <Stack direction="column" spacing={1}>
            <div>
              Preview url:
              <Link href={previewUrl} target="_blank">{previewUrl}</Link>
            </div>
            <div>
              Embed this to your website through:
              <Paper sx={{ padding: 2, backgroundColor: "#f5f5f5", fontFamily: "monospace" }}>
                {`<iframe src="${previewUrl}" width="100%" height="100%"></iframe>`}
              </Paper>
            </div>
          </Stack>
        )}
        {tabIndex === 1 && (
          <>
            <ConfiguratorEmail {...props} />
            <ConfiguratorLanguage {...props} />
          </>
        )}
        {tabIndex === 2 && (
          <ConfiguratorStyle {...props} />
        )}
      </Grid>
    </Grid>
  )
}

export default Metadata
