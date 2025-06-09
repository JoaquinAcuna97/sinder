import pytest
import pytest_asyncio
from httpx import AsyncClient
from motor.motor_asyncio import AsyncIOMotorClient

MONGO_URI = "mongodb://mongo:27017"
BASE_URL = "http://backend:8000"


# ✅ Simple test to verify test discovery
def test_sanity():
    assert 1 + 1 == 2


# Fixture to override DB for test
@pytest_asyncio.fixture(autouse=True, scope="function")
async def clear_users():
    client = AsyncIOMotorClient(MONGO_URI)
    db = client["changas_test"]
    await db["users"].delete_many({})
    yield
    await db["users"].delete_many({})
    client.close()


@pytest.mark.asyncio
async def test_register():
    async with AsyncClient(base_url=BASE_URL) as ac:
        response = await ac.post(
            "/register",
            json={
                "email": "test@example.com",
                "password": "password123",
                "phone": "123456789",
            },
        )
    assert response.status_code == 200
    assert response.json()["message"] == "User registered successfully"


@pytest.mark.asyncio
async def test_login_success():
    async with AsyncClient(base_url=BASE_URL) as ac:
        # First register user
        await ac.post(
            "/register",
            json={
                "email": "test@example.com",
                "password": "password123",
                "phone": "123456789",
            },
        )
        # Then attempt login
        response = await ac.post(
            "/login", json={"email": "test@example.com", "password": "password123"}
        )
    assert response.status_code == 200
    assert response.json()["message"] == "Login successful"


@pytest.mark.asyncio
async def test_login_failure():
    async with AsyncClient(base_url=BASE_URL) as ac:
        response = await ac.post(
            "/login", json={"email": "wrong@example.com", "password": "wrongpass"}
        )
    assert response.status_code == 401
    assert response.json()["detail"] == "Invalid credentials"
