/**
 * Application Constants
 * Contains all the constant values used across the application
 */

export const FINANCIAL_METRICS = [
  {
    id: "revenue",
    label: "Total Revenue",
    unit: "currency",
    chartType: "line",
    derived: false,
  },
  {
    id: "cost_of_sales",
    label: "Cost of Sales",
    unit: "currency",
    chartType: "bar",
    derived: false,
  },
  {
    id: "gross_profit_margin",
    label: "Gross Profit Margin",
    unit: "percentage",
    chartType: "line",
    derived: true,
  },
  {
    id: "eps",
    label: "Earnings Per Share",
    unit: "currency",
    chartType: "line",
    derived: true,
  },
  {
    id: "net_asset_per_share",
    label: "Net Asset Per Share",
    unit: "currency",
    chartType: "bar",
    derived: true,
  },
];

export const TIME_PERIODS = [
  { id: "annual", label: "Annual" },
  { id: "quarterly", label: "Quarterly" },
  { id: "monthly", label: "Monthly" },
];

export const BUSINESS_SEGMENTS = [
  { id: "transportation", label: "Transportation" },
  { id: "consumer_foods", label: "Consumer Foods" },
  { id: "retail", label: "Retail" },
  { id: "property", label: "Property" },
  { id: "financial_services", label: "Financial Services" },
  { id: "leisure", label: "Leisure" },
  { id: "it", label: "Information Technology" },
];

export const CURRENCIES = [
  { code: "LKR", name: "Sri Lankan Rupee", symbol: "Rs." },
  { code: "USD", name: "US Dollar", symbol: "$" },
];

export const CHART_COLORS = [
  "#4e79a7",
  "#f28e2b",
  "#e15759",
  "#76b7b2",
  "#59a14f",
  "#edc948",
  "#b07aa1",
  "#ff9da7",
  "#9c755f",
  "#bab0ac",
  "#1f77b4",
  "#ff7f0e",
];

export const INDUSTRY_BENCHMARKS = {
  gross_profit_margin: 32.5,
  net_profit_margin: 12.1,
  eps_growth: 8.7,
  revenue_growth: 10.4,
};

export const KEY_EVENTS = {
  2019: "Easter Sunday Attacks",
  2020: "COVID-19 Pandemic",
  2022: "Economic Crisis",
  2023: "IMF Bailout Package",
};

export const DEFAULT_YEAR_RANGE = {
  start: 2019,
  end: 2024,
};

export const EXPORT_OPTIONS = [
  { id: "csv", label: "CSV", icon: "📊" },
  { id: "pdf", label: "PDF", icon: "📄" },
  { id: "png", label: "PNG", icon: "🖼️" },
  { id: "json", label: "JSON", icon: "🔣" },
];
