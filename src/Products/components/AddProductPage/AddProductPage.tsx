import { Box, Button, Checkbox, TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import { useAddProduct } from "~/Products/containers";

const AddProductPage = () => {
  const {
    control,
    trigger,
    errors,
    register,
    handleAddProduct,
    handleSelectFile,
    preview,
  } = useAddProduct();

  return (
    <form onSubmit={handleAddProduct}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        {preview ? (
          <img style={{ width: "200px", height: "200px" }} src={preview} />
        ) : null}
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
          render={({ field }) => (
            <>
              <label>In stoc</label>
              <Checkbox
                onChange={(e: any) => field.onChange(e.target.checked)}
                checked={field.value}
              />
            </>
          )}
        />
        <Button variant="contained" component="label">
          Upload
          <input
            {...register("image")}
            // onChange={handleSelectFile}
            hidden
            name="image"
            accept="image/*"
            type="file"
          />
        </Button>

        <Button type="submit">Adauga produs</Button>
      </Box>
    </form>
  );
};

export default AddProductPage;
