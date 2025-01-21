import { ConfigurationDto } from "@/api/tables/ConfigurationDto"
import Identifier from "@/components/display/Identifier"
import ConfigurationAnswer from "@/data/configurator/ConfigurationAnswer"
import ConfigurationQuestion from "@/data/configurator/ConfigurationQuestion"
import { Button, Grid, Stack, TextField } from "@mui/material"
import { useState } from "react"
import { NumericFormat } from "react-number-format"

interface AnswerProps {
  configuration: ConfigurationDto,
  question: ConfigurationQuestion,
  answer: ConfigurationAnswer,
  index: number,
  saveAnswer: (id: string, updateAnswer: (arg0: ConfigurationAnswer) => void) => void
}

const Answer = (props: AnswerProps) => {
  const question = props.question
  const answer = props.answer

  const [title, setTitle] = useState(answer.title)
  const [description, setDescription] = useState(answer.description)
  const [surcharge, setSurcharge] = useState(answer.surcharge)
  const [imageId, setImageId] = useState(answer.imageId)

  const updateTitle = (value: string) => {
    props.saveAnswer(answer.id, (x) => {
      x.title = value
    })
  }

  const updateDescription = (value: string) => {
    props.saveAnswer(answer.id, (x) => {
      x.description = value
    })
  }

  const updateSurcharge = (value: string) => {
    props.saveAnswer(answer.id, (x) => {
      x.surcharge = parseSurcharge(value)
    })
  }

  const uploadImage = () => {
    //let the user select an image from their computer
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.onchange = async (event) => {
      const file = (event.target as HTMLInputElement).files?.[0]
      if (file) {
        const date = new Date()
        // fullFilename: yyyy-MM-dd-HH-mm-ss-[filename]
        const fullFilename = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}-${date.getHours().toString().padStart(2, "0")}-${date.getMinutes().toString().padStart(2, "0")}-${date.getSeconds().toString().padStart(2, "0")}-${file.name}`
        const encodedFilename = encodeURIComponent(fullFilename)
        const fileBytes = await file.arrayBuffer()

        try {
          const base64File = Buffer.from(fileBytes).toString("base64")

          await fetch(`/api/blobs/images/${encodedFilename}?organizationId=${props.configuration.partitionKey}&configurationId=${props.configuration.rowKey}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ file: base64File }),
          }).then(response => {

            if (response.ok) {
              setImageId(encodedFilename)

              props.saveAnswer(answer.id, (x) => {
                x.imageId = encodedFilename
              })
            } else if (response.status == 400) {
              response.json().then((data) => {
                const errorMessage = data.error || "Unknown error"
                alert(`Saving the image failed: ${errorMessage}`)
              })
            } else if (response.status == 413) {
              alert("Saving the image failed: Image is too large, maximum 1 MB")
            } else {
              console.error("Failed to upload image")
            }
          })
        } catch (error) {
          console.error("Error uploading image:", error)
        }
      }
    }
    input.click()
  }

  const parseSurcharge = (value: string): number => {
    const result = parseFloat(value.replace("€", "").replace(".", "").replace(",", ".").trim())
    return result
  }

  const leftWidth = 4
  const rightWidth = 12 - leftWidth

  return <Grid container spacing={1}>
    <Grid item xs={12} sx={{ marginTop: 1, marginBottom: 1 }}>
      <Identifier id={answer.id} description={`Answer ${props.index + 1}: ${answer.title}`} />
    </Grid>
    <Grid item container xs={6} spacing={1}>
      <Grid item xs={leftWidth}>Title</Grid>
      <Grid item xs={rightWidth}>
        <TextField
          label="Title"
          variant="standard"
          sx={{ minWidth: "300px", width: "50%" }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={(e) => updateTitle(e.target.value)}
        />
      </Grid>

      <Grid item xs={leftWidth}>Description</Grid>
      <Grid item xs={rightWidth}>

        <TextField
          label="Description"
          variant="standard"
          sx={{ minWidth: "300px", width: "50%" }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onBlur={(e) => updateDescription(e.target.value)}
          multiline={true}
          rows={3}
        />
      </Grid>

      <Grid item xs={leftWidth}>Surcharge</Grid>
      <Grid item xs={rightWidth}>

        <NumericFormat
          label="Surcharge"
          variant="standard"
          value={surcharge}
          onChange={(e) => setSurcharge(parseSurcharge(e.target.value))}
          onBlur={(e) => updateSurcharge(e.target.value)}
          customInput={TextField}
          thousandSeparator="."
          decimalSeparator=","
          valueIsNumericString
          prefix="€ "
        />
      </Grid>
    </Grid>
    <Grid item container xs={6} spacing={1}>
      <Grid item xs={leftWidth}>Image</Grid>
      <Grid item xs={rightWidth}>
        <Stack direction="column" spacing={1}>
          <Button
            variant="outlined"
            color="primary"
            onClick={uploadImage}>
            Upload image
          </Button>

          {imageId && (
            <img
              src={`/api/blobs/images/${imageId}?organizationId=${props.configuration.partitionKey}&configurationId=${props.configuration.rowKey}`}
              alt="Answer"
              width={200}
            />
          )}
        </Stack>
      </Grid>
    </Grid>
  </Grid>
}

export default Answer