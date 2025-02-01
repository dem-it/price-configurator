import ConfigurationQuestionType from "@/data/configurator/ConfigurationQuestionType"
import { Box, Grid } from "@mui/material"
import { useState } from "react"
import "react-quill/dist/quill.snow.css"
import { QuestionProps } from "../Properties"
import { getQuestion } from "../utils/PropertiesUtils"

export enum VariantType {
  Regular = "regular",
  Dropdown = "dropdown",
}

const Variant = (props: QuestionProps) => {
  const question = getQuestion(props)

  const [variant, setVariant] = useState(question.variant ?? VariantType.Regular)

  const updateVariant = (value: string) => {
    setVariant(value)

    props.saveQuestion(question.id, (x) => {
      x.variant = value
    })
  }

  if (question.type !== ConfigurationQuestionType.Regular)
    return <></>

  return <>
    <Grid item container xs={12}>

      <Grid item xs={12}>Selected variant: ({variant})</Grid>
      <Grid item xs={6}>
        <Box
          className={`variant ${variant === VariantType.Regular ? "selected" : ""}`}
          onClick={() => updateVariant(VariantType.Regular)}
        >
          <img
            src="/images/configurator/regular-question.png"
            title="Regular"
            alt="Regular question"
            style={{ height: "120px", maxWidth: "100%" }} />
        </Box>
      </Grid>

      <Grid item xs={6}>
        <Box
          className={`variant ${variant === VariantType.Dropdown ? "selected" : ""}`}
          onClick={() => updateVariant(VariantType.Dropdown)}
        >
          <img
            src="/images/configurator/regular-question-dropdown.png"
            title="Dropdown"
            alt="Dropdown question"
            style={{ height: "120px", maxWidth: "100%" }} />
        </Box>
      </Grid>
    </Grid>

  </>
}

export default Variant