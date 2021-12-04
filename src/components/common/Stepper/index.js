import { Step, StepButton, StepIcon, StepLabel, Stepper } from "@material-ui/core";
import React, { useState } from "react";
import {CustomStepperMuiStep, active, right, rightActive, left, CustomStepperMain} from './custom-stepper.module.scss';

const CustomStepper = ({ steps, activeStep, onStepClick }) => {
    const [currentStep, setCurrentStep] = useState(activeStep || 0);

    const stepClick = (index) => () => {
        setCurrentStep(index);
        if(onStepClick){
            onStepClick(index);
        }
    }
  return (
    <Stepper activeStep={currentStep} connector={false}  className={CustomStepperMain}>
      {(steps || []).map((step, index) => {
        return (
          <Step key={step.label} className={CustomStepperMuiStep}>
            <StepButton className={index <= activeStep ? active : ''} icon={false} onClick={stepClick(index)}>
               <span className={left}></span> {step.label} <span className={index <= activeStep ? rightActive : right}></span>
            </StepButton>
          </Step>
        );
      })}
    </Stepper>
  );
};

export default CustomStepper;
