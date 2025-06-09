from database import db
from fastapi import APIRouter, HTTPException
from passlib.context import CryptContext
from schemas.profile import ProfileGet
from models.user import Profile

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Hardcoded list of profiles (This will be replaced by a database in the future)
# Make sure the IDs are unique and consistent with what your frontend expects
hardcoded_profiles = [
    Profile(
        id=1,
        imageUrl='https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1976&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name='Sarah',
        age=26,
        description='Enthusiastic traveler and aspiring chef. Always up for an adventure or a cozy night in. Love to laugh and explore new places!',
    ),
    Profile(
        id=2,
        imageUrl='https://images.unsplash.com/photo-1507003211169-0a8677c7f3b8?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name='Michael',
        age=30,
        description='Software engineer by day, amateur photographer by night. Looking for someone to share sunsets and bad jokes with. Dog lover!',
    ),
    Profile(
        id=3,
        imageUrl='https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=2000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name='Emily',
        age=24,
        description: 'Artist and cat enthusiast. My ideal date involves a quiet gallery, a good book, or a spontaneous road trip. Let\'s create something beautiful!',
    ),
    Profile(
        id=4,
        imageUrl='https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name='David',
        age=32,
        description: 'Fitness junkie and foodie. I believe in living life to the fullest. Seeking a partner in crime for gym sessions and gastronomic adventures.',
    ),
]

@router.get("/profiles", response_model=list[ProfileGet])
async def get_profiles():
    """
    Returns a list of hardcoded profiles.
    In a real app, this would fetch from a database.
    """
    return hardcoded_profiles