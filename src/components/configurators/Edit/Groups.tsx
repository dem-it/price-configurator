import ArrowLeftIcon from "@mui/icons-material/ArrowLeft"
import ArrowRightIcon from "@mui/icons-material/ArrowRight"
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline"
import { Button, Stack, Step, StepLabel, Stepper } from "@mui/material"
import { useEffect, useState } from "react"
import Group from './Group'
import { GroupsProps } from "./Properties"

const Groups = (props: GroupsProps) => {
    const data = props.data

    const [activeStep, setActiveStep] = useState(0)
    const [groupName, setGroupName] = useState("")
    const [groupId, setGroupId] = useState<string>("")
    const [isRemoving, setIsRemoving] = useState(false)

    const handleNext = () => setActiveStep((prevActiveStep) => prevActiveStep + 1)
    const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1)

    useEffect(() => {
        setGroupName(data.groups[activeStep].title)
        setGroupId(data.groups[activeStep].id)
    }, [activeStep, data])

    const removeGroup = (id: string) => {
        setIsRemoving(true)
    }

    useEffect(() => {
        if (isRemoving) {
            setActiveStep(activeStep - 1)
            
            const updatedGroups = data.groups.filter(x => x.id !== groupId)
            props.saveToDatabase({ ...data, groups: updatedGroups })
            setIsRemoving(false)
        }
    }, [isRemoving])

    const NavigationButtons = () => {

        return <Stack direction="row" spacing={2} justifyContent="space-between">
            <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                startIcon={<ArrowLeftIcon />}
            >
                Back
            </Button>

            {groupName}

            <Button
                onClick={handleNext}
                color="primary"
                variant="contained"
                endIcon={<ArrowRightIcon />}
                disabled={activeStep >= (data?.groups.length ?? Number.MAX_VALUE) - 1}>
                Next
            </Button>
        </Stack>
    }

    const groups = data.groups

    if (!groupId)
        return <></>

    return (
        <Stack
            direction="column"
            spacing={2}
            sx={{ width: "100%" }}>
            <Stepper activeStep={activeStep}>
                {groups.map((group, index) => {
                    const stepProps: { completed?: boolean } = {}

                    return (
                        <Step key={`group-${group.id}`} {...stepProps}>
                            <StepLabel>
                                {group.title}
                            </StepLabel>
                        </Step>
                    )
                })}
            </Stepper>

            <Stack direction="column" spacing={2} sx={{ marginTop: 4 }}>
                <NavigationButtons />

                <Button
                    startIcon={<RemoveCircleOutlineIcon />}
                    variant='contained'
                    color='error'
                    onClick={(e) => {
                        e.stopPropagation()
                        removeGroup(groupId)
                    }}
                    sx={{ alignSelf: 'flex-end' }}
                >
                    Remove
                </Button>

                {isRemoving && <p>Removing...</p>}
                {!isRemoving && <Group {...props} groupId={groupId} /> }
            </Stack>
        </Stack>
    )
}

export default Groups