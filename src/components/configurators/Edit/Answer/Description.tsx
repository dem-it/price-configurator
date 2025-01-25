import quillToolbarConfig from "@/config/quillToolbarConfig"
import dynamic from "next/dynamic"
import { useState } from "react"
import "react-quill/dist/quill.snow.css"
import { AnswerProps } from "../Properties"
import { getAnswer } from "../utils/PropertiesUtils"

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false })

const Description = (props: AnswerProps) => {

    const answer = getAnswer(props)
    const [description, setDescription] = useState(answer.description)

    const updateDescription = (value: string) => {
        props.saveAnswer(answer.id, (x) => {
            x.description = value
        })
    }

    return <>
        <ReactQuill
            value={description}
            onChange={setDescription}
            onBlur={() => updateDescription(description)}
            modules={quillToolbarConfig}
        />
    </>
}

export default Description