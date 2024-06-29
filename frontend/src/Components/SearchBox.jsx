import React, { useState } from "react";
import {
  MenuItem,
  Button,
  TextField,
  Grid,
  InputLabel,
  FormControl,
  Select,
  Typography,
} from "@mui/material";

function SearchBox() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [distance, setDistance] = useState("");
  const [justVerify, setJustVerify] = useState(false);

  const handleChangeQuantity = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      if (value[0] !== "0" && value.length < 7) {
        setQuantity(value);
      }
    }
  };

  const handleChangeDistance = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      if (value[0] !== "0" && value.length < 7) {
        setDistance(value);
      }
    }
  };
  return (
    <>
      <Grid item container margin={0} padding={0}>
        <Grid item xs={4} margin={0} padding={0}>
          <FormControl size="small" fullWidth required margin="normal">
            <InputLabel id="type-label">Type</InputLabel>
            <Select
              margin="normal"
              labelId="type-label"
              id="type"
              required
              fullWidth
              label="Type"
              name="type"
              value={type}
              onChange={(e) => {
                setType(e.target.value);
              }}
              error={justVerify && type === ""}
              sx={{
                borderRadius: "12px",
                fontWeight: "bold",
              }}
            >
              <MenuItem value="">Select Role</MenuItem>
              <MenuItem value="type1">
                <Typography fontWeight="bold">type1</Typography>
              </MenuItem>
              <MenuItem value="type2" sx={{ fontWeight: "bold" }}>
                <Typography fontWeight="bold">type2</Typography>
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4} margin={0} padding={0}>
          <TextField
            id="quantity"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            size="small"
            label="Quantity"
            name="quantity"
            onChange={handleChangeQuantity}
            value={quantity}
            error={justVerify && quantity === ""}
            helperText={
              justVerify &&
              (quantity === "" ? "This field cannot be empty." : "")
            }
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                fontWeight: "bold",
              },
            }}
          />
        </Grid>
        <Grid item xs={4} margin={0} padding={0}>
          <TextField
            id="distance"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            size="small"
            label="Distance"
            name="distance"
            placeholder="KM"
            onChange={handleChangeDistance}
            value={distance}
            error={justVerify && distance === ""}
            helperText={
              justVerify &&
              (distance === "" ? "This field cannot be empty." : "")
            }
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                fontWeight: "bold",
              },
            }}
          />
        </Grid>
        <Grid item xs={8} margin={0} padding={0}>
          <TextField
            id="search"
            variant="outlined"
            margin="normal"
            fullWidth
            size="small"
            label="Search"
            name="search"
            value={search}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                fontWeight: "bold",
              },
            }}
          />
        </Grid>
        <Grid item container xs={4} margin={0} padding={0} alignItems="center">
          <Button variant="outlined" fullWidth>
            Search
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default SearchBox;
