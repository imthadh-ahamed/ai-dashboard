import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Button,
} from "@mui/material";
import { generateInsight } from "../../services/api";

const MetricFilter = ({ selectedMetric, setSelectedMetric, setInsight }) => {
  const metrics = [
    { value: "revenue", label: "Total Revenue" },
    { value: "cost_of_sales", label: "Cost of Sales" },
    { value: "operating_expenses", label: "Operating Expenses" },
    { value: "gross_profit_margin", label: "Gross Profit Margin" },
    { value: "eps", label: "Earnings Per Share (EPS)" },
    { value: "net_asset_per_share", label: "Net Asset Per Share" },
  ];

  const handleMetricChange = (event) => {
    setSelectedMetric(event.target.value);
  };

  const handleGenerateInsight = async () => {
    try {
      const insight = await generateInsight(selectedMetric);
      setInsight(insight);
    } catch (error) {
      console.error("Error generating insight:", error);
      setInsight("Failed to generate insight. Please try again.");
    }
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={8}>
        <FormControl fullWidth>
          <InputLabel>Select Metric</InputLabel>
          <Select
            value={selectedMetric}
            label="Select Metric"
            onChange={handleMetricChange}
          >
            {metrics.map((metric) => (
              <MenuItem key={metric.value} value={metric.value}>
                {metric.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={4}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGenerateInsight}
          fullWidth
          sx={{ height: "56px" }}
        >
          Get Insight
        </Button>
      </Grid>
    </Grid>
  );
};

export default MetricFilter;
