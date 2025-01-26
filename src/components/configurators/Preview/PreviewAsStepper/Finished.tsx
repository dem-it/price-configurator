import { Box, Button } from "@mui/material"
import { PreviewPropsWithAnswers } from "../Properties"
import Result from "../Result"

const Finished = ({ props, handleReset }: { props: PreviewPropsWithAnswers, handleReset: () => void }) => {

  return <>
    <Box sx={{ mt: 2, mb: 1 }}>
      <p>
        All steps completed - you&apos;re finished.
      </p>
      <p>
        Feel free to email us and we will send you a custom quote within 48 hours!
      </p>
    </Box>
    <Result {...props} />
    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
      <Box sx={{ flex: "1 1 auto" }} />
      <Button onClick={handleReset}>Begin opnieuw</Button>
    </Box>
  </>
}

export default Finished