import { CircularProgress } from "@mui/material"

const Loading = (props: any) => {
    return <>
      <CircularProgress color="primary" {...props} />
      Busy loading, a small second please...
    </>
}

export default Loading