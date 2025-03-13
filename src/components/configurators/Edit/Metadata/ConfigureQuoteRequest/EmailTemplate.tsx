import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { GroupsProps } from "../../Properties"

const EmailTemplate = (props: GroupsProps) => {

  const [emailTemplate, setEmailTemplate] = useState("")
  const [emailSubject, setEmailSubject] = useState(props.data.meta?.emailSubject || "Bedankt voor uw aanvraag")
  const [open, setOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const emailSubjectUpdated = (subject:string) => {
    if(!props.data.meta)
      props.data.meta = {}

    props.data.meta.emailSubject = subject
    props.saveToDatabase(props.data)
  }

  useEffect(() => {

    fetch(`/api/blobs/email-templates/${props.configuration.partitionKey}/${props.configuration.rowKey}?timestamp=${Date.now()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    }).then(response => {
      if (response.status === 204) {
        setEmailTemplate("<h1>Template example</h1>")
      }
      else {
        response.text().then(text => {
          setEmailTemplate(text)
        })
      }
    })
  }, [])

  const emailTemplateUpdated = (emailTemplate: string) => {
    setIsSaving(true)
    fetch(`/api/blobs/email-templates/${props.configuration.partitionKey}/${props.configuration.rowKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ template: emailTemplate }),
    }).then(response => {
      handleClose()
      setIsSaving(false)
    })
  }

  return (<>
    <p>
      We use a default email template. If you want to have a personalized email template, you can edit it here.
    </p>

    <TextField
      variant="standard"
      value={emailSubject}
      onChange={(e) => setEmailSubject(e.target.value)}
      onBlur={(e) => emailSubjectUpdated(e.target.value)}
      label="Email subject"
      sx={{ width: "50%" }}
    />
    <br />
    <br />

    <Button variant="outlined" onClick={handleClickOpen}>
      Update your own email template
    </Button>
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Update email template</DialogTitle>
      <DialogContent>
        <p>
          Add your custom email template HTML here. You can use the following placeholders:
          <br />
          <ul>
            <li>
              <b>&#123;&#123;email&#125;&#125;</b> will be replaced with the email address of the user
            </li>
            <li>
              <b>&#123;&#123;first_name&#125;&#125;</b> will be replaced with the first name of the user
            </li>
            <li>
              <b>&#123;&#123;content&#125;&#125;</b> will be replaced with the result content of the configurator
            </li>
            <li>
              <b>&#123;&#123;url&#125;&#125;</b> will be replaced with the URL of the configurator, so you know where it originates from
            </li>
            <li>
              <b>&#123;&#123;phone_number&#125;&#125;</b> will be replaced with the phone number of the user
            </li>
          </ul>
        </p>
        <TextField
          variant="standard"
          multiline
          rows={15}
          value={emailTemplate}
          onChange={(e) => setEmailTemplate(e.target.value)}
          label="Email template"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        {isSaving ? "Saving..." : <>
          <Button onClick={() => { emailTemplateUpdated(emailTemplate) }} color="primary">
            Save
          </Button>
        </>}
      </DialogActions>
    </Dialog>
  </>)
}

export default EmailTemplate