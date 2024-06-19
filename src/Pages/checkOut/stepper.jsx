import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CheckOut from './index';
import Review from './Review';
import swal from "sweetalert";

const steps = ['Delivery Address', 'Payment', 'Order Summery'];

export default function LinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const handleOrderPlaced = () => {
    swal({
        title: "Order Placed Successfully", 
        text: "",
        icon: "success",
        buttons: false,
        dangerMode: false,
    })
}

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  
  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: '100%' , p:"20px", minHeight:"100vh"}}>
      <Stepper activeStep={activeStep} className='steper'>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            Order Placed
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 ,}}>
            <Box sx={{ flex: '1 1 auto'}} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
            {activeStep === 0 ? <CheckOut  onClick={handleNext} onBackClick={handleBack} activeStep={activeStep}/> : ""}
            {activeStep === 2 ? <Review/> : ""}

          {/* <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <button
              
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 ,}}
              className='btn_checkout'
            >
              Back
            </button>
            <Box sx={{ flex: '1 1 auto' }} />

            {activeStep === steps.length - 1 ? <button className='btn_checkout' onClick={handleOrderPlaced}>
            Place Order
            </button> : 
            <button className='btn_checkout' onClick={handleNext}>
            Next
          </button>
          }
          </Box> */}
          
        </React.Fragment>
      )}
    </Box>
  );
}