from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.core.database import connect_to_mongo, close_mongo_connection

from app.api.v1.auth import router as auth_router
from app.api.v1.users import router as users_router
from app.api.v1.items import router as items_router
from app.api.v1.exchange import router as exchange_router
from app.api.v1.ai import router as ai_router

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="AI-Powered Neighborhood Exchange Platform API"
)

# -----------------------------
# CORS Configuration
# -----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_db():
    await connect_to_mongo()


@app.on_event("shutdown")
async def shutdown_db():
    await close_mongo_connection()


@app.get("/")
async def root():
    return {
        "message": "Welcome to AI Neighborhood Exchange API 🚀",
        "version": settings.APP_VERSION
    }


@app.get("/health")
async def health():
    return {
        "status": "healthy",
        "backend": "running"
    }


app.include_router(auth_router)
app.include_router(users_router)
app.include_router(items_router)
app.include_router(exchange_router)
app.include_router(ai_router)