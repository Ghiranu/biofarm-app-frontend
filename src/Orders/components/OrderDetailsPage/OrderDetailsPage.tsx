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
import "./OrderDetailsPage.scss";
import { CustomDialog } from "~/shared/components";

const OrderDetailsPage = (props: any) => {
  const { auth } = useContext(AuthContext);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const handleConfirmModal = () =>
    setIsConfirmModalOpen((prev: boolean) => !prev);

  const isUserAdmin = auth.roles === "ADMIN";

  const { item, cancelOrderMutation } = props;
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
            Comanda {dayjs(item.createdDate).format("DD/MM/YYYY")}
          </Typography>
          {isUserAdmin ? (
            <Button
              color="error"
              variant="contained"
              onClick={(event) => {
                event.stopPropagation();
                return handleConfirmModal();
              }}
            >
              Anulare comanda
            </Button>
          ) : null}
        </AccordionSummary>
        <AccordionDetails>
          <Stack direction="row" gap="10px">
            <TableContainer component={Paper}>
              <Table aria-label="spanning table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" colSpan={3}>
                      Detalii
                    </TableCell>
                    <TableCell align="right">Pret</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Denumire produs</TableCell>
                    <TableCell align="right">Cantitate</TableCell>
                    <TableCell align="right">Pret unitar</TableCell>
                    <TableCell align="right">Total produs</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {item?.products.map((productItem: any) => (
                    <TableRow key={productItem?.product?.productName}>
                      <TableCell>{productItem?.product?.productName}</TableCell>
                      <TableCell align="right">
                        {productItem?.quantity}
                      </TableCell>
                      <TableCell align="right">
                        {`${productItem?.product?.price} RON`}
                      </TableCell>
                      <TableCell align="right">
                        {`${
                          productItem?.quantity * productItem?.product?.price
                        } RON`}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={2}>Total</TableCell>
                    <TableCell align="right">{`${item?.total} RON`}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
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
            </Box>
          </Stack>
        </AccordionDetails>
      </Accordion>
      <CustomDialog
        open={isConfirmModalOpen}
        handleConfirmAction={() => cancelOrderMutation.mutate(item._id)}
        handleCloseAction={handleConfirmModal}
      >
        Sunteti sigur ca doriti sa anulati comanda?
      </CustomDialog>
    </div>
  );
};

export default OrderDetailsPage;

//   return (
//   <Typography key={productItem._id}>
//     {productItem?.product.productName} x{productItem?.quantity}
//   </Typography>
// )
