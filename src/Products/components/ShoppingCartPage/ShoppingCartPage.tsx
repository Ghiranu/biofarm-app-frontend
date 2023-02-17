import { useEffect, useState } from "react";
import ShoppingCartService from "../../services/shopping-cart.service";
import { Spinner } from "~/shared/components";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Stack,
  Box,
} from "@mui/material";
import { ShoppingCart } from "~/Products/types/classes";
import { useProductStore } from "~/Products/store";
import { CustomerDetails } from "../CustomerDetails";
import { useCustomerDetails } from "~/Products/containers";

const ShoppingCartPage = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ShoppingCart[]>([]);
  const { setShoppingCart } = useProductStore();
  const { control, errors, trigger, handleCheckout } = useCustomerDetails();

  useEffect(() => {
    const getCartProducts = async () => {
      try {
        const response = await ShoppingCartService.getCartProducts(
          "get-cart-products"
        );
        setData(response);
        setShoppingCart(response);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    getCartProducts();
  }, []);

  const calculateTotal = (items: any) => {
    return items
      .map((item: any) => item.product.price)
      .reduce((sum: number, i: number) => sum + i, 0);
  };

  const total = calculateTotal(data);

  return (
    <>
      <Stack direction="row" gap="20px">
        <form>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell align="center">Denumire produs</TableCell>
                  <TableCell align="center">Pret</TableCell>
                  <TableCell align="center">Cantitate</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item) => (
                  <TableRow
                    key={item.product._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <img
                        style={{ width: "125px", height: "100px" }}
                        src={`${import.meta.env.VITE_BASE_URL}/${
                          item?.product.image
                        }`}
                        alt="product-img"
                      />
                    </TableCell>
                    <TableCell align="center">{item.product.title}</TableCell>
                    <TableCell align="center">{`${item.product.price} RON`}</TableCell>
                    <TableCell align="center">{item.quantity}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={2}>Total</TableCell>
                  <TableCell align="right">{total}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Box>
            <CustomerDetails
              control={control}
              errors={errors}
              trigger={trigger}
            />
          </Box>
        </form>
      </Stack>
      {loading ? <Spinner message="Loading shopping cart..." /> : null}
      <Button onClick={handleCheckout}>Checkout</Button>
    </>
  );
};

export default ShoppingCartPage;
