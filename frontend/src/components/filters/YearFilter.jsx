import React from "react";
import { FormControl, InputLabel, Select, MenuItem, Grid } from "@mui/material";

const YearFilter = ({ years, setYears }) => {
  const yearOptions = [2019, 2020, 2021, 2022, 2023, 2024];

  const handleStartYearChange = (event) => {
    setYears((prev) => ({ ...prev, start: event.target.value }));
  };

  const handleEndYearChange = (event) => {
    setYears((prev) => ({ ...prev, end: event.target.value }));
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Start Year</InputLabel>
          <Select
            value={years.start}
            label="Start Year"
            onChange={handleStartYearChange}
          >
            {yearOptions.map((year) => (
              <MenuItem
                key={`start-${year}`}
                value={year}
                disabled={year > years.end}
              >
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>End Year</InputLabel>
          <Select
            value={years.end}
            label="End Year"
            onChange={handleEndYearChange}
          >
            {yearOptions.map((year) => (
              <MenuItem
                key={`end-${year}`}
                value={year}
                disabled={year < years.start}
              >
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default YearFilter;
