from database import db
from fastapi import APIRouter, HTTPException
from passlib.context import CryptContext
from schemas.user import UserCreate, UserLogin

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


@router.post("/register")
async def register(user: UserCreate):
    existing = await db.users.find_one({"email": user.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed = pwd_context.hash(user.password)
    await db.users.insert_one(
        {"email": user.email, "hashed_password": hashed, "phone": user.phone}
    )
    return {"message": "User registered successfully"}


@router.post("/login")
async def login(user: UserLogin):
    db_user = await db.users.find_one({"email": user.email})
    if not db_user or not pwd_context.verify(user.password, db_user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"message": "Login successful"}
