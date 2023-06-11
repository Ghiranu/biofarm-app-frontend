import {
  Box,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

const CustomerDetails = (props: any) => {
  const { control, errors, trigger } = props;
  const location = useLocation();

  const isSubscriptionPath = location.pathname === "/subscriptions";
  return (
    <Box
      sx={{
        gap: "10px",
        gridArea: "1 / 1 / 3 / 4",
        gridTemplateColumns: "repeat(auto-fill, 300px)",
        display: "grid",
        border: "2px solid #f7f7f7",
        borderRadius: "10px",
        padding: "15px",
        boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
      }}
    >
      <Stack direction="column" gap="10px">
        <Typography>Strada si numar strada</Typography>
        <Controller
          name="street"
          control={control}
          defaultValue=""
          render={({ field: { ref, onChange, ...field } }) => (
            <TextField
              size="small"
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
      </Stack>
      <Stack direction="column" gap="10px">
        <Typography>Apartament</Typography>
        <Controller
          name="apartment"
          control={control}
          defaultValue=""
          render={({ field: { ref, onChange, ...field } }) => (
            <TextField
              size="small"
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
      </Stack>
      <Stack direction="column" gap="10px">
        <Typography>Judet</Typography>
        <Controller
          name="county"
          control={control}
          defaultValue=""
          render={({ field: { ref, onChange, ...field } }) => (
            <TextField
              size="small"
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
      </Stack>
      <Stack direction="column" gap="10px">
        <Typography>Localitate</Typography>
        <Controller
          name="city"
          control={control}
          defaultValue=""
          render={({ field: { ref, onChange, ...field } }) => (
            <TextField
              size="small"
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
      </Stack>
      <Stack direction="column" gap="10px">
        <Typography>Numar de telefon</Typography>
        <Controller
          name="phone"
          control={control}
          defaultValue=""
          render={({ field: { ref, onChange, ...field } }) => (
            <TextField
              size="small"
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
      </Stack>
      {isSubscriptionPath ? (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack direction="column" gap="10px">
            <Typography>Data incepere</Typography>
            <Controller
              name="startDate"
              control={control}
              render={({ field: { onChange, ...field } }) => (
                <DesktopDatePicker
                  inputFormat="DD/MM/YYYY"
                  onChange={onChange}
                  renderInput={(params) => (
                    <TextField size="small" {...params} />
                  )}
                  {...field}
                />
              )}
            />
            {errors.startDate ? (
              <Typography color="error">{errors.startDate.message}</Typography>
            ) : null}
          </Stack>
          <Stack direction="column" gap="10px">
            <Typography>Data incheiere</Typography>
            <Controller
              name="endDate"
              control={control}
              defaultValue=""
              render={({ field: { ref, onChange, ...field } }) => (
                <DesktopDatePicker
                  inputFormat="DD/MM/YYYY"
                  onChange={onChange}
                  renderInput={(params) => (
                    <TextField size="small" {...params} />
                  )}
                  {...field}
                />
              )}
            />
            {errors.endDate ? (
              <Typography color="error">{errors.endDate.message}</Typography>
            ) : null}
          </Stack>
          <Stack direction="column" gap="10px">
            <Typography>Recurenta livrare produse</Typography>
            <Controller
              name="recurrence"
              control={control}
              defaultValue=""
              render={({ field: { ref, onChange, ...field } }) => (
                <Select
                  size="small"
                  labelId="simple-select-label"
                  id="simple-select"
                  onChange={onChange}
                  {...field}
                >
                  <MenuItem value="1 saptamana">1 saptamana</MenuItem>
                  <MenuItem value="2 saptamani">2 saptamani</MenuItem>
                  <MenuItem value="3 saptamani">3 saptamani</MenuItem>
                  <MenuItem value="4 saptamani">4 saptamani</MenuItem>
                </Select>
              )}
            />
            {errors.recurrence ? (
              <Typography color="error">{errors.recurrence.message}</Typography>
            ) : null}
          </Stack>
        </LocalizationProvider>
      ) : null}
    </Box>
  );
};

export default CustomerDetails;
