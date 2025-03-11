import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import { useState } from "react"
import { GroupsProps } from "../../Properties"

const ConfiguratorEmailFrom = (props: GroupsProps) => {

  const [email, setEmail] = useState(props.data.meta?.adminEmailFrom || "dennis@dem-it.nl")
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const emailUpdated = (emailAddress: string) => {
    if (!props.data.meta)
      props.data.meta = {}

    props.data.meta.adminEmailFrom = emailAddress
    props.saveToDatabase(props.data)
  }

  return (<>
    <p>
      Emails are sent from <a href={`mailto:${email}`}>{email}</a>. If you want to personalize this you can update it here.
    </p>

    <Button variant="outlined" onClick={handleClickOpen}>
      Update the email address that is used to send the mail.
    </Button>
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Update from email</DialogTitle>
      <DialogContent>
        <TextField
          variant="standard"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          fullWidth
        />
        <p>
          When you change and save this field, the email address must be added to the email provider. In order to do that some configuration is needed on our end and on your end.
          <br />
          <br />
          Please send an email with the underneath content or click here: <a href="mailto:dennis@dem-it.nl?subject=Change the from email for the price configurator&body=Dear Dennis,%0A%0AI would like to change the email address that is used to send the emails from the price configurator. Please use these values:%0A%0AFrom Name - This is a user-friendly name that is displayed to your recipient when they receive their email.%0A[your from name]%0A%0AFrom Email Address - This will display to the user as the email address that sent this email. We will send the verification email to the address you enter in this field. If you have not received your verification email after some time, please refer back to the Sender settings and confirm that the &quot;From&quot; email is a valid address.%0A[your email address]%0A%0AReply To - If your user hits reply in their email, the reply will go to this address.%0A[your reply to email address]%0A%0ACompany Address, City, State, Zip Code, Country - Your business address.%0A[your company address]%0A%0AKind regards,%0A[Your name]">dennis@dem-it.nl</a>.
          <br />You will receive further instructions.
          <br />
          <br /><b>Subject:</b> <i>Change the from email for the price configurator</i>
          <br /><b>Body:</b>
          <i>
            Dear Dennis,
            <br />
            <br />
            I would like to change the email address that is used to send the emails from the price configurator. Please use these values:
            <br />
            <br /><b>From Name</b> - This is a user-friendly name that is displayed to your recipient when they receive their email.
            <br />[your from name]
            <br />
            <br /><b>From Email Address</b> - This will display to the user as the email address that sent this email. We will send the verification email to the address you enter in this field. If you have not received your verification email after some time, please refer back to the Sender settings and confirm that the &quot;From&quot; email is a valid address.
            <br />[your email address]
            <br />
            <br /><b>Reply To</b> - If your user hits reply in their email, the reply will go to this address.
            <br />[your reply to email address]
            <br />
            <br /><b>Company Address, City, State, Zip Code, Country</b> - Your business address.
            <br />[your company address]
            <br />
            <br />
            Kind regards,
            <br />
            [Your name]
          </i>
        </p>

      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={() => { emailUpdated(email); handleClose() }} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  </>)
}

export default ConfiguratorEmailFrom