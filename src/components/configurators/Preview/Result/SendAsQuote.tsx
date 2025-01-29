import { Button, Stack, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import ReactDOMServer from "react-dom/server"
import { PreviewPropsWithAnswers } from "../Properties"
import ResultSmall from "../ResultSmall"

const SendAsQuote = (props: PreviewPropsWithAnswers) => {

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

    setStatus("Sending email...")
    setShowMail(false)

    const data = {
      name: name,
      email: email,
      message: constructMessage(),
      url: previewUrl,
      adminEmail: adminEmail,
      phoneNumber: phoneNumber
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
        setStatus("Email sent successfully!")
      } else {
        const data = await response.json()
        setStatus(data.error || "Failed to send email.")
        setShowMail(true)
      }
    } catch (error) {
      setStatus("An unexpected error occurred.")
    }
  }

  return <Stack spacing={2} direction="column">
    <p>
      Stuur een bevestiging van de offerte naar jezelf of een ander. Wij worden hier ook van op de hoogte gebracht.
    </p>
    {status && <p>{status}</p>}
    {showMail && (
      <>
        <TextField
          label="Naam"
          value={name}
          onChange={(event) => setName(event.target.value)}
          fullWidth
        />
        <TextField
          label="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          fullWidth
        />
        <TextField
          label="Phone"
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
          Verstuur offerte
        </Button>
      </>
    )}
  </Stack>

}

export default SendAsQuote