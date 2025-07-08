import Loading from "@/components/display/Loading"
import { trackPageView, trackStepNavigation } from "@/utils/googleAnalytics"
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft"
import ArrowRightIcon from "@mui/icons-material/ArrowRight"
import { Box, Button, Stack, Step, StepLabel, Stepper } from "@mui/material"
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

  const [previousActiveStep, setPreviousActiveStep] = useState(0)
  const [activeStep, setActiveStep] = useState(0)
  const [currentGroup, setCurrentGroup] = useState(props.data.groups[activeStep])
  const [canGoNext, setCanGoNext] = useState(false)

  const handleNext = () => {
    const nextStep = activeStep + 1;
    const nextGroup = props.data.groups[nextStep];
    
    // Track step navigation
    if (props.data.meta?.googleAnalyticsId) {
      trackStepNavigation(nextStep + 1, nextGroup?.title || "Finished", "next");
    }
    
    setActiveStep(nextStep);
  }
  
  const handleBack = () => {
    const prevStep = activeStep - 1;
    const prevGroup = props.data.groups[prevStep];
    
    // Track step navigation
    if (props.data.meta?.googleAnalyticsId) {
      trackStepNavigation(prevStep + 1, prevGroup?.title || "Start", "back");
    }
    
    setActiveStep(prevStep);
  }
  
  const handleReset = () => {
    // Track reset action
    if (props.data.meta?.googleAnalyticsId) {
      trackStepNavigation(1, props.data.groups[0]?.title || "Start", "reset");
    }
    
    setActiveStep(0)
    props.setSelectedAnswers([])
  }

  useEffect(() => {
    //only scroll to top if the step is changed
    if (activeStep === previousActiveStep)
      return
    setPreviousActiveStep(activeStep)

    // Track page view for Google Analytics
    if (props.data.meta?.googleAnalyticsId) {
      const currentStepGroup = props.data.groups[activeStep];
      const pageName = activeStep >= props.data.groups.length 
        ? "configurator_finished" 
        : `configurator_step_${activeStep + 1}`;
      const pageTitle = activeStep >= props.data.groups.length 
        ? "Price Configurator - Finished" 
        : `Price Configurator - ${currentStepGroup?.title || `Step ${activeStep + 1}`}`;
      
      trackPageView(pageName, pageTitle);
    }

    //scroll to top
    window.scrollTo(0, 0)
    // post to the parent window that the step is changed
    window.top?.postMessage("price-configurator-step-changed", "*")
  }, [activeStep, props.data.meta?.googleAnalyticsId, props.data.groups])

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

      <Box title={canGoNext ? "" : t("common.button-disabled-message")} >
        <Button
          onClick={handleNext}
          color="primary"
          variant="contained"
          endIcon={<ArrowRightIcon />}
          disabled={!canGoNext}
        >
          {isLastStep ? t("common.button-done") : t("common.button-next")}
        </Button>
      </Box>
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