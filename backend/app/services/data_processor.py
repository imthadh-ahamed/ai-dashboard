import json
import os
from pathlib import Path
from typing import List, Dict, Any, Optional

# Sample data for demonstration
SAMPLE_DATA = {
    2019: [
        {"quarter": "Q1", "revenue": 200000, ...},
        {"quarter": "Q2", "revenue": 250000, ...},
        {"quarter": "Q3", "revenue": 300000, ...},
        {"quarter": "Q4", "revenue": 250000, ...},
    ],
    2020: [
        {"quarter": "Q1", "revenue": 300000, ...},
        # etc.
    ],
    # ...
}

# Add data for years 2021-2024 with progressive growth
for year in range(2021, 2025):
    prev_year = year - 1
    prev_data = SAMPLE_DATA[prev_year]

    # Calculate new data with growth
    new_data = []
    for quarter_data in prev_data:
        new_quarter_data = {}
        for key, value in quarter_data.items():
            if isinstance(value, (int, float)) and value is not None:
                if "ratio" in key or "margin" in key or "yield" in key:
                    # Small increase for ratios and margins
                    new_quarter_data[key] = value * (1 + 0.05)
                elif "growth" in key:
                    # Maintain similar growth rates
                    new_quarter_data[key] = value * 0.9
                else:
                    # General growth for other metrics
                    new_quarter_data[key] = value * (1 + 0.15)
        new_data.append(new_quarter_data)

    SAMPLE_DATA[year] = new_data


def get_financial_data(year: Optional[int] = None) -> Dict[str, Any]:
    """
    Get financial data for a specific year.

    Args:
        year (int, optional): The year to get data for.

    Returns:
        dict: Financial data for the specified year.
    """
    if year is not None:
        if year in SAMPLE_DATA:
            return SAMPLE_DATA[year]
        return {}
    return {}


def get_financial_data_range(start_year: int, end_year: int) -> List[Dict[str, Any]]:
    """
    Get financial data for a range of years.

    Args:
        start_year (int): The start year of the range.
        end_year (int): The end year of the range.

    Returns:
        list: List of financial data for the specified year range.
    """
    result = []
    for year in range(start_year, end_year + 1):
        if year in SAMPLE_DATA:
            result.extend(SAMPLE_DATA[year])
    return result


def calculate_derived_metrics(data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Calculate derived financial metrics.

    Args:
        data (dict): Raw financial data.

    Returns:
        dict: Financial data with derived metrics.
    """
    if not data:
        return {}

    # Calculate gross profit margin
    if "revenue" in data and "cost_of_sales" in data:
        data["gross_profit_margin"] = (
            (data["revenue"] - data["cost_of_sales"]) / data["revenue"]
        ) * 100

    # Calculate operating margin
    if "revenue" in data and "operating_expenses" in data:
        data["operating_margin"] = (
            (data["revenue"] - data["operating_expenses"]) / data["revenue"]
        ) * 100

    return data
