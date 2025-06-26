from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import contact, volunteers 

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers for endpoints
app.include_router(contact.router)
app.include_router(volunteers.router)