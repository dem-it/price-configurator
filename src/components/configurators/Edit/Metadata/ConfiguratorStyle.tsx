import { Button, Stack, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { GroupsProps } from "../Properties"

const ConfiguratorStyle = (props: GroupsProps) => {
  const [css, setCss] = useState("")
  const [showDefaultButton, setShowDefaultButton] = useState(true)

  useEffect(() => {
    if (props.data.meta?.css) {
      setCss(props.data.meta.css)
      setShowDefaultButton(false)
    } else {
      setShowDefaultButton(true)
    }
  }, [props.data.meta?.css])

  const saveCss = (cssInput?: string) => {
    if (!props.data.meta) {
      props.data.meta = {}
    }
    
    const newCss = cssInput ?? css
    const updatedCss = newCss.replace(/<\/?/g, "").replace(/<script/gi, "")
    if(newCss !== updatedCss) 
      setCss(updatedCss)

    props.data.meta.css = updatedCss

    props.saveToDatabase(props.data)
  }

  const addDefaultCss = () => {
    const defaultCss = `
/* This is the result field on the right side of the screen */
.result-small { background-color: lime!important; }
.result-small .title { }
.result-small .sub-title { }
.result-small .no-options { }
.result-small .options { }
.result-small .options .option { }
.result-small .open-text-subtitle { }
.result-small .open-text-answers { }
.result-small .open-text-answers .answer { }
.result-small .total { }
.result-small .total .price { }

/* The buttons with primary color */
button.MuiButton-root.MuiButton-colorPrimary {
   background-color: lime!important;
}

/* Chips */
div.MuiChip-root {
   background-color: lime!important;
}

/* Questions */
.question { }
.question .title { }
.question .description { }
.question .answer.regular { }
.question .answer.multiple { }
.question .answer.open-text { }
`
    setCss(defaultCss)
    setShowDefaultButton(false)
    saveCss(defaultCss)
  }

  return (
    <Stack spacing={2}>
      {showDefaultButton && (
        <Button
          variant="contained"
          color="primary"
          onClick={addDefaultCss}
          style={{ marginTop: "10px", marginLeft: "10px", width: "200px" }}
        >
          Add Default CSS
        </Button>
      )}
      <TextField
        label="Custom CSS"
        multiline
        rows={10}
        variant="outlined"
        value={css}
        onChange={(e) => setCss(e.target.value)}
        onBlur={(e) => saveCss(e.target.value)}
        fullWidth
      />
    </Stack>
  )
}

export default ConfiguratorStyle
