import { Box, Button } from "@mui/material"
import { useTranslation } from "react-i18next"
import { PreviewPropsWithAnswers } from "../Properties"
import Result from "../Result"

const Finished = ({ props, handleReset }: { props: PreviewPropsWithAnswers, handleReset: () => void }) => {
  const { t } = useTranslation(["configurator"])

  return <>
    <Box sx={{ mt: 2, mb: 1 }}>
      <p>
        {t("result.finished")}
      </p>
      <p>
        {t("result.finished-email")}
      </p>
    </Box>
    <Result {...props} />
    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
      <Box sx={{ flex: "1 1 auto" }} />
      <Button onClick={handleReset}>{t("result.start-again-button")}</Button>
    </Box>
  </>
}

export default Finished