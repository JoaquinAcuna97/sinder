from pydantic import BaseModel, EmailStr


class User(BaseModel):
    email: EmailStr
    hashed_password: str
    phone: str

class Profile(BaseModel):
    id: int
    imageUrl: str
    name: str
    age: int
    description: str