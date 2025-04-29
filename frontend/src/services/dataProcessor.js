/**
 * Financial Data Processing Utilities
 * Contains functions to transform and process raw financial data
 */

// Helper function to format currency values
const formatCurrency = (
  value,
  currency = "LKR",
  exchangeRates = { LKR: 1, USD: 300 }
) => {
  if (!value) return "N/A";
  const convertedValue = value / exchangeRates[currency];

  return new Intl.NumberFormat(currency === "LKR" ? "en-LK" : "en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(convertedValue);
};

// Calculate financial ratios and derived metrics
const calculateDerivedMetrics = (data) => {
  return data.map((item) => {
    const revenue = item.revenue || 0;
    const costOfSales = item.cost_of_sales || 0;
    const operatingExpenses = item.operating_expenses || 0;
    const netProfit = item.net_profit || 0;
    const sharesOutstanding = item.shares_outstanding || 1;

    return {
      ...item,
      gross_profit: revenue - costOfSales,
      gross_profit_margin: revenue
        ? ((revenue - costOfSales) / revenue) * 100
        : 0,
      operating_profit: revenue - costOfSales - operatingExpenses,
      operating_margin: revenue
        ? ((revenue - costOfSales - operatingExpenses) / revenue) * 100
        : 0,
      net_profit_margin: revenue ? (netProfit / revenue) * 100 : 0,
      eps: netProfit / sharesOutstanding,
      // Add more derived metrics as needed
    };
  });
};

// Process raw data from API to consistent format
const processFinancialData = (rawData) => {
  if (!Array.isArray(rawData)) return [];

  return rawData.map((item) => ({
    year: item.year || item.fiscal_year,
    revenue: item.revenue || item.total_revenue || 0,
    cost_of_sales: item.cost_of_sales || item.cogs || 0,
    operating_expenses: item.operating_expenses || item.opex || 0,
    net_profit: item.net_profit || item.profit_after_tax || 0,
    shares_outstanding: item.shares_outstanding || item.total_shares || 0,
    total_assets: item.total_assets || 0,
    total_liabilities: item.total_liabilities || 0,
    // Add more fields as needed from the raw data
  }));
};

// Process shareholders data
const processShareholdersData = (rawData) => {
  if (!Array.isArray(rawData)) return [];

  return rawData
    .map((item) => ({
      name: item.shareholder_name || item.name,
      percentage: parseFloat(item.percentage_holding || item.percentage),
      shares_held: parseInt(item.shares_held || 0),
      type: item.shareholder_type || item.type || "Individual",
      // Add more fields as needed
    }))
    .sort((a, b) => b.percentage - a.percentage);
};

// Generate dataset for comparative charts
const prepareComparativeData = (data, metrics) => {
  return {
    labels: data.map((item) => item.year),
    datasets: metrics.map((metric, index) => ({
      label: metric.label,
      data: data.map((item) => item[metric.key]),
      backgroundColor: `hsl(${(index * 360) / metrics.length}, 70%, 50%)`,
      borderColor: `hsl(${(index * 360) / metrics.length}, 70%, 30%)`,
      borderWidth: 1,
    })),
  };
};

// Filter data by year range
const filterByYearRange = (data, startYear, endYear) => {
  return data.filter((item) => item.year >= startYear && item.year <= endYear);
};

// Calculate YoY growth rates
const calculateGrowthRates = (data) => {
  return data.map((item, index) => {
    const prevItem = data[index - 1];
    const growthRates = {};

    if (prevItem) {
      Object.keys(item).forEach((key) => {
        if (
          typeof item[key] === "number" &&
          typeof prevItem[key] === "number" &&
          prevItem[key] !== 0
        ) {
          growthRates[`${key}_growth`] =
            ((item[key] - prevItem[key]) / prevItem[key]) * 100;
        }
      });
    }

    return { ...item, ...growthRates };
  });
};

// Group data by sector/segment
const groupBySegment = (data) => {
  const segments = {};

  data.forEach((item) => {
    if (item.segment) {
      if (!segments[item.segment]) {
        segments[item.segment] = [];
      }
      segments[item.segment].push(item);
    }
  });

  return segments;
};

// Generate data for time series forecasting
const prepareForecastData = (data, metric) => {
  return data
    .filter((item) => item[metric] !== undefined)
    .map((item, index) => ({
      x: index,
      y: item[metric],
      year: item.year,
    }));
};

export {
  formatCurrency,
  calculateDerivedMetrics,
  processFinancialData,
  processShareholdersData,
  prepareComparativeData,
  filterByYearRange,
  calculateGrowthRates,
  groupBySegment,
  prepareForecastData,
};
