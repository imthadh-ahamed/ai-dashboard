import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Tabs,
  Tab,
} from "@mui/material";
import {
  Timeline as TimelineIcon,
  ShowChart as TrendIcon,
  Compare as CompareIcon,
  TableChart as TableIcon,
} from "@mui/icons-material";
import RevenueChart from "../components/charts/RevenueChart";
import ExpensesChart from "../components/charts/ExpensesChart";
import ProfitMarginChart from "../components/charts/ProfitMarginChart";
import EpsChart from "../components/charts/EpsChart";
import NetAssetChart from "../components/charts/NetAssetChart";
import YearFilter from "../components/filters/YearFilter";
import MetricFilter from "../components/filters/MetricFilter";
import InsightBox from "../components/insights/InsightBox";
import { fetchFinancialData } from "../services/api";
import DataTable from "../components/ui/DataTable";

const Analysis = () => {
  const [financialData, setFinancialData] = useState([]);
  const [years, setYears] = useState({ start: 2019, end: 2024 });
  const [selectedMetric, setSelectedMetric] = useState("revenue");
  const [insight, setInsight] = useState("");
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchFinancialData(years);
      setFinancialData(data);
    };
    loadData();
  }, [years]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Financial Analysis
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="analysis tabs"
        >
          <Tab
            icon={<TrendIcon />}
            iconPosition="start"
            label="Trend Analysis"
          />
          <Tab
            icon={<CompareIcon />}
            iconPosition="start"
            label="Comparative View"
          />
          <Tab icon={<TableIcon />} iconPosition="start" label="Raw Data" />
        </Tabs>
      </Box>

      {/* Filters */}
      <Grid container spacing={3} sx={{ mb: 2 }}>
        <Grid item xs={12} md={4}>
          <YearFilter years={years} setYears={setYears} />
        </Grid>
        <Grid item xs={12} md={4}>
          <MetricFilter
            selectedMetric={selectedMetric}
            setSelectedMetric={setSelectedMetric}
            setInsight={setInsight}
          />
        </Grid>
      </Grid>

      {/* Insight Box */}
      {insight && (
        <Grid item xs={12} sx={{ mb: 3 }}>
          <InsightBox insight={insight} />
        </Grid>
      )}

      {/* Tab Content */}
      {tabValue === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <RevenueChart data={financialData} />
          </Grid>
          <Grid item xs={12} md={6}>
            <ExpensesChart data={financialData} />
          </Grid>
          <Grid item xs={12} md={6}>
            <ProfitMarginChart data={financialData} />
          </Grid>
          <Grid item xs={12} md={6}>
            <EpsChart data={financialData} />
          </Grid>
          <Grid item xs={12}>
            <NetAssetChart data={financialData} />
          </Grid>
        </Grid>
      )}

      {tabValue === 1 && (
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Comparative Analysis
          </Typography>
          <Typography color="textSecondary">
            Compare different metrics side by side (implementation would go
            here)
          </Typography>
          {/* Implementation for comparative charts would go here */}
        </Paper>
      )}

      {tabValue === 2 && (
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
            Raw Financial Data
          </Typography>
          <DataTable data={financialData} />
        </Paper>
      )}
    </Container>
  );
};

export default Analysis;
