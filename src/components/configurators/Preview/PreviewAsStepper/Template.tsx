import { Grid } from "@mui/material"
import * as React from "react"
import PreviewPropsWithAnswers from "../PreviewPropsWithAnswers"
import Result from "../Result"

const Template: React.FC<{ children: React.ReactNode, props: PreviewPropsWithAnswers }> = ({ children, props }) => (
  <Grid
    container
    spacing={2}
    sx={{ width: "100%" }}
  >
    <Grid item xs={12} md={8} lg={9}>
      {children}
    </Grid>
    <Grid item xs={12} md={4} lg={3}>
      <Result {...props} />
    </Grid>
  </Grid>
)

export default Template