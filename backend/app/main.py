from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

# FastAPIアプリ作成
app = FastAPI(
    title="HydroTracker API",
    version="1.0.0",
)

# CORS設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {
        "message": "HydroTracker API is running!",
        "status": "healthy",
        "version": "1.0.0"
    }

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "message": "API is working correctly"
    }

@app.get("/api/test")
async def test_api():
    return {"test": "success", "timestamp": "2025-01-27"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)