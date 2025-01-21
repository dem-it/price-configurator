import SelectedAnswer from "@/data/configurator/selection/SelectedAnswer"
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft"
import ArrowRightIcon from "@mui/icons-material/ArrowRight"
import { Button, Stack, Step, StepLabel, Stepper } from "@mui/material"
import * as React from 'react'
import { useEffect, useState } from "react"
import PreviewPropsWithAnswers from "../PreviewPropsWithAnswers"
import QuestionPreview from "../Question/index"
import Finished from "./Finished"
import Template from "./Template"

const PreviewAsStepper = (props: PreviewPropsWithAnswers) => {
  const [activeStep, setActiveStep] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(props.data.questions[activeStep])
  const [selectedAnswer, setSelectedAnswer] = useState<SelectedAnswer | undefined>(undefined)

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  const answerSelected = (answer: SelectedAnswer) => {
    const selectedAnswers = props.selectedAnswers.filter(x => x.questionId !== answer.questionId)
    selectedAnswers.push(answer)
    props.setSelectedAnswers(selectedAnswers)
  }

  useEffect(() => {
    if (!props.data.questions)
      return

    setCurrentQuestion(props.data.questions[activeStep])
  }, [activeStep, props.data.questions])

  useEffect(() => {
    if (!props.selectedAnswers || !currentQuestion) {
      setSelectedAnswer(undefined)
      return
    }

    const questionAnswer = props.selectedAnswers.find(answer => answer.questionId === currentQuestion.id)
    setSelectedAnswer(questionAnswer)

  }, [currentQuestion, props.selectedAnswers])


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
        disabled={selectedAnswer === undefined}>
        {activeStep === props.data.questions.length - 1 ? 'Finish' : 'Next'}
      </Button>
    </Stack>
  }

  return (
    <Stack
      direction="column"
      spacing={2}
      sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {props.data.questions.map((question, index) => {
          const stepProps: { completed?: boolean } = {}
          const labelProps: {
            optional?: React.ReactNode
          } = {}
          // if(question.isOptional) {
          //   labelProps.optional = <>Optional</>
          // }

          return (
            <Step key={`Step ${question.id}`} {...stepProps}>
              <StepLabel {...labelProps}>{question.title}</StepLabel>
            </Step>
          )
        })}
      </Stepper>

      {activeStep === props.data.questions.length ? (
        <Finished props={props} handleReset={handleReset} />
      ) : (
        <Stack direction="column" spacing={2} sx={{ marginTop: 4 }}>
          <NavigationButtons innerContent={<h1>{props.configuration.name}</h1>} />
          <p>
            Answer:
            {selectedAnswer && JSON.stringify(selectedAnswer)}
          </p>
          <Template props={props}>
            <QuestionPreview
              configuration={props.configuration}
              question={props.data.questions[activeStep]}
              answerSelected={answerSelected} />
          </Template>
          <NavigationButtons innerContent={<></>} />
        </Stack>
      )}
    </Stack>
  )
}

export default PreviewAsStepper