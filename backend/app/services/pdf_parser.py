import pdfplumber
import camelot


def extract_jk_financials(pdf_path):
    """Extracts tables from John Keells annual reports"""
    tables = camelot.read_pdf(pdf_path, pages="all")
    # Custom extraction logic for JK reports
    return process_tables(tables)
