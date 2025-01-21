import { Box, Button } from "@mui/material"
import PreviewPropsWithAnswers from "../PreviewPropsWithAnswers"

const Finished = ({ props, handleReset }: { props: PreviewPropsWithAnswers, handleReset: () => void }) => {

  return <>
    <Box sx={{ mt: 2, mb: 1 }}>
      All steps completed - you&apos;re finished
    </Box>
    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
      <Box sx={{ flex: '1 1 auto' }} />
      <Button onClick={handleReset}>Reset</Button>
    </Box>
  </>
}

export default Finished