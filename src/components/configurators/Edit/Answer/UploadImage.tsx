import { getAnswer } from "@/components/configurators/utils/DataUtils"
import { Button, Stack } from "@mui/material"
import { useState } from "react"
import "react-quill/dist/quill.snow.css"
import { AnswerProps } from "../Properties"

const UploadImage = (props: AnswerProps) => {
  const answer = getAnswer(props)

  const [imageId, setImageId] = useState(answer.imageId)

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

  return <>
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
  </>
}

export default UploadImage