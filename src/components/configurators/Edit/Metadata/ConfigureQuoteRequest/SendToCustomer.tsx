import { FormControlLabel, Switch } from "@mui/material"
import { useState } from "react"
import { GroupsProps } from "../../Properties"

const SendToCustomer = (props: GroupsProps) => {

  const [sendToCustomer, setSendToCustomer] = useState<boolean>(props.data.meta?.sendQuoteToCustomer || true)

  const handleToggleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked
    setSendToCustomer(checked)

    if (!props.data.meta)
      props.data.meta = {}

    props.data.meta.sendQuoteToCustomer = checked
    props.saveToDatabase(props.data)
  }

  return (<>
    <p>
      Do you want to send the quote to the customer?
    </p>

    <FormControlLabel
      control={
        <Switch
          checked={sendToCustomer}
          onChange={handleToggleChange}
          name="sendToCustomer"
          color="primary"
        />
      }
      label="Send to customer"
    />
  </>)
}

export default SendToCustomer