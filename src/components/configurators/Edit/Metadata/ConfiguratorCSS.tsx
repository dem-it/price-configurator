import { useState, useEffect } from "react"
import { TextField, Button } from "@mui/material"
import { GroupsProps } from "../Properties"

const ConfiguratorCSS = (props: GroupsProps) => {
  const [css, setCss] = useState("")
  const [showDefaultButton, setShowDefaultButton] = useState(true)

  useEffect(() => {
    if (props.data.meta?.customCSS) {
      setCss(props.data.meta.customCSS)
      setShowDefaultButton(false)
    }
  }, [props.data.meta?.customCSS])

  const saveCss = () => {
    if (!props.data.meta) {
      props.data.meta = {}
    }
    props.data.meta.customCSS = css
    props.saveToDatabase(props.data)
  }

  const addDefaultCss = () => {
    const defaultCss = `
      .answer.multiple .label {
        font-weight: bold;
        display: inline-block;
      }
      .answer.multiple .description {
        size: 0.8em;
      }
      .answer.regular.dropdown {
        margin-top: 0px;
      }
      .answer .description p,
      .result .description p {
        margin: 0;
      }
      .question .description p {
        margin: 0;
      }
    `
    setCss(defaultCss)
    setShowDefaultButton(false)
  }

  return (
    <div>
      <TextField
        label="Custom CSS"
        multiline
        rows={10}
        variant="outlined"
        value={css}
        onChange={(e) => setCss(e.target.value)}
        fullWidth
      />
      <Button
        variant="contained"
        color="primary"
        onClick={saveCss}
        style={{ marginTop: "10px" }}
      >
        Save CSS
      </Button>
      {showDefaultButton && (
        <Button
          variant="contained"
          color="secondary"
          onClick={addDefaultCss}
          style={{ marginTop: "10px", marginLeft: "10px" }}
        >
          Add Default CSS
        </Button>
      )}
    </div>
  )
}

export default ConfiguratorCSS
