import SelectedAnswer from "@/data/configurator/selection/SelectedAnswer"
import { Box, Tab, Tabs } from "@mui/material"
import * as React from "react"
import { useState } from "react"
import PreviewAsStepper from "./PreviewAsStepper"
import PreviewProps from "./PreviewProps"
import PreviewPropsWithAnswers from "./PreviewPropsWithAnswers"

const Preview = (props: PreviewProps) => {
  const configuration = props.configuration
  const data = props.data

  const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswer[]>([])

  const newProps: PreviewPropsWithAnswers = {
    selectedAnswers: selectedAnswers,
    setSelectedAnswers: setSelectedAnswers,
    ...props
  }

  return <>
    <PreviewAsStepper {...newProps} />
    {/* <PreviewAsTabs {...props} /> */}

  </>
}

const PreviewAsTabs = (props: PreviewProps) => {

  interface TabPanelProps {
    children?: React.ReactNode
    index: number
    value: number
  }

  function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    )
  }

  function a11yProps(index: number) {
    return {
      id: `question-tabs-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    }
  }

  const data = props.data
  const [tabIndex, setTabIndex] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue)
  }

  return <>
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Tabs value={tabIndex} onChange={handleChange} aria-label="basic tabs example">
        {data.questions.map((question, index) => {
          return <Tab key={`question-${question.id}`} label={question.title} {...a11yProps(index)} />
        })}
      </Tabs>
    </Box>
    <CustomTabPanel value={tabIndex} index={0}>
      Item One
    </CustomTabPanel>
    <CustomTabPanel value={tabIndex} index={1}>
      Item Two
    </CustomTabPanel>
    <CustomTabPanel value={tabIndex} index={2}>
      Item Three
    </CustomTabPanel>
  </>
}

export default Preview