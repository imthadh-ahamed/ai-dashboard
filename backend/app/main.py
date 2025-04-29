from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import financial, shareholders, ai

app = FastAPI(title="JK Financial Dashboard API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

app.include_router(financial.router, prefix="/api/financial")
app.include_router(shareholders.router, prefix="/api/shareholders")
app.include_router(ai.router, prefix="/api/ai")
