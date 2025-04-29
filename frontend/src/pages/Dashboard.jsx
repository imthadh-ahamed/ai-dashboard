import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Container,
  Typography,
  Box,
  Button,
  Alert,
  Snackbar,
  Skeleton,
  Divider,
  Card,
  CardContent,
  IconButton,
  Tooltip,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import InfoIcon from "@mui/icons-material/Info";
import RevenueChart from "../components/charts/RevenueChart";
import ExpensesChart from "../components/charts/ExpensesChart";
import ProfitMarginChart from "../components/charts/ProfitMarginChart";
import EpsChart from "../components/charts/EpsChart";
import NetAssetChart from "../components/charts/NetAssetChart";
import InsightBox from "../components/insights/InsightBox";
import YearFilter from "../components/filters/YearFilter";
import MetricFilter from "../components/filters/MetricFilter";
import { fetchFinancialData } from "../services/api";

const Dashboard = () => {
  const [financialData, setFinancialData] = useState([]);
  const [years, setYears] = useState({ start: 2019, end: 2024 });
  const [selectedMetric, setSelectedMetric] = useState("revenue");
  const [insight, setInsight] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchFinancialData(years);
      setFinancialData(Array.isArray(data) ? data : []);
      setSnackbarOpen(true);
    } catch (err) {
      setError("Failed to load financial data. Please try again.");
      console.error("Error loading data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [years]);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  // Calculate summary metrics
  const getSummaryMetrics = () => {
    if (!Array.isArray(financialData) || financialData.length === 0) {
      return {
        revenue: 0,
        revenueChange: 0,
        profit: 0,
        profitChange: 0,
        profitMargin: 0,
        eps: 0,
        net_profit_margin: 0,
        gross_profit_margin: 0,
      };
    }

    const latestData = financialData[financialData.length - 1] || {};
    const previousData =
      financialData.length > 1 ? financialData[financialData.length - 2] : null;

    const revenueChange =
      previousData && previousData.revenue
        ? (((latestData.revenue || 0) - previousData.revenue) /
            previousData.revenue) *
          100
        : 0;

    const profitChange =
      previousData && previousData.profit
        ? (((latestData.profit || 0) - previousData.profit) /
            previousData.profit) *
          100
        : 0;

    return {
      revenue: latestData.revenue || 0,
      revenueChange,
      profit: latestData.profit || 0,
      profitChange,
      profitMargin: latestData.profitMargin || 0,
      eps: latestData.eps || 0,
      net_profit_margin: latestData.net_profit_margin || 0,
      gross_profit_margin: latestData.gross_profit_margin || 0,
    };
  };

  const summaryMetrics = getSummaryMetrics();

  const renderMetricCard = (
    title,
    value,
    change = null,
    format = "currency"
  ) => {
    const formattedValue =
      format === "currency"
        ? `$${value.toLocaleString()}`
        : `${value.toFixed(1)}%`;

    return (
      <Card elevation={2}>
        <CardContent>
          <Typography variant="subtitle2" color="text.secondary">
            {title}
          </Typography>
          <Typography variant="h5" component="div" sx={{ mt: 1 }}>
            {formattedValue}
          </Typography>
          {change !== null && (
            <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
              {change >= 0 ? (
                <TrendingUpIcon color="success" />
              ) : (
                <TrendingDownIcon color="error" />
              )}
              <Typography
                variant="body2"
                color={change >= 0 ? "success.main" : "error.main"}
                sx={{ ml: 1 }}
              >
                {change.toFixed(1)}%
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      {/* Page Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" component="h1" fontWeight="bold">
          Financial Dashboard
        </Typography>
        <Box>
          <Tooltip title="Refresh data">
            <IconButton
              color="primary"
              onClick={loadData}
              disabled={loading}
              sx={{ mr: 1 }}
            >
              <RefreshIcon />
            </IconButton>
          </Tooltip>
          <Button variant="contained" color="primary" startIcon={<InfoIcon />}>
            Help
          </Button>
        </Box>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Summary Cards */}
      {!loading && (
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={3}>
            {renderMetricCard(
              "Revenue",
              summaryMetrics.revenue,
              summaryMetrics.revenueChange,
              "currency"
            )}
          </Grid>
          <Grid item xs={12} md={3}>
            {renderMetricCard(
              "Profit",
              summaryMetrics.profit,
              summaryMetrics.profitChange,
              "currency"
            )}
          </Grid>
          <Grid item xs={12} md={3}>
            {renderMetricCard(
              "Profit Margin",
              summaryMetrics.profitMargin,
              null,
              "percentage"
            )}
          </Grid>
          <Grid item xs={12} md={3}>
            {renderMetricCard("EPS", summaryMetrics.eps, null, "currency")}
          </Grid>
        </Grid>
      )}

      {/* Filters Section */}
      <Paper
        elevation={2}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 2,
          backgroundColor: "background.paper",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Filters
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <YearFilter years={years} setYears={setYears} />
          </Grid>
          <Grid item xs={12} md={6}>
            <MetricFilter
              selectedMetric={selectedMetric}
              setSelectedMetric={setSelectedMetric}
              setInsight={setInsight}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Insight Box */}
      {insight && (
        <Box sx={{ mb: 3 }}>
          <InsightBox insight={insight} />
        </Box>
      )}

      {/* Charts Section */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Financial Analysis
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={3}>
        {/* Revenue Chart */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              height: "100%",
              borderRadius: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              Revenue Trend
            </Typography>
            {loading ? (
              <Skeleton variant="rectangular" height={300} />
            ) : (
              <Box sx={{ flexGrow: 1 }}>
                <RevenueChart data={financialData} />
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Expenses Chart */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              height: "100%",
              borderRadius: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              Expenses Breakdown
            </Typography>
            {loading ? (
              <Skeleton variant="rectangular" height={300} />
            ) : (
              <Box sx={{ flexGrow: 1 }}>
                <ExpensesChart data={financialData} />
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Profit Margin Chart */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              height: "100%",
              borderRadius: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              Profit Margin Analysis
            </Typography>
            {loading ? (
              <Skeleton variant="rectangular" height={300} />
            ) : (
              <Box sx={{ flexGrow: 1 }}>
                <ProfitMarginChart data={financialData} />
              </Box>
            )}
          </Paper>
        </Grid>

        {/* EPS Chart */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              height: "100%",
              borderRadius: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              Earnings Per Share
            </Typography>
            {loading ? (
              <Skeleton variant="rectangular" height={300} />
            ) : (
              <Box sx={{ flexGrow: 1 }}>
                <EpsChart data={financialData} />
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Net Asset Chart */}
        <Grid item xs={12}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              borderRadius: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              Net Asset Value
            </Typography>
            {loading ? (
              <Skeleton variant="rectangular" height={300} />
            ) : (
              <Box sx={{ flexGrow: 1 }}>
                <NetAssetChart data={financialData} />
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          Data refreshed successfully
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Dashboard;
