import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

export const fetchFinancialData = async (years) => {
  try {
    // Get data for all years in the range
    const data = [];
    for (let year = years.start; year <= years.end; year++) {
      const response = await axios.get(`${API_BASE_URL}/financial/${year}`);
      data.push(response.data);
    }
    return data;
  } catch (error) {
    console.error("Error fetching financial data:", error);
    throw error;
  }
};

export const generateForecast = async (metric, years) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/ai/forecast`, {
      metric,
      years,
    });
    return response.data;
  } catch (error) {
    console.error("Error generating forecast:", error);
    throw error;
  }
};

export const generateInsight = async (metric) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/ai/insights`, {
      metric,
    });
    return response.data.insight;
  } catch (error) {
    console.error("Error generating insight:", error);
    throw error;
  }
};

export const fetchShareholdersData = async (year) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/shareholders`, {
      params: { year },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching shareholders data:", error);
    throw error;
  }
};
