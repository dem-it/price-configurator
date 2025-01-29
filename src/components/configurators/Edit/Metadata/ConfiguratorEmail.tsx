import { TextField } from "@mui/material"
import { useState } from "react"
import { GroupsProps } from "../Properties"

const ConfiguratorEmail = (props: GroupsProps) => {

  const [email, setEmail] = useState(props.data.meta?.adminEmail || "")

  const emailUpdated = (emailAddress:string) => {
    if(!props.data.meta)
      props.data.meta = {}

    props.data.meta.adminEmail = emailAddress
    props.saveToDatabase(props.data)
  }

  return (<>
    <p>
      Setup an e-mail address where requested quotes are being sent to:
    </p>
    <TextField
      variant="standard"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      onBlur={(e) => emailUpdated(e.target.value)}
      label="Email"
    />
  </>)
}

export default ConfiguratorEmail