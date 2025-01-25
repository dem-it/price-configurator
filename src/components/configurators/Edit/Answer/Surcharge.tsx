import { getAnswer } from "@/components/configurators/utils/DataUtils"
import { TextField } from "@mui/material"
import { useState } from "react"
import { NumericFormat } from "react-number-format"
import "react-quill/dist/quill.snow.css"
import { AnswerProps } from "../Properties"

const Surcharge = (props: AnswerProps) => {
  const answer = getAnswer(props)

  const [surcharge, setSurcharge] = useState(answer.surcharge)

  const parseSurcharge = (value: string): number => {
    const result = parseFloat(value.replace("€", "").replace(".", "").replace(",", ".").trim())
    return result
  }

  const updateSurcharge = (value: string) => {
    props.saveAnswer(answer.id, (x) => {
      x.surcharge = parseSurcharge(value)
    })
  }

  return <>
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
  </>
}

export default Surcharge