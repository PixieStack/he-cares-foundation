from fastapi import APIRouter, Form, UploadFile, File, BackgroundTasks
from typing import List, Optional
import uuid

from app.services.volunteer_email_service import send_volunteer_email

router = APIRouter(
    prefix="/api",
    tags=["volunteers"]
)

@router.post("/volunteer")
async def volunteer_application(
    background_tasks: BackgroundTasks,
    name: str = Form(...),
    age: int = Form(...),
    contact: str = Form(...),
    email: str = Form(...),
    location: str = Form(...),
    languages: str = Form(...),
    occupation: str = Form(...),
    emergencyContact: str = Form(...),
    areas: List[str] = Form(...),
    experience: str = Form(...),
    motivation: str = Form(...),
    availability: List[str] = Form(...),
    references: str = Form(...),
    consent: bool = Form(...),
    files: Optional[List[UploadFile]] = File(None)
):
    """
    Volunteer application endpoint
    """
    reference = f"VOL-{uuid.uuid4().hex[:10].upper()}"
    
    file_attachments = []
    if files:
        for file in files:
            contents = await file.read()
            file_attachments.append(
                (contents, file.filename, file.content_type or 'application/octet-stream')
            )
    
    # Send confirmation emails
    background_tasks.add_task(
        send_volunteer_email,
        name=name,
        email=email,
        age=age,
        contact=contact,
        location=location,
        languages=languages,
        occupation=occupation,
        emergency_contact=emergencyContact,
        areas=areas,
        experience=experience,
        motivation=motivation,
        availability=availability,
        references=references,
        attachments=file_attachments,
        reference=reference
    )
    
    return {
        "success": True,
        "message": "Thank you for your volunteer application!",
        "reference": reference
    }
