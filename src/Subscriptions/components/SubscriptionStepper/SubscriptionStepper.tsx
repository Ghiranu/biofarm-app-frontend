import React from "react";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import AddOutlined from "@mui/icons-material/AddOutlined";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import VideoLabel from "@mui/icons-material/VideoLabel";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { StepIconProps } from "@mui/material/StepIcon";
import ProductsService from "~/Products/services/products.service";
import { useQuery } from "@tanstack/react-query";
import { Box, Button, Tooltip } from "@mui/material";
import { ProductCard } from "Products";
import { CustomerDetails } from "~/Products/components/CustomerDetails";
import { useCustomerDetails } from "~/Products/containers";
import { SubscriptionSummary } from "../SubscriptionSummary";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useSubscriptionPage } from "~/Subscriptions/containers";
import { SubscriptionDetails } from "../SubscriptionDetails";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  }),
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <AddOutlined />,
    2: <InfoOutlined />,
    3: <VideoLabel />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const steps = [
  {
    label: "Adauga produse",
  },
  {
    label: "Detalii livrare",
  },
  { label: "Sumar" },
] as any;

const SubscriptionStepper = () => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["subscription-products"],
    queryFn: () => ProductsService.getProducts("get-products"),
  });

  const { control, errors, trigger, values } = useCustomerDetails();

  const [activeStep, setActiveStep] = React.useState(0);
  const [createSubscriptionModal, setCreateSubscriptionModal] =
    React.useState(false);

  const handleOpenCreateSubscription = () =>
    setCreateSubscriptionModal((prev) => !prev);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const {
    data: subscriptionData,
    isLoading: subscriptionLoading,
    cancelSubscriptionMutation,
  } = useSubscriptionPage();

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box
            sx={{
              display: "flex",
              gap: "15px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {data?.map((product: any) => {
              return <ProductCard key={product._id} product={product} />;
            })}
          </Box>
        );
      case 1:
        return (
          <div>
            <CustomerDetails
              control={control}
              errors={errors}
              trigger={trigger}
            />
          </div>
        );
      case 2:
        return (
          <SubscriptionSummary
            handleOpenCreateSubscription={handleOpenCreateSubscription}
            values={values}
          />
        );
      default:
        return "Unknown step";
    }
  };

  const isSubscriptionDataValid = subscriptionData !== undefined;
  return (
    <>
      <Tooltip
        disableFocusListener
        disableTouchListener
        title={
          isSubscriptionDataValid && subscriptionData?.length > 0
            ? "Aveti deja un abonament activ."
            : null
        }
      >
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={handleOpenCreateSubscription}
            disabled={subscriptionData && subscriptionData?.length > 0}
            sx={{
              color: "white",
              backgroundColor: "#6C63FF",
              "&:hover": { backgroundColor: "#6C63FF" },
            }}
          >
            Creeaza abonament
          </Button>
        </Box>
      </Tooltip>
      <Box sx={{ padding: "25px" }}>
        {subscriptionData?.map((item) => (
          <SubscriptionDetails
            key={item._id}
            cancelSubscriptionMutation={cancelSubscriptionMutation}
            item={item}
          />
        ))}
      </Box>
      <Dialog
        open={createSubscriptionModal}
        onClose={handleOpenCreateSubscription}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        disableEscapeKeyDown
        fullScreen
      >
        <IconButton
          aria-label="close"
          sx={{ position: "absolute", right: "0", top: "0" }}
          onClick={
            handleOpenCreateSubscription as React.MouseEventHandler<HTMLButtonElement>
          }
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <Stack sx={{ width: "100%" }} spacing={4}>
            <Stepper
              alternativeLabel
              activeStep={activeStep}
              connector={<ColorlibConnector />}
            >
              {steps.map((item: any) => {
                return (
                  <Step key={item.label || Math.random()}>
                    <StepLabel StepIconComponent={ColorlibStepIcon}>
                      {item?.label}
                    </StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            {getStepContent(activeStep)}
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{
                  backgroundColor: "#6C63FF",
                  "&:hover": { backgroundColor: "#6C63FF" },
                }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button
                variant="contained"
                disabled={activeStep === 2}
                sx={{
                  backgroundColor: "#6C63FF",
                  "&:hover": { backgroundColor: "#6C63FF" },
                }}
                onClick={handleNext}
              >
                Next
              </Button>
            </Box>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SubscriptionStepper;
