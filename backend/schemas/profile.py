from pydantic import BaseModel, EmailStr


class ProfileGet(BaseModel):
    id: int
    imageUrl: str
    name: str
    age: int
    description: str


