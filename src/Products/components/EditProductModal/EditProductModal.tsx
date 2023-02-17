import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Checkbox,
  TextField,
  DialogTitle,
  Stack,
  Box,
} from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import { useAddProduct } from "~/Products/containers";
import { ProductsDTO } from "~/Products/types/dtos";

type EditProductModalProps = {
  isModalOpen: boolean;
  handleEditProductModal: () => void;
  product: ProductsDTO;
};

const EditProductModal: React.FC<EditProductModalProps> = ({
  isModalOpen,
  handleEditProductModal,
  product,
}) => {
  const {
    control,
    trigger,
    errors,
    register,
    handleAddProduct,
    handleSelectFile,
    handleEditProduct,
    preview,
  } = useAddProduct(product);

  console.log(product, "PRODUCT");
  return (
    <div>
      <Dialog
        maxWidth="md"
        fullWidth
        open={isModalOpen}
        onClose={handleEditProductModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Editeaza produsul</DialogTitle>
        <form onSubmit={handleAddProduct}>
          <DialogContent>
            {preview ? (
              <img style={{ width: "200px", height: "200px" }} src={preview} />
            ) : null}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <Controller
                name="title"
                control={control}
                defaultValue=""
                render={({ field: { ref, onChange, ...field } }) => (
                  <TextField
                    label="Nume Produs"
                    variant="outlined"
                    error={Boolean(errors.title)}
                    helperText={errors.title?.message}
                    inputRef={ref}
                    onChange={(event) => {
                      if (errors.title) {
                        trigger("title");
                      }
                      onChange(event.target.value);
                    }}
                    {...field}
                  />
                )}
              />
              <Controller
                name="price"
                control={control}
                defaultValue=""
                render={({ field: { ref, onChange, ...field } }) => (
                  <TextField
                    label="Pret"
                    variant="outlined"
                    error={Boolean(errors.price)}
                    helperText={errors.price?.message}
                    inputRef={ref}
                    onChange={(event) => {
                      if (errors.price) {
                        trigger("price");
                      }
                      onChange(event.target.value);
                    }}
                    {...field}
                  />
                )}
              />
              <Controller
                name="inStock"
                control={control}
                render={({ field: { onChange, value, ...field } }) => {
                  console.log(value, "VALUE");
                  return (
                    <Stack direction="row" alignItems="center">
                      <label>In stoc</label>
                      <Checkbox
                        onChange={(e: any) => onChange(e.target.checked)}
                        checked={value}
                        {...field}
                      />
                    </Stack>
                  );
                }}
              />
              <Button variant="contained" component="label">
                Upload
                <input
                  {...register("image")}
                  hidden
                  name="image"
                  accept="image/*"
                  type="file"
                  onChange={(event) => {
                    handleSelectFile(event);
                    register("image").onChange(event);
                  }}
                />
              </Button>

              {/* <Button type="submit">Adauga produs</Button> */}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleEditProduct(product._id)}>
              Salveaza
            </Button>
            <Button onClick={handleEditProductModal}>Renunta</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default EditProductModal;
