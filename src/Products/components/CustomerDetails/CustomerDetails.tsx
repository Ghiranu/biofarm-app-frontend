import { Box, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

const CustomerDetails = (props: any) => {
  const { control, errors, trigger } = props;
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      <Controller
        name="street"
        control={control}
        defaultValue=""
        render={({ field: { ref, onChange, ...field } }) => (
          <TextField
            label="Strada"
            variant="outlined"
            error={Boolean(errors.street)}
            helperText={errors.street?.message}
            inputRef={ref}
            onChange={(event) => {
              if (errors.street) {
                trigger("street");
              }
              onChange(event.target.value);
            }}
            {...field}
          />
        )}
      />
      <Controller
        name="apartment"
        control={control}
        defaultValue=""
        render={({ field: { ref, onChange, ...field } }) => (
          <TextField
            label="Apartament"
            variant="outlined"
            error={Boolean(errors.apartment)}
            helperText={errors.apartment?.message}
            inputRef={ref}
            onChange={(event) => {
              if (errors.apartment) {
                trigger("apartment");
              }
              onChange(event.target.value);
            }}
            {...field}
          />
        )}
      />
      <Controller
        name="county"
        control={control}
        defaultValue=""
        render={({ field: { ref, onChange, ...field } }) => (
          <TextField
            label="Judet"
            variant="outlined"
            error={Boolean(errors.county)}
            helperText={errors.county?.message}
            inputRef={ref}
            onChange={(event) => {
              if (errors.county) {
                trigger("county");
              }
              onChange(event.target.value);
            }}
            {...field}
          />
        )}
      />
      <Controller
        name="city"
        control={control}
        defaultValue=""
        render={({ field: { ref, onChange, ...field } }) => (
          <TextField
            label="Localitate"
            variant="outlined"
            error={Boolean(errors.city)}
            helperText={errors.city?.message}
            inputRef={ref}
            onChange={(event) => {
              if (errors.city) {
                trigger("city");
              }
              onChange(event.target.value);
            }}
            {...field}
          />
        )}
      />
      <Controller
        name="phone"
        control={control}
        defaultValue=""
        render={({ field: { ref, onChange, ...field } }) => (
          <TextField
            label="Numar de telefon"
            variant="outlined"
            error={Boolean(errors.phone)}
            helperText={errors.phone?.message}
            inputRef={ref}
            onChange={(event) => {
              if (errors.phone) {
                trigger("phone");
              }
              onChange(event.target.value);
            }}
            {...field}
          />
        )}
      />
    </Box>
  );
};

export default CustomerDetails;
