from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import contact, volunteers, donations

app = FastAPI(
    title="He Cares Foundation API",
    description="Backend API for He Cares Foundation - Supporting women and children in South Africa",
    version="1.0.0"
)

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
app.include_router(donations.router)

@app.get("/")
async def root():
    return {
        "message": "He Cares Foundation API",
        "status": "running",
        "version": "1.0.0"
    }