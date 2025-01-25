import { Grid } from "@mui/material"
import * as React from "react"
import { PreviewPropsWithAnswers } from "../Properties"
import ResultSmall from "../ResultSmall"

const Template: React.FC<{ children: React.ReactNode, props: PreviewPropsWithAnswers }> = ({ children, props }) => {
  return (
    <Grid
      container
      spacing={2}
      sx={{ width: "100%" }}
    >
      <Grid item xs={12} md={8} lg={9}>
        {children}
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <ResultSmall {...props} />
      </Grid>
    </Grid>
  )
}

export default Template