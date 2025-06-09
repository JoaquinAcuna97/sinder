from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import auth

app = FastAPI()

# CORS setup
origins = [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://192.168.112.3:5173",
    "http://frontend:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {
        "message": "Hello from dockerized FastAPI Backend!",
        "title": "Let's do a login form",
    }


app.include_router(auth.router)
