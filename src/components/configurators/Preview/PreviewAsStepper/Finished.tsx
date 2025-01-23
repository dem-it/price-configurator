import { Box, Button } from "@mui/material"
import PreviewPropsWithAnswers from "../PreviewPropsWithAnswers"
import Result from "../Result"

const Finished = ({ props, handleReset }: { props: PreviewPropsWithAnswers, handleReset: () => void }) => {

  return <>
    <Box sx={{ mt: 2, mb: 1 }}>
      All steps completed - you&apos;re finished
    </Box>
    <Result {...props} />
    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
      <Box sx={{ flex: "1 1 auto" }} />
      <Button onClick={handleReset}>Begin opnieuw</Button>
    </Box>
  </>
}

export default Finished