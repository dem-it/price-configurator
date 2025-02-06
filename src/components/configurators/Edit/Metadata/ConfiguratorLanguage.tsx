import { MenuItem } from "@mui/material"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import { useState } from "react"
import { GroupsProps } from "../Properties"

const ConfiguratorLanguage = (props: GroupsProps) => {

  const [language, setLanguage] = useState(props.data.meta?.language || "nl")

  const languageUpdated = (language:string) => {
    if(!props.data.meta)
      props.data.meta = {}

    props.data.meta.language = language
    props.saveToDatabase(props.data)
    setLanguage(language)
  }

  return (<>
    <p>
      Update the language of the configurator:
    </p>
    <Select
      label="Update the configurator language"
      value={language}
      onChange={(e:SelectChangeEvent) => languageUpdated(e.target.value)}
      variant="standard"
    >
      <MenuItem value="nl">Dutch</MenuItem>
      <MenuItem value="en">English</MenuItem>
    </Select>
  </>)
}

export default ConfiguratorLanguage