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
  Box,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useGlobal } from "../Context/globalData";

function SearchBox() {
  const { users } = useGlobal();

  const [search, setSearch] = useState(false);
  const [type, setType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [distance, setDistance] = useState("");
  const [justVerify, setJustVerify] = useState(false);
  const navigate = useNavigate();

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
        <Grid
          item
          container
          margin={0}
          paddingX={8}
          paddingY={0}
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={3} margin={0} padding={0}>
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
                {users.map((item, index) => (
                  <MenuItem key={index} value={item.type}>
                    <Typography fontWeight="bold">{item.type}</Typography>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3} margin={0} padding={0}>
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
          <Grid item xs={3} margin={0} padding={0}>
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
          <Grid
            item
            container
            xs={2}
            margin={0}
            padding={0}
            alignItems="center"
            justifyContent="center"
          >
            <Button
              fullWidth
              variant="outlined"
              onClick={() => {
                setSearch(true);
              }}
              startIcon={<SearchRoundedIcon />}
              sx={{
                fontSize: 16,
                borderRadius: "14px",
                color: "#02294F",
                border: "1px solid #02294F",
                "&:hover": {
                  border: "1px solid #02294F",
                },
              }}
            >
              Search
            </Button>
          </Grid>
        </Grid>
        {search &&
          users.map((item, index) => (
            <Grid key={index} item xs={12} margin={0} paddingX={8} paddingY={1}>
              <Grid
                onClick={() => {
                  navigate(
                    `/appointments?username=${encodeURIComponent(
                      item.username
                    )}&type=${encodeURIComponent(item.type)}`
                  );
                }}
                margin={0}
                padding={2}
                sx={{
                  alignItems: "center",
                  borderRadius: "16px",
                  transition: "transform 0.2s ease",
                  backgroundColor: "lavender",
                  "&:hover": {
                    transform: "scale(1.01)",
                    backgroundColor: "#2A386B",
                    color: "white",
                  },
                }}
              >
                <Typography fontWeight="bold">{item.username}</Typography>
                <Typography fontWeight="bold">{item.type}</Typography>
              </Grid>

            </Grid>
          ))}
      </Grid>
    </>
  );
}

export default SearchBox;
