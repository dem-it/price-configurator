import { Checkbox, TextField } from "@mui/material"
import { useState } from "react"
import { NumericFormat } from "react-number-format"
import "react-quill/dist/quill.snow.css"
import { AnswerProps } from "../Properties"
import { getAnswer } from "../utils/PropertiesUtils"

const Surcharge = (props: AnswerProps) => {
  const answer = getAnswer(props)

  const [surcharge, setSurcharge] = useState(answer.surcharge)
  const [surchargeHidden, setSurchargeHidden] = useState(answer.surchargeHidden)

  const updateSurchargeHidden = (value: boolean) => {
    props.saveAnswer(answer.id, (x) => {
      x.surchargeHidden = value
    })
  }

  const parseSurcharge = (value: string): number => {
    const result = parseFloat(value.replace("€", "").replace(" ", "").replace(".", "").replace(",", ".").trim())
    return result
  }

  const updateSurcharge = (value: string) => {
    props.saveAnswer(answer.id, (x) => {
      x.surcharge = parseSurcharge(value)
    })
  }

  return <>
    <label>
      Hide surcharge?

      <Checkbox
        checked={surchargeHidden}
        onChange={(e) => {
          setSurchargeHidden(e.target.checked)
          updateSurchargeHidden(e.target.checked)
        }}
      />
    </label>
    {!surchargeHidden && <>
      <br />
      <NumericFormat
        label="Surcharge"
        variant="standard"
        value={surcharge}
        onChange={(e) => setSurcharge(parseSurcharge(e.target.value))}
        onBlur={(e) => updateSurcharge(e.target.value)}
        customInput={TextField}
        thousandSeparator="."
        decimalSeparator=","
        valueIsNumericString
        prefix="€ "
      />
    </>}
  </>
}

export default Surcharge