from motor.motor_asyncio import AsyncIOMotorClient
import certifi

from app.core.config import settings

client: AsyncIOMotorClient | None = None
db = None


async def connect_to_mongo():
    global client, db

    client = AsyncIOMotorClient(
        settings.MONGO_URI,
        tlsCAFile=certifi.where()
    )

    db = client[settings.DATABASE_NAME]

    print("✅ Connected to MongoDB Atlas")


async def close_mongo_connection():
    global client

    if client:
        client.close()
        print("🔴 MongoDB Connection Closed")


def get_database():
    return db