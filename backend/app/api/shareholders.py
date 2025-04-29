from fastapi import APIRouter

router = APIRouter()

# Sample shareholders data
SAMPLE_SHAREHOLDERS = {
    2019: [
        {"name": "Institutional Investors", "percentage": 45, "shares": 4500000},
        {"name": "Retail Investors", "percentage": 30, "shares": 3000000},
        {"name": "Company Executives", "percentage": 15, "shares": 1500000},
        {"name": "Other", "percentage": 10, "shares": 1000000},
    ],
    2020: [
        {"name": "Institutional Investors", "percentage": 48, "shares": 4800000},
        {"name": "Retail Investors", "percentage": 28, "shares": 2800000},
        {"name": "Company Executives", "percentage": 14, "shares": 1400000},
        {"name": "Other", "percentage": 10, "shares": 1000000},
    ],
    2021: [
        {"name": "Institutional Investors", "percentage": 50, "shares": 5000000},
        {"name": "Retail Investors", "percentage": 25, "shares": 2500000},
        {"name": "Company Executives", "percentage": 15, "shares": 1500000},
        {"name": "Other", "percentage": 10, "shares": 1000000},
    ],
    2022: [
        {"name": "Institutional Investors", "percentage": 52, "shares": 5200000},
        {"name": "Retail Investors", "percentage": 23, "shares": 2300000},
        {"name": "Company Executives", "percentage": 15, "shares": 1500000},
        {"name": "Other", "percentage": 10, "shares": 1000000},
    ],
    2023: [
        {"name": "Institutional Investors", "percentage": 55, "shares": 5500000},
        {"name": "Retail Investors", "percentage": 20, "shares": 2000000},
        {"name": "Company Executives", "percentage": 15, "shares": 1500000},
        {"name": "Other", "percentage": 10, "shares": 1000000},
    ],
    2024: [
        {"name": "Institutional Investors", "percentage": 58, "shares": 5800000},
        {"name": "Retail Investors", "percentage": 17, "shares": 1700000},
        {"name": "Company Executives", "percentage": 15, "shares": 1500000},
        {"name": "Other", "percentage": 10, "shares": 1000000},
    ],
}


@router.get("/")
async def get_shareholders_data(year: int = None):
    """
    Get shareholders data for a specific year or all years.

    Args:
        year (int, optional): The year to get data for. If None, returns data for all years.

    Returns:
        dict or list: Shareholders data for the specified year or all years.
    """
    if year is not None:
        # Return data for a specific year
        if year in SAMPLE_SHAREHOLDERS:
            return SAMPLE_SHAREHOLDERS[year]
        else:
            return {"error": f"No data available for year {year}"}
    else:
        # Return data for all years
        return SAMPLE_SHAREHOLDERS
