import { Box, Grid, Link, Paper, Tab, Tabs } from "@mui/material"
import Stack from "@mui/material/Stack"
import { useState } from "react"
import { GroupsProps } from "../Properties"
import ConfiguratorLanguage from "./ConfiguratorLanguage"
import ConfiguratorStyle from "./ConfiguratorStyle"
import ConfigureQuoteRequest from "./ConfigureQuoteRequest"

interface SingleTab {
  Index: number
  Label: string
}

interface TabIndexType {
  Accessibility: SingleTab,
  Settings: SingleTab,
  Style: SingleTab,
  RequestAQuote: SingleTab
}

const TabIndexes: TabIndexType = {
  Accessibility: { Index: 0, Label: "Accessibility" },
  Settings: { Index: 1, Label: "Settings" },
  RequestAQuote: { Index: 2, Label: "Quote request" },
  Style: { Index: 3, Label: "Style" }
}

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

  const tab = <>&nbsp;&nbsp;</>

  return (
    <Grid container>
      <Grid item xs='auto'>
        <Tabs
          orientation="vertical"
          value={tabIndex}
          onChange={handleChange}
          aria-label="Configurator tab"
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          <Tab label={TabIndexes.Accessibility.Label} />
          <Tab label={TabIndexes.Settings.Label} />
          <Tab label={TabIndexes.RequestAQuote.Label} />
          <Tab label={TabIndexes.Style.Label} />
        </Tabs>
      </Grid>
      <Grid item xs sx={{ p: 3 }}>
        {tabIndex === TabIndexes.Accessibility.Index && (
          <Stack direction="column" spacing={1}>
            <div>
              Preview url:
              <Link href={previewUrl} target="_blank">{previewUrl}</Link>
            </div>
            <div>
              Embed this to your website through:
              <Paper sx={{ padding: 2, backgroundColor: "#f5f5f5", fontFamily: "monospace" }}>
                {`<iframe id="PriceConfigurator" src="${previewUrl}" width="100%" height="100%"></iframe>`}
              </Paper>
            </div>
            <hr />
            <div>
              When you want to automatically scroll to the top when the user clicks on the next or back buttons. Please add this script on your website. Please note that the id (currently <b>PriceConfigurator</b>) matches the id of your iframe.
              <Paper sx={{ padding: 2, backgroundColor: "#f5f5f5", fontFamily: "monospace" }}>
                &lt;script type="text/javascript"&gt;
                <Box sx={{ marginLeft: '16px' }}>
                  window.onmessage = function (e) &#123;
                  <Box sx={{ marginLeft: '16px' }}>
                    if (e.data == 'price-configurator-step-changed') &#123;
                    <Box sx={{ marginLeft: '16px' }}>
                      const iframe = document.getElementById('<b>PriceConfigurator</b>')
                      <br />const top = iframe.getBoundingClientRect().top - document.body.getBoundingClientRect().top
                      <br />window.scrollTo(0, top)
                    </Box>
                    &#125;
                  </Box>
                  &#125;
                </Box>
                &lt;/script&gt;
              </Paper>
            </div>
          </Stack>
        )}
        {tabIndex === TabIndexes.Settings.Index && (
          <ConfiguratorLanguage {...props} />
        )}
        {tabIndex === TabIndexes.RequestAQuote.Index && (
          <ConfigureQuoteRequest {...props} />
        )}
        {tabIndex === TabIndexes.Style.Index && (
          <ConfiguratorStyle {...props} />
        )}
      </Grid>
    </Grid>
  )
}

export default Metadata
