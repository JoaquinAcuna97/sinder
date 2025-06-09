from os import getenv

from motor.motor_asyncio import AsyncIOMotorClient

MONGO_URI = getenv("MONGO_URI", "mongodb://localhost:27017/changas_db")
client = AsyncIOMotorClient(MONGO_URI)
db = client.get_default_database()
