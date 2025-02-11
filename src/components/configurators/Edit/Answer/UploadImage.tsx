import { Button, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material"
import { SelectChangeEvent } from "@mui/material/Select"
import { useEffect, useState } from "react"
import "react-quill/dist/quill.snow.css"
import { AnswerProps } from "../Properties"
import { getAnswer } from "../utils/PropertiesUtils"

enum ImageSizeOption {
  SpecifyInPixels = "Specify in pixels",
  SpecifyInPercentage = "Specify in percentage",
  FullWidth = "Full width",
  Auto = "Auto"
}

const getImageSize = (imageSize: string | number | undefined) => {
  if (imageSize === undefined)
    return "100%"
  if (typeof imageSize === "string" && imageSize.endsWith("%"))
    return parseInt(imageSize.replace("%", ""))
  if (typeof imageSize === "string" && imageSize.endsWith("px"))
    return parseInt(imageSize.replace("px", ""))
  return imageSize
}

const getImageSizeOption = (imageSize: string | number | undefined) => {
  if (imageSize === undefined)
    return ImageSizeOption.FullWidth
  if (imageSize === "100%")
    return ImageSizeOption.FullWidth
  if (imageSize === "auto")
    return ImageSizeOption.Auto
  if (typeof imageSize === "string" && imageSize.endsWith("%"))
    return ImageSizeOption.SpecifyInPercentage
  return ImageSizeOption.SpecifyInPixels
}

const constructSizeForDatabase = (value: string | number, option: ImageSizeOption) => {
  if (option === ImageSizeOption.SpecifyInPercentage)
    return `${value}%`
  if (option === ImageSizeOption.SpecifyInPixels)
    return `${value}px`
  return value
}

const UploadImage = (props: AnswerProps) => {
  const answer = getAnswer(props)

  const [imageId, setImageId] = useState(answer.imageId)
  const [imageUrl, setImageUrl] = useState(answer.imageUrl || "")
  const [imageWidth, setImageWidth] = useState(getImageSize(answer.imageWidth))
  const [imageHeight, setImageHeight] = useState(getImageSize(answer.imageHeight))
  const [imageWidthOption, setImageWidthOption] = useState(getImageSizeOption(answer.imageWidth || ""))
  const [imageHeightOption, setImageHeightOption] = useState(getImageSizeOption(answer.imageHeight || ""))

  useEffect(() => {
    const width = constructSizeForDatabase(imageWidth, imageWidthOption)
    props.saveAnswer(answer.id, (x) => x.imageWidth = width)
  }, [imageWidth])

  useEffect(() => {
    const height = constructSizeForDatabase(imageHeight, imageHeightOption)
    props.saveAnswer(answer.id, (x) => x.imageHeight = height)
  }, [imageHeight])

  const handleImageWidthOptionChange = (event: SelectChangeEvent<ImageSizeOption>) => {
    const option = event.target.value as ImageSizeOption

    setImageWidthOption(option)
    let newValue = "100"
    if (option === ImageSizeOption.FullWidth)
      newValue = "100%"
    else if (option === ImageSizeOption.Auto)
      newValue = "auto"

    setImageWidth(newValue)
  }

  const handleImageHeightOptionChange = (event: SelectChangeEvent<ImageSizeOption>) => {
    const option = event.target.value as ImageSizeOption

    setImageHeightOption(option)
    let newValue = "100"
    if (option === ImageSizeOption.FullWidth)
      newValue = "100%"
    else if (option === ImageSizeOption.Auto)
      newValue = "auto"

    setImageHeight(newValue)
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

              props.saveAnswer(answer.id, (x) => x.imageId = encodedFilename)
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

  const handleImageUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const url = event.target.value
    setImageUrl(url)
    props.saveAnswer(answer.id, (x) => x.imageUrl = url)
  }

  const handleImageWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const width = event.target.value
    setImageWidth(width)
  }

  const handleImageHeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const height = event.target.value
    setImageHeight(height)
  }

  const removeImage = () => {
    setImageId(undefined)
    props.saveAnswer(answer.id, (x) => x.imageId = undefined)
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
        <Grid container spacing={2}>
          <Grid item xs style={{ paddingLeft: 0 }}>
            <img
              src={`/api/blobs/images/${imageId}?organizationId=${props.configuration.partitionKey}&configurationId=${props.configuration.rowKey}`}
              alt="Answer"
              style={{
                width: imageWidth ? constructSizeForDatabase(imageWidth, imageWidthOption) : "200px",
                height: imageHeight ? constructSizeForDatabase(imageHeight, imageHeightOption) : "auto",
                maxWidth: imageWidthOption === ImageSizeOption.Auto ? "max-content" : "100%"
              }}
            />
          </Grid>
          <Grid item xs={"auto"}  style={{ paddingRight: 16 }}>
            <Button
              variant="outlined"
              color="error"
              onClick={removeImage}>
              Remove image
            </Button>
          </Grid>
        </Grid>
      )}

      <TextField
        label="Image URL"
        variant="outlined"
        value={imageUrl}
        onChange={handleImageUrlChange}
        fullWidth
      />

      {imageUrl && (
        <img
          src={imageUrl}
          alt="Answer"
          style={{
            width: imageWidth ? constructSizeForDatabase(imageWidth, imageWidthOption) : "200px",
            height: imageHeight ? constructSizeForDatabase(imageHeight, imageHeightOption) : "auto",
            maxWidth: imageWidthOption === ImageSizeOption.Auto ? "max-content" : "100%"
          }}
        />
      )}

      <Grid container spacing={2}>
        <Grid item xs={4} style={{ paddingLeft: 0 }}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Image width</InputLabel>
            <Select
              value={imageWidthOption}
              onChange={handleImageWidthOptionChange}
              label="Image Size"
            >
              <MenuItem value={ImageSizeOption.FullWidth}>Full width</MenuItem>
              <MenuItem value={ImageSizeOption.Auto}>Auto</MenuItem>
              <MenuItem value={ImageSizeOption.SpecifyInPercentage}>Specify in percentage (%)</MenuItem>
              <MenuItem value={ImageSizeOption.SpecifyInPixels}>Specify in pixels (px)</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          {(imageWidthOption === ImageSizeOption.SpecifyInPercentage ||
            imageWidthOption === ImageSizeOption.SpecifyInPixels) && (
            <TextField
              label="Width"
              variant="outlined"
              value={imageWidth}
              onChange={handleImageWidthChange}
              fullWidth
            />
          )}
        </Grid>
        <Grid item xs={4}></Grid>

        <Grid item xs={4} style={{ paddingLeft: 0 }}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Image height</InputLabel>
            <Select
              value={imageHeightOption}
              onChange={handleImageHeightOptionChange}
              label="Image Height"
            >
              <MenuItem value={ImageSizeOption.Auto}>Auto</MenuItem>
              <MenuItem value={ImageSizeOption.SpecifyInPixels}>Specify in pixels (px)</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          {(imageHeightOption === ImageSizeOption.SpecifyInPercentage ||
            imageHeightOption === ImageSizeOption.SpecifyInPixels) && (
            <TextField
              label="Height"
              variant="outlined"
              value={imageHeight}
              onChange={handleImageHeightChange}
              fullWidth
            />
          )}
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>

    </Stack>
  </>
}

export default UploadImage
