from fastapi import APIRouter, Form, UploadFile, File, BackgroundTasks
from typing import List, Optional
import uuid

from app.services.contact_email_service import send_contact_email

router = APIRouter(
    prefix="/api",
    tags=["contact"]
)

@router.post("/contact")
async def contact(
    background_tasks: BackgroundTasks,
    name: str = Form(...),
    email: str = Form(...),
    topic: str = Form(...),
    message: str = Form(...),
    phone: Optional[str] = Form(None),
    attachments: Optional[List[UploadFile]] = File(None)
):
    reference = uuid.uuid4().hex[:8].upper()
    email_attachments = []
    if attachments:
        for file in attachments:
            contents = await file.read()
            email_attachments.append(
                (contents, file.filename, file.content_type)
            )
    background_tasks.add_task(
        send_contact_email,
        name, email, topic, message, phone,
        email_attachments,
        reference
    )
    return {
        "message": "Thank you for contacting us!",
        "reference": reference
    }