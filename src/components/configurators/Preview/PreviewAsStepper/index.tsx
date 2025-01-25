import ArrowLeftIcon from "@mui/icons-material/ArrowLeft"
import ArrowRightIcon from "@mui/icons-material/ArrowRight"
import { Button, Stack, Step, StepLabel, Stepper } from "@mui/material"
import * as React from "react"
import { useEffect, useState } from "react"
import { PreviewPropsWithAnswers } from "../Properties"
import QuestionsPreview from "../Questions/index"
import { calculateCanGoNext } from "../utils/CalculationUtils"
import Finished from "./Finished"
import Template from "./Template"

const PreviewAsStepper = (props: PreviewPropsWithAnswers) => {

  const [activeStep, setActiveStep] = useState(0)
  const [currentGroup, setCurrentGroup] = useState(props.data.groups[activeStep])
  // const [selectedAnswer, setSelectedAnswer] = useState<SelectedAnswer | undefined>(undefined)
  const [canGoNext, setCanGoNext] = useState(false)

  const handleNext = () => setActiveStep((prevActiveStep) => prevActiveStep + 1)
  const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1)
  const handleReset = () => setActiveStep(0)

  // const answerSelected = (answer: SelectedAnswer) => {
  //   const selectedAnswers = props.selectedAnswers.filter(x => x.questionId !== answer.questionId)
  //   selectedAnswers.push(answer)
  //   props.setSelectedAnswers(selectedAnswers)
  // }

  useEffect(() => {
    setCurrentGroup(props.data.groups[activeStep])
  }, [activeStep, props.data.groups])

  // useEffect(() => {
  //   if (!props.selectedAnswers || !currentGroup) {
  //     setSelectedAnswer(undefined)
  //     return
  //   }

  //   const questionAnswer = props.selectedAnswers.find(answer => answer.questionId === currentGroup.id)
  //   setSelectedAnswer(questionAnswer)

  // }, [currentGroup, props.selectedAnswers])

  /*
  * This effect is used to enable the next button when an answer is selected
  **/
  useEffect(() => {
    if (!currentGroup)
      setCanGoNext(false)
    else {
      const canGoNextCalculated = calculateCanGoNext({ ...props, groupId: currentGroup.id })
      setCanGoNext(canGoNextCalculated)
    }
  }, [props.selectedAnswers, currentGroup])

  const isLastStep = activeStep === props.data.groups.length - 1
  const isFinished = activeStep === props.data.groups.length

  if (isFinished)
    return <Finished props={props} handleReset={handleReset} />

  const NavigationButtons = ({ innerContent }: { innerContent: JSX.Element }) => {

    return <Stack direction="row" spacing={2} justifyContent="space-between">
      <Button
        color="inherit"
        disabled={activeStep === 0}
        onClick={handleBack}
        startIcon={<ArrowLeftIcon />}
      >
        Back
      </Button>

      {innerContent}

      <Button
        onClick={handleNext}
        color="primary"
        variant="contained"
        endIcon={<ArrowRightIcon />}
        disabled={!canGoNext}>
        {isLastStep ? "Finish" : "Next"}
      </Button>
    </Stack>
  }

  return (
    <Stack
      direction="column"
      spacing={2}
      sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {props.data.groups.map((group) => {
          const stepProps: { completed?: boolean } = {}
          const labelProps: {
            optional?: React.ReactNode
          } = {}
          // if(question.isOptional) {
          //   labelProps.optional = <>Optional</>
          // }

          return (
            <Step key={`stepper-group-${group.id}`} {...stepProps}>
              <StepLabel {...labelProps}>{group.title}</StepLabel>
            </Step>
          )
        })}
      </Stepper>

      <Stack direction="column" spacing={2} sx={{ marginTop: 4 }}>
        <NavigationButtons innerContent={<h1>{currentGroup.title}</h1>} />
        <Template props={props}>
          <QuestionsPreview {...props} groupId={currentGroup.id} />
        </Template>
        <NavigationButtons innerContent={<></>} />
      </Stack>
    </Stack>
  )
}

export default PreviewAsStepper