import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import * as dayjs from "dayjs";
import { useContext, useState } from "react";
import { AuthContext } from "~/Authentication/contexts";
import "Orders/components/OrderDetailsPage/OrderDetailsPage.scss";
import { CustomDialog } from "~/shared/components";

const SubscriptionDetails = (props: any) => {
  const { auth } = useContext(AuthContext);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const handleConfirmModal = () =>
    setIsConfirmModalOpen((prev: boolean) => !prev);

  const isUserAdmin = auth.roles === "ADMIN";

  const { item, cancelSubscriptionMutation } = props;
  console.log(item, "ITEM");
  return (
    <div>
      <Accordion sx={{ marginBottom: "15px" }}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{
            "&.MuiAccordionSummary-content": {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            },
          }}
        >
          <Typography>
            Abonament {item.startDate} - {item.endDate}
          </Typography>
          <Button
            color="error"
            variant="contained"
            onClick={(event) => {
              event.stopPropagation();
              return handleConfirmModal();
            }}
          >
            Anulare abonament
          </Button>
        </AccordionSummary>
        <AccordionDetails>
          <Stack direction="row" gap="10px">
            <Stack width="100%">
              {item?.products?.map((item: any) => {
                return (
                  <Box
                    key={item.product._id}
                    sx={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                      border: "1px solid #f7f7f7",
                      borderRadius: "10px",
                      padding: "10px",
                      boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
                    }}
                  >
                    <img
                      style={{ width: "125px", height: "100px" }}
                      src={`${import.meta.env.VITE_BASE_URL}/${
                        item?.product.image
                      }`}
                      alt="product-img"
                    />
                    <Typography>{item.product.title}</Typography>
                    <Typography
                      sx={{ color: "#858585" }}
                    >{`${item.product.price} RON`}</Typography>

                    {item.quantity}
                  </Box>
                );
              })}
            </Stack>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <Typography variant="h4">Detalii livrare</Typography>
              <Typography color="GrayText">
                Adresa: {item?.customerDetails?.street} ap.
                {item?.customerDetails?.apartment}
              </Typography>
              <Typography color="GrayText">
                Judet: {item?.customerDetails?.county}
              </Typography>
              <Typography color="GrayText">
                Localitate: {item?.customerDetails?.city}
              </Typography>
              <Typography color="GrayText">
                Numar de telefon: {item?.customerDetails?.phone}
              </Typography>
              <Typography color="GrayText">
                Recurenta livrare produse: {item?.recurrence}
              </Typography>
              <Typography color="GrayText">Total: {item?.total} RON</Typography>
            </Box>
          </Stack>
        </AccordionDetails>
      </Accordion>
      <CustomDialog
        open={isConfirmModalOpen}
        handleConfirmAction={() => cancelSubscriptionMutation.mutate(item._id)}
        handleCloseAction={handleConfirmModal}
      >
        Sunteti sigur ca doriti sa anulati abonamentul?
      </CustomDialog>
    </div>
  );
};

export default SubscriptionDetails;

//   return (
//   <Typography key={productItem._id}>
//     {productItem?.product.productName} x{productItem?.quantity}
//   </Typography>
// )
