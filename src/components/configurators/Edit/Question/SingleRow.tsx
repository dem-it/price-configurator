import { Grid } from "@mui/material"

const SingleRow = (props: { label: string, content: JSX.Element }) => {
  return <>
    <Grid item xs={2}><b>{props.label}</b></Grid>
    <Grid item xs={10}>{props.content}</Grid>
  </>
}

export default SingleRow