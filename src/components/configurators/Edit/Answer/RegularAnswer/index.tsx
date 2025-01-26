import { Grid } from "@mui/material"
import { AnswerProps } from "../../Properties"
import Description from "../Description"
import SingleRow from "../SingleRow"
import Surcharge from "../Surcharge"
import { CustomTabs, CustomTabsProps } from "../Tabs"
import Title from "../Title"
import UploadImage from "../UploadImage"

const RegularAnswer = (props: AnswerProps) => {

  const tabs: CustomTabsProps = {
    tabs: [
      {
        label: "Information",
        content: <Grid container spacing={2} alignItems="center">
          <SingleRow label="Title" content={<Title {...props} />} />
          <SingleRow label="Description" content={<Description {...props} />} />
          <SingleRow label="Surcharge" content={<Surcharge {...props} />} />
        </Grid>
      },
      {
        label: "Image",
        content: <UploadImage {...props} />
      }
    ]
  }

  return <>
    <CustomTabs {...tabs} />
  </>
}

export default RegularAnswer