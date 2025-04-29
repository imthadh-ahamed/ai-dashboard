from typing import List, Dict, Any
import numpy as np
from sklearn.linear_model import LinearRegression
from app.services.data_processor import get_financial_data_range, SAMPLE_DATA


def generate_forecast(metric: str, years: int) -> List[Dict[str, Any]]:
    """
    Generate forecast data for a given metric.

    Args:
        metric (str): The metric to forecast (revenue, profit, etc.)
        years (int): Number of years to forecast

    Returns:
        list: Forecast data for the specified metric
    """
    # Get historical data
    historical_data = get_financial_data_range(2019, 2024)
    if not historical_data:
        return []

    # Prepare data for forecasting
    X = np.array(range(len(historical_data))).reshape(-1, 1)
    y = np.array([data[metric] for data in historical_data])

    # Fit linear regression model
    model = LinearRegression()
    model.fit(X, y)

    # Generate forecast
    forecast_data = []
    last_year = max(data["year"] for data in historical_data)

    for i in range(1, years + 1):
        year = last_year + i
        predicted_value = model.predict([[len(historical_data) + i - 1]])[0]

        # Add some randomness to make it more realistic
        noise = np.random.normal(0, predicted_value * 0.05)  # 5% standard deviation
        predicted_value += noise

        forecast_data.append(
            {
                "year": year,
                "value": round(float(predicted_value), 2),
                "is_forecast": True,
            }
        )

    return forecast_data


def analyze_trend(values: List[float]) -> str:
    """Analyze the trend of a metric."""
    if len(values) < 2:
        return "insufficient data"

    changes = np.diff(values)
    if all(change > 0 for change in changes):
        return "consistently increasing"
    elif all(change < 0 for change in changes):
        return "consistently decreasing"
    elif np.mean(changes) > 0:
        return "generally increasing"
    elif np.mean(changes) < 0:
        return "generally decreasing"
    else:
        return "stable"


def calculate_cagr(start_value: float, end_value: float, years: int) -> float:
    """Calculate Compound Annual Growth Rate."""
    return (pow(end_value / start_value, 1 / years) - 1) * 100


def generate_insight(metric: str) -> str:
    """
    Generate comprehensive insights about a specific metric.

    Args:
        metric (str): The metric to generate insight for

    Returns:
        str: Generated insight
    """
    # Get historical data
    historical_data = get_financial_data_range(2019, 2024)
    if not historical_data:
        return "No data available for analysis."

    values = [data[metric] for data in historical_data]
    years = [data["year"] for data in historical_data]

    # Basic statistics
    mean_value = np.mean(values)
    std_value = np.std(values)
    latest_value = values[-1]
    previous_value = values[-2]
    percent_change = ((latest_value - previous_value) / previous_value) * 100
    trend = analyze_trend(values)
    cagr = calculate_cagr(values[0], values[-1], len(values) - 1)

    insights = []

    # Core metrics insights
    if metric == "revenue":
        insights.extend(
            [
                f"Revenue has shown a {trend} trend over the past {len(values)} years.",
                f"Year-over-year growth is {percent_change:.1f}%.",
                f"The compound annual growth rate (CAGR) is {cagr:.1f}%.",
                f"Average revenue is {mean_value:,.0f} with a standard deviation of {std_value:,.0f}.",
                "This indicates "
                + (
                    "strong market performance"
                    if percent_change > 10
                    else (
                        "stable market presence"
                        if percent_change > 0
                        else "challenging market conditions"
                    )
                )
                + ".",
            ]
        )

    elif metric == "net_profit":
        insights.extend(
            [
                f"Net profit has shown a {trend} trend over the analyzed period.",
                f"Year-over-year change is {percent_change:.1f}%.",
                f"The compound annual growth rate (CAGR) is {cagr:.1f}%.",
                f"Average net profit is {mean_value:,.0f}.",
                "This suggests "
                + (
                    "improving operational efficiency"
                    if percent_change > 10
                    else (
                        "stable operations"
                        if percent_change > 0
                        else "pressure on profitability"
                    )
                )
                + ".",
            ]
        )

    elif "margin" in metric:
        insights.extend(
            [
                f"The {metric.replace('_', ' ')} has been {trend}.",
                f"Current margin is {latest_value:.1f}%, compared to {previous_value:.1f}% in the previous year.",
                f"Average margin is {mean_value:.1f}% with a standard deviation of {std_value:.1f}%.",
                "This indicates "
                + ("improving efficiency" if percent_change > 0 else "cost pressure")
                + ".",
            ]
        )

    elif metric == "eps":
        insights.extend(
            [
                f"Earnings per share (EPS) shows a {trend} trend.",
                f"Year-over-year growth is {percent_change:.1f}%.",
                f"CAGR of {cagr:.1f}% over the period.",
                f"Current EPS is {latest_value:.2f}, with a historical average of {mean_value:.2f}.",
                "This suggests "
                + (
                    "strong shareholder value creation"
                    if percent_change > 10
                    else (
                        "stable performance"
                        if percent_change > 0
                        else "challenges in profitability"
                    )
                )
                + ".",
            ]
        )

    elif "ratio" in metric:
        insights.extend(
            [
                f"The {metric.replace('_', ' ')} is currently at {latest_value:.2f}.",
                f"This represents a {abs(percent_change):.1f}% {'increase' if percent_change > 0 else 'decrease'} from the previous period.",
                f"The historical average is {mean_value:.2f}.",
                "This indicates "
                + ("strong" if latest_value > mean_value else "weakening")
                + f" {metric.replace('_', ' ')}.",
            ]
        )

    elif "cash_flow" in metric:
        insights.extend(
            [
                f"The {metric.replace('_', ' ')} shows a {trend} pattern.",
                f"Current value is {latest_value:,.0f}, a {percent_change:.1f}% change from previous year.",
                f"Average {metric.replace('_', ' ')} is {mean_value:,.0f}.",
                "This suggests "
                + ("improving" if percent_change > 0 else "deteriorating")
                + " cash management.",
            ]
        )

    else:
        insights.extend(
            [
                f"The {metric.replace('_', ' ')} shows a {trend} trend.",
                f"Current value is {latest_value:,.2f}, representing a {percent_change:.1f}% change.",
                f"Historical average is {mean_value:.2f} with a standard deviation of {std_value:.2f}.",
                f"The metric has grown at a CAGR of {cagr:.1f}% over the period.",
            ]
        )

    return " ".join(insights)
