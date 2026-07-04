import { BrevoClient } from "@getbrevo/brevo"
import dotenv from "dotenv"
import { NextApiRequest, NextApiResponse } from "next"

dotenv.config()
const apiroute = async (req: NextApiRequest, res: NextApiResponse) => {
  const brevoKey = process.env.BREVO_KEY

  if (!brevoKey) {
    throw new Error("BREVO_KEY is not defined")
  }

  switch (req.method) {
  case "POST":
    return handlePostRequest(req, res, brevoKey)
  default:
    res.setHeader("Allow", ["POST"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

const handlePostRequest = async (req: NextApiRequest, res: NextApiResponse, brevoKey: string) => {

  const { name, fromEmail, email, message, url, phoneNumber, adminEmail, sendToCustomer, emailTemplate, subject } = req.body
  if (!name || !email || !message || !url || !adminEmail) {
    return res.status(400).json({ error: "Missing required fields" })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const phoneRegex = /^(\+)?([0-9\s-]{7,20})$/

  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" })
  }

  if (phoneNumber && !phoneRegex.test(phoneNumber)) {
    return res.status(400).json({ error: "Invalid phone number format" })
  }

  const client = new BrevoClient({ apiKey: brevoKey })
  const receiverEmail = sendToCustomer ? email : adminEmail
  
  const msg: any = {
    sender: {
      email: fromEmail,
      name: "Vanqo"
    },
    to: [
      {
        email: receiverEmail,
        name,
      },
    ],
    bcc: [
      {
        email: "dennis@dem-it.nl",
        name: "Admin Price configurator Dem IT",
      },
      ...(sendToCustomer && adminEmail !== "dennis@dem-it.nl"
        ? [
            {
              email: adminEmail,
              name: "Admin Price configurator Dem IT",
            },
          ]
        : []),
    ],
    subject: subject || "Price configurator message",
  }

  let finalTemplate = emailTemplate
  if (!finalTemplate || finalTemplate.trim() === "") {
    finalTemplate = getEmailTemplate()
  }

  const content = finalTemplate.replace("{{content}}", message)
  .replace("{{ content }}", message)
    .replace("{{first_name}}", name)
    .replace("{{ first_name }}", name)
    .replace("{{email}}", email)
    .replace("{{ email }}", email)
    .replace("{{url}}", url)
    .replace("{{ url }}", url)
    .replace("{{phone_number}}", phoneNumber)
    .replace("{{ phone_number }}", phoneNumber)

  msg.htmlContent = content

  console.log("Sending Brevo email payload:", msg)

  try {
    await client.transactionalEmails.sendTransacEmail(msg)
    return res.status(200).json({ message: "Email sent successfully!" })
  } catch (error: any) {
    console.error("Brevo send failed:", error.response?.body ?? error)
    return res.status(500).json({ error: "Failed to send email." })
  }
}

const getEmailTemplate = () => {
  return String.raw`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"> <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="format-detection" content="telephone=no"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Bedankt voor je aanvraag</title><style type="text/css" emogrify="no">#outlook a { padding:0; } .ExternalClass { width:100%; } .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div { line-height: 100%; } table td { border-collapse: collapse; mso-line-height-rule: exactly; } .editable.image { font-size: 0 !important; line-height: 0 !important; } .nl2go_preheader { display: none !important; mso-hide:all !important; mso-line-height-rule: exactly; visibility: hidden !important; line-height: 0px !important; font-size: 0px !important; } body { width:100% !important; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; margin:0; padding:0; } img { outline:none; text-decoration:none; -ms-interpolation-mode: bicubic; } a img { border:none; } table { border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; } th { font-weight: normal; text-align: left; } *[class="gmail-fix"] { display: none !important; } </style><style type="text/css" emogrify="no"> @media (max-width: 600px) { .gmx-killpill { content: ' \03D1';} } </style><style type="text/css" emogrify="no">@media (max-width: 600px) { .gmx-killpill { content: ' \03D1';} .r0-o { border-style: solid !important; margin: 0 auto 0 auto !important; width: 320px !important } .r1-i { background-color: #ffffff !important } .r2-o { border-style: solid !important; margin: 0 auto 0 auto !important; width: 100% !important } .r3-c { box-sizing: border-box !important; display: block !important; valign: top !important; width: 100% !important } .r4-o { border-style: solid !important; width: 100% !important } .r5-i { padding-bottom: 15px !important; padding-top: 15px !important } .r6-o { border-bottom-color: #ffffff !important; border-left-color: #ffffff !important; border-right-color: #ffffff !important; border-style: solid !important; border-top-color: #ffffff !important; margin: 0 auto 0 0 !important; width: 100% !important } .r7-i { background-color: #0a3752 !important; padding-bottom: 15px !important; padding-left: 15px !important; padding-right: 15px !important; padding-top: 15px !important; text-align: left !important } .r8-c { box-sizing: border-box !important; text-align: center !important; valign: top !important; width: 100% !important } .r9-i { padding-bottom: 20px !important; padding-left: 15px !important; padding-right: 15px !important; padding-top: 20px !important } .r10-i { padding-left: 0px !important; padding-right: 0px !important } .r11-c { box-sizing: border-box !important; padding: 0 !important; text-align: center !important; valign: top !important; width: 100% !important } .r12-o { border-style: solid !important; margin: 0 auto 0 auto !important; margin-bottom: 15px !important; margin-top: 15px !important; width: 100% !important } .r13-i { padding: 0 !important; text-align: center !important } .r14-r { background-color: #0a3752 !important; border-radius: 4px !important; border-width: 0px !important; box-sizing: border-box; height: initial !important; padding: 0 !important; padding-bottom: 12px !important; padding-top: 12px !important; text-align: center !important; width: 100% !important } .r15-c { box-sizing: border-box !important; padding-bottom: 15px !important; padding-top: 15px !important; text-align: left !important; valign: top !important; width: 100% !important } body { -webkit-text-size-adjust: none } .nl2go-responsive-hide { display: none } .nl2go-body-table { min-width: unset !important } .mobshow { height: auto !important; overflow: visible !important; max-height: unset !important; visibility: visible !important } .resp-table { display: inline-table !important } .magic-resp { display: table-cell !important } } </style><style type="text/css">p, h1, h2, h3, h4, ol, ul, li { margin: 0; } .nl2go-default-textstyle { color: #3b3f44; font-family: arial,helvetica,sans-serif; font-size: 16px; line-height: 1.5; word-break: break-word } .default-button { color: #ffffff; font-family: arial,helvetica,sans-serif; font-size: 16px; font-style: normal; font-weight: normal; line-height: 1.15; text-decoration: none; word-break: break-word } a, a:link { color: #0092ff; text-decoration: underline } .default-heading1 { color: #1F2D3D; font-family: arial,helvetica,sans-serif; font-size: 36px; font-weight: 400; word-break: break-word } .default-heading2 { color: #1F2D3D; font-family: arial,helvetica,sans-serif; font-size: 32px; font-weight: 400; word-break: break-word } .default-heading3 { color: #1F2D3D; font-family: arial,helvetica,sans-serif; font-size: 24px; font-weight: 400; word-break: break-word } .default-heading4 { color: #1F2D3D; font-family: arial,helvetica,sans-serif; font-size: 18px; font-weight: 400; word-break: break-word } a[x-apple-data-detectors] { color: inherit !important; text-decoration: inherit !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important; } .no-show-for-you { border: none; display: none; float: none; font-size: 0; height: 0; line-height: 0; max-height: 0; mso-hide: all; overflow: hidden; table-layout: fixed; visibility: hidden; width: 0; } </style><!--[if mso]><xml> <o:OfficeDocumentSettings> <o:AllowPNG/> <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings> </xml><![endif]--><style type="text/css">a:link{color: #0092ff; text-decoration: underline;}</style></head><body bgcolor="#ffffff" text="#3b3f44" link="#0092ff" yahoo="fix" style="background-color: #ffffff;"> <table cellspacing="0" cellpadding="0" border="0" role="presentation" class="nl2go-body-table" width="100%" style="background-color: #ffffff; width: 100%;"><tr><td> <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="600" align="center" class="r0-o" style="table-layout: fixed; width: 600px;"><tr><td valign="top" class="r1-i" style="background-color: #ffffff;"> <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="100%" align="center" class="r2-o" style="table-layout: fixed; width: 100%;"><tr><th width="100%" valign="top" class="r3-c" style="font-weight: normal;"> <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="600" align="center" class="r2-o" style="table-layout: fixed; width: 600px;"><tr><td class="r5-i" style="font-size: 0px; line-height: 0px; padding-bottom: 15px; padding-top: 15px;"> <img src="https://img.mailinblue.com/11592883/images/content_library/original/6a4947235dd83a38aa67ad8d.png" width="600" border="0" style="display: block; width: 100%;"></td> </tr></table><table cellspacing="0" cellpadding="0" border="0" role="presentation" width="600" class="r4-o" style="table-layout: fixed; width: 600px;"><tr><td class="r5-i nl2go-default-textstyle" style="color: #3b3f44; font-family: arial,helvetica,sans-serif; font-size: 16px; line-height: 1.5; word-break: break-word; padding-bottom: 15px; padding-top: 15px;"> <p style="background-color: #487995; padding: 0px; margin: 0px;"> </p> </td> </tr></table><table cellspacing="0" cellpadding="0" border="0" role="presentation" width="100%" align="left" class="r6-o" style="table-layout: fixed; width: 100%;"><tr><td align="left" valign="top" class="r7-i nl2go-default-textstyle" style="color: #3b3f44; font-family: arial,helvetica,sans-serif; font-size: 16px; line-height: 1.5; word-break: break-word; background-color: #0a3752; padding-bottom: 15px; padding-left: 15px; padding-right: 15px; padding-top: 15px; text-align: left;"> <div><p style="margin: 0;"><span style="color: rgb(255, 255, 255);">Bedankt voor uw aanvraag</span></p><p style="margin: 0;"><br></p><p style="margin: 0;"><span style="color: rgb(255, 255, 255);">Wat leuk dat je een aanvraag hebt gedaan voor een campervan via onze site.</span></p></div> </td> </tr></table></th> </tr></table><table cellspacing="0" cellpadding="0" border="0" role="presentation" width="100%" align="center" class="r2-o" style="table-layout: fixed; width: 100%;"><tr><td class="r9-i" style="padding-bottom: 20px; padding-top: 20px;"> <table width="100%" cellspacing="0" cellpadding="0" border="0" role="presentation"><tr><th width="100%" valign="top" class="r3-c" style="font-weight: normal;"> <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="100%" class="r4-o" style="table-layout: fixed; width: 100%;"><tr><td valign="top" class="r10-i" style="padding-left: 15px; padding-right: 15px;"> <table width="100%" cellspacing="0" cellpadding="0" border="0" role="presentation"><tr><td class="r11-c" align="center" style="align: center; padding-bottom: 15px; padding-top: 15px; valign: top;"> <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="285" class="r12-o" style="background-color: #0a3752; border-collapse: separate; border-color: #0a3752; border-radius: 4px; border-style: solid; border-width: 0px; table-layout: fixed; width: 285px;"><tr><td height="18" align="center" valign="top" class="r13-i nl2go-default-textstyle" style="word-break: break-word; background-color: #0a3752; border-radius: 4px; color: #ffffff; font-family: arial,helvetica,sans-serif; font-size: 16px; font-style: normal; line-height: 1.15; padding-bottom: 12px; padding-top: 12px; text-align: center;"> 
  <a href="https://calm-mushroom-08ce08a03.4.azurestaticapps.net" class="r14-r default-button" target="_blank" data-btn="1" style="font-style: normal; font-weight: normal; line-height: 1.15; text-decoration: none; word-break: break-word; word-wrap: break-word; display: block; -webkit-text-size-adjust: none; color: #ffffff; font-family: arial,helvetica,sans-serif; font-size: 16px;"> <span>Prijs Configurator</span></a> </td> </tr></table></td> </tr></table></td> </tr></table></th> </tr></table></td> </tr></table><table cellspacing="0" cellpadding="0" border="0" role="presentation" width="100%" align="center" class="r2-o" style="table-layout: fixed; width: 100%;"><tr><td class="r9-i" style="padding-bottom: 20px; padding-top: 20px;"> <table width="100%" cellspacing="0" cellpadding="0" border="0" role="presentation"><tr><th width="100%" valign="top" class="r3-c" style="font-weight: normal;"> <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="100%" class="r4-o" style="table-layout: fixed; width: 100%;"><tr><td valign="top" class="r10-i" style="padding-left: 15px; padding-right: 15px;"> <table width="100%" cellspacing="0" cellpadding="0" border="0" role="presentation"><tr><td class="r15-c nl2go-default-textstyle" align="left" style="color: #3b3f44; font-family: arial,helvetica,sans-serif; font-size: 16px; line-height: 1.5; word-break: break-word; padding-bottom: 15px; padding-top: 15px; text-align: left; valign: top;"> <div><p style="margin: 0;">Beste {{ first_name }},</p><p style="margin: 10px 0px;">Zie hieronder de aanvraag die u heeft gedaan.</p><p style="margin: 0;">{{ content }}</p><p style="margin: 0;"><br></p><p style="margin: 0;">Hartelijk dank voor uw aanvraag.</p><p style="margin: 0;"><br></p><p style="margin: 0;">Uw e-mail: {{ email }}</p><p style="margin: 0;">Uw telefoonnummer: {{ phone_number }}</p></div> </td> </tr><tr><td class="r15-c nl2go-default-textstyle" align="left" style="color: #3b3f44; font-family: arial,helvetica,sans-serif; font-size: 16px; line-height: 1.5; word-break: break-word; padding-bottom: 15px; padding-top: 15px; text-align: left; valign: top;"> <div><p style="margin: 0;"><span style="font-size: 10px;">Deze configuratie komt vanaf de website: {{ url }}</span></p></div> </td> </tr></table></td> </tr></table></th> </tr></table></td> </tr></table></td> </tr></table></td> </tr></table></body></html>`;
}

export default apiroute
