from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Dict, Any, Optional

router = APIRouter()


class ForecastRequest(BaseModel):
    metric: str
    years: int


class InsightRequest(BaseModel):
    metric: str


# Sample forecast data
def generate_forecast_data(metric: str, years: int) -> List[Dict[str, Any]]:
    """
    Generate sample forecast data for a given metric and number of years.

    Args:
        metric (str): The metric to forecast (revenue, profit, etc.)
        years (int): The number of years to forecast

    Returns:
        list: Forecast data for the specified metric and years
    """
    # Base values for different metrics
    base_values = {
        "revenue": 2500000,
        "profit": 800000,
        "profitMargin": 32.0,
        "eps": 8.0,
        "netAssets": 7500000,
    }

    # Growth rates for different metrics
    growth_rates = {
        "revenue": 0.15,
        "profit": 0.12,
        "profitMargin": 0.02,
        "eps": 0.12,
        "netAssets": 0.08,
    }

    # Generate forecast data
    forecast_data = []
    base_value = base_values.get(metric, 1000000)
    growth_rate = growth_rates.get(metric, 0.1)

    for i in range(1, years + 1):
        year = 2024 + i
        value = base_value * (1 + growth_rate) ** i

        # Format the value based on the metric
        if metric in ["revenue", "profit", "netAssets"]:
            formatted_value = round(value, 2)
        elif metric == "profitMargin":
            formatted_value = round(value, 1)
        else:
            formatted_value = round(value, 2)

        forecast_data.append({"year": year, "value": formatted_value})

    return forecast_data


# Sample insights
INSIGHTS = {
    "revenue": "Revenue has shown consistent growth over the past 5 years, with an average annual growth rate of 20%. This indicates strong market demand and effective business strategies.",
    "profit": "Profit margins have improved significantly, showing a 12% increase from 2019 to 2024. This suggests improved operational efficiency and cost management.",
    "profitMargin": "The profit margin has stabilized around 32% in recent years, indicating a healthy balance between revenue growth and cost control.",
    "eps": "Earnings per share have doubled from 2019 to 2024, reflecting strong profitability and effective capital allocation.",
    "netAssets": "Net assets have grown steadily, showing a 50% increase over the 5-year period. This indicates strong financial health and investment in long-term growth.",
}


@router.post("/forecast")
async def generate_forecast(request: ForecastRequest):
    """
    Generate a forecast for a specific metric.

    Args:
        request (ForecastRequest): The forecast request containing the metric and number of years

    Returns:
        dict: Forecast data for the specified metric
    """
    forecast_data = generate_forecast_data(request.metric, request.years)
    return {"forecast": forecast_data}


@router.post("/insights")
async def generate_insight(request: InsightRequest):
    """
    Generate an insight for a specific metric.

    Args:
        request (InsightRequest): The insight request containing the metric

    Returns:
        dict: Insight for the specified metric
    """
    insight = INSIGHTS.get(
        request.metric, "No specific insight available for this metric."
    )
    return {"insight": insight}
