from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any
from app.services.data_processor import get_financial_data, get_financial_data_range

router = APIRouter()


@router.get("/{year}")
async def get_year_data(year: int) -> Dict[str, Any]:
    """
    Get financial data for a specific year.
    """
    try:
        data = get_financial_data(year)
        if not data:
            raise HTTPException(
                status_code=404, detail=f"No data found for year {year}"
            )
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/range/{start_year}/{end_year}")
async def get_year_range_data(start_year: int, end_year: int) -> List[Dict[str, Any]]:
    """
    Get financial data for a range of years.
    """
    try:
        if start_year > end_year:
            raise HTTPException(
                status_code=400,
                detail="Start year must be less than or equal to end year",
            )
        data = get_financial_data_range(start_year, end_year)
        if not data:
            raise HTTPException(
                status_code=404,
                detail=f"No data found for years {start_year} to {end_year}",
            )
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/metrics")
async def get_available_metrics() -> Dict[str, List[str]]:
    """
    Get list of available financial metrics grouped by category.
    """
    return {
        "core_metrics": [
            "revenue",
            "cost_of_sales",
            "operating_expenses",
            "profit",
            "net_profit",
        ],
        "profitability_metrics": [
            "gross_profit_margin",
            "operating_margin",
            "net_profit_margin",
            "return_on_equity",
            "return_on_assets",
        ],
        "per_share_metrics": [
            "eps",
            "dividend_per_share",
            "book_value_per_share",
            "net_asset_per_share",
        ],
        "liquidity_metrics": [
            "current_ratio",
            "quick_ratio",
            "cash_ratio",
            "working_capital",
        ],
        "efficiency_metrics": [
            "asset_turnover",
            "inventory_turnover",
            "receivables_turnover",
            "payables_turnover",
        ],
        "debt_metrics": [
            "debt_to_equity",
            "debt_ratio",
            "interest_coverage",
        ],
        "growth_metrics": [
            "revenue_growth",
            "profit_growth",
            "asset_growth",
        ],
        "balance_sheet_items": [
            "total_assets",
            "current_assets",
            "fixed_assets",
            "total_liabilities",
            "current_liabilities",
            "long_term_debt",
            "shareholders_equity",
        ],
        "cash_flow_items": [
            "operating_cash_flow",
            "investing_cash_flow",
            "financing_cash_flow",
            "free_cash_flow",
        ],
        "market_metrics": [
            "market_cap",
            "enterprise_value",
            "pe_ratio",
            "pb_ratio",
            "dividend_yield",
        ],
    }
