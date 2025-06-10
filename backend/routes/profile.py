import json
from pathlib import Path # To handle file paths robustly

from database import db
from fastapi import APIRouter, HTTPException
from passlib.context import CryptContext
from schemas.profile import ProfileGet # Assuming ProfileGet is your Pydantic schema for profiles
from models.user import Profile # Assuming Profile is your SQLAlchemy/ORM model if you're using one,
                                # or simply your Pydantic base model for internal use.

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Define the path to your profiles.json file
# This assumes profiles.json is in the same directory as this Python file.
# Adjust the path if your profiles.json is in a different location.
PROFILES_FILE_PATH = Path(__file__).parent / "profiles.json"

# Function to load profiles from the JSON file
def load_profiles_from_file():
    if not PROFILES_FILE_PATH.exists():
        # You might want to raise an error, log, or return an empty list
        print(f"Warning: profiles.json not found at {PROFILES_FILE_PATH}. Returning empty list.")
        return []
    try:
        with open(PROFILES_FILE_PATH, "r", encoding="utf-8") as f:
            profiles_data = json.load(f)
        # Validate data against your Pydantic Profile model
        # This ensures the data loaded from JSON matches your expected schema
        # If ProfileGet is the *response* model, you might need an internal Pydantic model for validation
        validated_profiles = [ProfileGet(**profile) for profile in profiles_data]
        return validated_profiles
    except json.JSONDecodeError as e:
        print(f"Error decoding profiles.json: {e}")
        return []
    except Exception as e:
        print(f"An unexpected error occurred while loading profiles: {e}")
        return []

# No longer need the hardcoded_profiles list here

@router.get("/profiles", response_model=list[ProfileGet])
async def get_profiles():
    """
    Returns a list of profiles read from profiles.json.
    """
    profiles = load_profiles_from_file()
    if not profiles:
        raise HTTPException(status_code=500, detail="Could not load profiles data")
    return profiles