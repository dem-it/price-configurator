import sgMail from "@sendgrid/mail"
import dotenv from "dotenv"
import { NextApiRequest, NextApiResponse } from "next"

dotenv.config()

const apiroute = async (req: NextApiRequest, res: NextApiResponse) => {
  const sendgridKey = process.env.SENDGRID_KEY

  if (!sendgridKey) {
    throw new Error("SENDGRID_KEY is not defined")
  }

  sgMail.setApiKey(sendgridKey)

  switch (req.method) {
  case "POST":
    return handlePostRequest(req, res)
  default:
    res.setHeader("Allow", ["POST"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

const handlePostRequest = async (req: NextApiRequest, res: NextApiResponse) => {

  const { name, email, message, url, phoneNumber, adminEmail, sendToCustomer } = req.body
  if (!name || !email || !message || !url || !adminEmail) {
    return res.status(400).json({ error: "Missing required fields" })
  }

  const receiverEmail = sendToCustomer ? email : adminEmail
  let bcc = [
    {
      email: "dennis@dem-it.nl",
      name: "Admin Price configurator Dem IT"
    }
  ]
  if(sendToCustomer){
    bcc.push(
      {
        email: adminEmail,
        name: "Admin Price configurator Dem IT"
      })
  }

  const msg = {
    personalizations: [
      {
        to: [
          {
            email: receiverEmail,
            name: name
          }
        ],
        bcc: bcc
      }
    ],
    from: { "email": "dennis@dem-it.nl" },
    subject: "Bedankt voor uw aanvraag",
    templateId: "d-8a655dc9a5f342789371a1abab78e604",
    dynamic_template_data: {
      email: email,
      first_name: name,
      content: message,
      url: url,
      phone_number: phoneNumber
    },
  }

  try {
    await sgMail.send(msg)
    return res.status(200).json({ message: "Email sent successfully!" })
  } catch (error: any) {
    console.error(error)
    return res.status(500).json({ error: "Failed to send email." })
  }
}

export default apiroute