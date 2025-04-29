import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Typography,
} from "@mui/material";
import { CurrencyExchange as CurrencyExchangeIcon } from "@mui/icons-material";

const CurrencyFilter = ({ currency, setCurrency }) => {
  const currencies = [
    { code: "LKR", name: "Sri Lankan Rupee" },
    { code: "USD", name: "US Dollar" },
    // Add more currencies as needed
  ];

  // Exchange rates - in a real app, these would come from an API
  const exchangeRates = {
    LKR: 1,
    USD: 300, // Example rate: 1 USD = 300 LKR
  };

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <CurrencyExchangeIcon color="primary" />
      </Grid>
      <Grid item xs>
        <FormControl fullWidth>
          <InputLabel>Currency</InputLabel>
          <Select
            value={currency}
            label="Currency"
            onChange={handleCurrencyChange}
          >
            {currencies.map((curr) => (
              <MenuItem key={curr.code} value={curr.code}>
                {curr.name} ({curr.code})
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      {currency !== "LKR" && (
        <Grid item xs={12}>
          <Typography variant="caption" color="textSecondary">
            Note: Converted from LKR at rate: 1 {currency} ={" "}
            {exchangeRates[currency]} LKR
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default CurrencyFilter;
