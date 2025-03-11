import { Button, Stack, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import ReactDOMServer from "react-dom/server"
import { useTranslation } from "react-i18next"
import { PreviewPropsWithAnswers } from "../Properties"
import ResultSmall from "../ResultSmall"

const SendAsQuote = (props: PreviewPropsWithAnswers) => {
  const { t } = useTranslation(["configurator"])

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState("")
  const [canSend, setCanSend] = useState(false)
  const [showMail, setShowMail] = useState(true)
  const [phoneNumber, setPhoneNumber] = useState("")

  const configuration = props.configuration

  const host = typeof window !== "undefined" ? window.location.host : ""
  const http = host.includes("localhost") ? "http" : "https"
  const previewUrl = `${http}://${host}/configurators/${configuration.partitionKey}/${configuration.rowKey}`

  const adminEmail = props.data.meta?.adminEmail ?? "dennis@dem-it.nl"
  const sendEmailToCustomer = props.data.meta?.sendQuoteToCustomer ?? true
  const fromEmail = props.data.meta?.adminEmailFrom ?? "dennis@dem-it.nl"
  let emailSubject = props.data.meta?.emailSubject
  if (!emailSubject || emailSubject.trim() === "")
    emailSubject = "Bedankt voor uw aanvraag"

  useEffect(() => {
    if (name && email) {
      setCanSend(true)
    } else {
      setCanSend(false)
    }
  }, [name, email])

  const constructMessage = () => {
    const resultHtml = ReactDOMServer.renderToString(<ResultSmall {...props} />)
    return resultHtml
  }

  const sendMail = async () => {

    setStatus(t("result.sending-email"))
    setShowMail(false)

    const emailTemplateResponse = await fetch(`/api/blobs/email-templates/${props.configuration.partitionKey}/${props.configuration.rowKey}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    })

    let emailTemplate = ""
    if(emailTemplateResponse.status === 200)
      emailTemplate = await emailTemplateResponse.text()

    const data = {
      name: name,
      email: email,
      fromEmail: fromEmail,
      message: constructMessage(),
      url: previewUrl,
      adminEmail: adminEmail,
      phoneNumber: phoneNumber,
      sendToCustomer: sendEmailToCustomer,
      emailTemplate: emailTemplate,
      subject: emailSubject
    }

    try {
      const response = await fetch("/api/emails/confirmation-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setStatus(t("result.email-sent-successfully"))
      } else {
        const data = await response.json()
        setStatus(data.error || t("result.email-sent-failed" + ": " + data.error))
        setShowMail(true)
      }
    } catch (error) {
      setStatus(t("result.email-sent-failed"))
    }
  }

  return <Stack spacing={2} direction="column">
    <p>
      {t("result.send-as-quote")}
    </p>
    {status && <p>{status}</p>}
    {showMail && (
      <>
        <TextField
          label={t("result.form-name")}
          value={name}
          onChange={(event) => setName(event.target.value)}
          fullWidth
        />
        <TextField
          label={t("result.form-email")}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          fullWidth
        />
        <TextField
          label={t("result.form-phone")}
          value={phoneNumber}
          onChange={(event) => setPhoneNumber(event.target.value)}
          fullWidth
        />

        <Button
          variant="contained"
          color="primary"
          onClick={sendMail}
          disabled={!canSend}
        >
          {t("result.send-quote-button")}
        </Button>
      </>
    )}
  </Stack>

}

export default SendAsQuote