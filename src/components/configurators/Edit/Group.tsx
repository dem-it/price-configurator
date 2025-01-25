import DashboardCard from "@/components/shared/DashboardCard"
import { Stack, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import AddQuestion from "./AddQuestion"
import { GroupProps } from "./Properties"
import Questions from "./Questions"
import { getGroup } from "./utils/DataUtils"


const Group = (props: GroupProps) => {
    const data = props.data

    const [groupName, setGroupName] = useState("")

    useEffect(() => {
        setGroupName(getGroup(props).title)
    }, [props.groupId])

    return (
        <DashboardCard>
            <Stack direction="column" spacing={2}>
                <TextField
                    label="Group Name"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    onBlur={(e) => {
                        const group = getGroup(props)
                        group.title = e.target.value
                        props.saveToDatabase(data)
                    }} />

                <AddQuestion {...props} />

                <Questions {...props} />
            </Stack>
        </DashboardCard>
    )
}

export default Group