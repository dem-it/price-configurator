import { Box, Tab, Tabs } from "@mui/material"
import { useState } from "react"

export interface CustomTabsProps {
  tabs: CustomTabsPropsTab[]
}

interface CustomTabsPropsTab {
  label: string
  content: JSX.Element
}

export const CustomTabs = (props: CustomTabsProps) => {

  const [tabValue, setTabValue] = useState(0)

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  return <Box
    sx={{
      marginTop: 2,
      flexGrow: 1,
      bgcolor: "background.paper",
      display: "flex",
      // height: 224
    }}
  >
    <Tabs
      orientation="vertical"
      // variant="scrollable"
      value={tabValue}
      onChange={handleTabChange}
      aria-label="Vertical tabs"
      sx={{ borderRight: 1, borderColor: "divider" }}
    >
      {props.tabs.map((tab, index) => {
        return <Tab key={`tab-${index}`} sx={{ width: '150px'}} label={tab.label} {...a11yProps(index)} />
      })}
    </Tabs>

    {props.tabs.map((tab, index) => {
      return (
        <TabPanel 
          style={{
            width: '85%'  
          }}
          key={`tab-panel-${index}`} 
          value={tabValue} 
          index={index}>
        {tab.content}
      </TabPanel>
    )})}
  </Box>
}

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
  style?: any
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  )
}

const a11yProps = (index: number) => {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  }
}