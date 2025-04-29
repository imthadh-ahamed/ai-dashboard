/**
 * Application Helper Functions
 * Reusable utility functions for the application
 */

import { CURRENCIES, CHART_COLORS, KEY_EVENTS } from "./constants";

/**
 * Formats a number as currency
 * @param {number} value - The value to format
 * @param {string} currency - Currency code (e.g., 'LKR', 'USD')
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (value, currency = "LKR", decimals = 2) => {
  if (isNaN(value)) return "N/A";

  const currencyObj =
    CURRENCIES.find((c) => c.code === currency) || CURRENCIES[0];
  const formatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    currencyDisplay: "symbol",
  });

  return formatter.format(value).replace(/\D00$/, ""); // Remove .00 if decimals are zero
};

/**
 * Formats a number as percentage
 * @param {number} value - The value to format
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted percentage string
 */
export const formatPercentage = (value, decimals = 2) => {
  if (isNaN(value)) return "N/A";
  return value.toFixed(decimals) + "%";
};

/**
 * Generates a color from CHART_COLORS array based on index
 * @param {number} index - The index of the color
 * @returns {string} Hex color code
 */
export const getChartColor = (index) => {
  return CHART_COLORS[index % CHART_COLORS.length];
};

/**
 * Adds event annotations to chart data
 * @param {Array} data - The chart data
 * @returns {Array} Data with event annotations
 */
export const addEventAnnotations = (data) => {
  return data.map((item) => {
    const event = KEY_EVENTS[item.year];
    return {
      ...item,
      annotation: event || null,
    };
  });
};

/**
 * Converts currency based on exchange rates
 * @param {number} amount - The amount to convert
 * @param {string} fromCurrency - Source currency code
 * @param {string} toCurrency - Target currency code
 * @param {object} rates - Exchange rates { LKR: 1, USD: 300 }
 * @returns {number} Converted amount
 */
export const convertCurrency = (amount, fromCurrency, toCurrency, rates) => {
  if (!rates || !rates[fromCurrency] || !rates[toCurrency]) return amount;
  return (amount / rates[fromCurrency]) * rates[toCurrency];
};

/**
 * Generates a unique ID
 * @returns {string} Unique ID
 */
export const generateId = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

/**
 * Debounces a function
 * @param {Function} func - The function to debounce
 * @param {number} wait - Debounce wait time in ms
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait = 300) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

/**
 * Capitalizes the first letter of a string
 * @param {string} str - The input string
 * @returns {string} Capitalized string
 */
export const capitalize = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Formats a number with commas
 * @param {number} num - The number to format
 * @returns {string} Formatted number
 */
export const formatNumber = (num) => {
  if (isNaN(num)) return "0";
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

/**
 * Truncates text with ellipsis
 * @param {string} text - The text to truncate
 * @param {number} maxLength - Maximum length before truncation
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 50) => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

/**
 * Checks if value is empty
 * @param {*} value - The value to check
 * @returns {boolean} True if empty
 */
export const isEmpty = (value) => {
  if (value === null || value === undefined) return true;
  if (typeof value === "string" && value.trim() === "") return true;
  if (Array.isArray(value) && value.length === 0) return true;
  if (typeof value === "object" && Object.keys(value).length === 0) return true;
  return false;
};

/**
 * Gets the quarter from a month number
 * @param {number} month - Month number (1-12)
 * @returns {string} Quarter (Q1-Q4)
 */
export const getQuarterFromMonth = (month) => {
  if (!month || isNaN(month)) return "";
  return `Q${Math.floor((month - 1) / 3) + 1}`;
};
