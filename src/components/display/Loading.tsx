import { CircularProgress, Stack } from "@mui/material"

const Loading = (props: any) => {
  return <Stack direction='row' spacing={2}>
    <CircularProgress color="primary" {...props} />
    <span>
      Busy loading, a small second please...
    </span>
  </Stack>
}

export default Loading