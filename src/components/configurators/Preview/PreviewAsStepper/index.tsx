import Loading from "@/components/display/Loading"
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft"
import ArrowRightIcon from "@mui/icons-material/ArrowRight"
import { Button, Stack, Step, StepLabel, Stepper } from "@mui/material"
import * as React from "react"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { PreviewPropsWithAnswers } from "../Properties"
import QuestionsPreview from "../Questions/index"
import { calculateCanGoNext } from "../utils/CalculationUtils"
import Finished from "./Finished"
import Template from "./Template"

const PreviewAsStepper = (props: PreviewPropsWithAnswers) => {
  const { t } = useTranslation(["configurator"])

  const [activeStep, setActiveStep] = useState(0)
  const [currentGroup, setCurrentGroup] = useState(props.data.groups[activeStep])
  const [canGoNext, setCanGoNext] = useState(false)

  const handleNext = () => setActiveStep((prevActiveStep) => prevActiveStep + 1)
  const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1)
  const handleReset = () => {
    setActiveStep(0)
    props.setSelectedAnswers([])
  }

  useEffect(() => {
    //scroll to top
    window.scrollTo(0, 0)
  }, [activeStep])

  useEffect(() => {
    setCurrentGroup(props.data.groups[activeStep])
  }, [activeStep, props.data.groups])

  /*
  * This effect is used to enable the next button when an answer is selected
  **/
  useEffect(() => {
    const canGoNextCalculated = calculateCanGoNext({ ...props, groupId: currentGroup?.id ?? "" })
    setCanGoNext(canGoNextCalculated)
  }, [props.selectedAnswers, currentGroup])

  const isLastStep = activeStep === props.data.groups.length - 1
  const isFinished = activeStep === props.data.groups.length

  if (isFinished)
    return <Finished props={props} handleReset={handleReset} handleBack={handleBack}/>

  if(!currentGroup)
    return <Loading />

  const NavigationButtons = ({ innerContent }: { innerContent: JSX.Element }) => {

    return <Stack direction="row" spacing={2} justifyContent="space-between">
      <Button
        color="inherit"
        disabled={activeStep === 0}
        onClick={handleBack}
        startIcon={<ArrowLeftIcon />}
      >
        {t("common.button-back")}
      </Button>

      {innerContent}

      <Button
        onClick={handleNext}
        color="primary"
        variant="contained"
        endIcon={<ArrowRightIcon />}
        disabled={!canGoNext}>
        {isLastStep ? t("common.button-done") : t("common.button-next")}
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