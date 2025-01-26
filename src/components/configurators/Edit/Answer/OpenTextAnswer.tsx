import { Grid } from "@mui/material"
import { AnswerProps } from "../Properties"
import Description from "./Description"
import SingleRow from "./SingleRow"
import { CustomTabs, CustomTabsProps } from "./Tabs"
import Title from "./Title"

const OpenTextAnswer = (props: AnswerProps) => {

  const tabs: CustomTabsProps = {
    tabs: [
      {
        label: "Information",
        content: <Grid container spacing={2} alignItems="center">
          <SingleRow label="Title" content={<Title {...props} />} />
          <SingleRow label="Description" content={<Description {...props} />} />
        </Grid>
      }
    ]
  }

  return <>
    <CustomTabs {...tabs} />
  </>
}

export default OpenTextAnswer