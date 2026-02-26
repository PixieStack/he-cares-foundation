from fastapi import APIRouter, Form, UploadFile, File, BackgroundTasks
from typing import List, Optional
import uuid

from app.services.generic_email_service import send_generic_form_email

router = APIRouter(
    prefix="/api",
    tags=["forms"]
)


@router.post("/forms/spread-the-word/story")
async def spread_the_word_story(
    background_tasks: BackgroundTasks,
    name: str = Form(...),
    text: str = Form(...)
):
    """Submit a story for Spread the Word"""
    reference = f"STY-{uuid.uuid4().hex[:10].upper()}"
    
    form_data = {
        "story_text": text,
    }
    
    background_tasks.add_task(
        send_generic_form_email,
        form_source="Spread the Word Page (Share Your Story)",
        form_data=form_data,
        user_email=f"story-{reference}@hecaresfoundation.org",  # No email provided
        user_name=name,
        reference=reference,
        attachments=None
    )
    
    return {
        "success": True,
        "message": "Story shared! Thank you for spreading the word.",
        "reference": reference
    }


@router.post("/forms/spread-the-word/challenge")
async def spread_the_word_challenge(
    background_tasks: BackgroundTasks,
    your_name: str = Form(...),
    friend_email: str = Form(...),
    message: Optional[str] = Form(None)
):
    """Challenge a friend to join the movement"""
    reference = f"CHG-{uuid.uuid4().hex[:10].upper()}"
    
    form_data = {
        "friend_email": friend_email,
        "personal_message": message or "No personal message added",
    }
    
    background_tasks.add_task(
        send_generic_form_email,
        form_source="Spread the Word Page (Challenge a Friend)",
        form_data=form_data,
        user_email=friend_email,
        user_name=your_name,
        reference=reference,
        attachments=None
    )
    
    return {
        "success": True,
        "message": "Challenge sent! Your friend will receive an invitation.",
        "reference": reference
    }


@router.post("/forms/educational-empowerment")
async def educational_empowerment_form(
    background_tasks: BackgroundTasks,
    form_type: str = Form(...),  # 'support' or 'suggest'
    name: str = Form(...),
    contact: str = Form(...),
    email: str = Form(...),
    # Support form fields
    program: Optional[List[str]] = Form(None),
    need_details: Optional[str] = Form(None),
    # Suggest form fields
    title: Optional[str] = Form(None),
    description: Optional[str] = Form(None),
    beneficiaries: Optional[str] = Form(None),
    files: Optional[List[UploadFile]] = File(None)
):
    reference = f"EDU-{uuid.uuid4().hex[:10].upper()}"
    
    form_data = {
        "form_type": form_type,
        "contact": contact,
    }
    
    if form_type == 'support':
        form_data["programs"] = program or []
        form_data["need_details"] = need_details
    else:  # suggest
        form_data["program_title"] = title
        form_data["description"] = description
        form_data["beneficiaries"] = beneficiaries
    
    file_attachments = []
    if files:
        for file in files:
            contents = await file.read()
            file_attachments.append(
                (contents, file.filename, file.content_type or 'application/octet-stream')
            )
    
    background_tasks.add_task(
        send_generic_form_email,
        form_source=f"Educational Empowerment Page ({form_type.title()})",
        form_data=form_data,
        user_email=email,
        user_name=name,
        reference=reference,
        attachments=file_attachments
    )
    
    return {
        "success": True,
        "message": "Thank you! Our team will contact you soon.",
        "reference": reference
    }


@router.post("/forms/community-advocacy")
async def community_advocacy_form(
    background_tasks: BackgroundTasks,
    form_type: str = Form(...),  # 'support', 'advocate', or 'nominate'
    # Common fields
    name: Optional[str] = Form(None),
    contact: Optional[str] = Form(None),
    email: Optional[str] = Form(None),
    # Support form fields
    support_type: Optional[str] = Form(None),
    reason: Optional[str] = Form(None),
    # Advocate form fields
    motivation: Optional[str] = Form(None),
    skills: Optional[str] = Form(None),
    # Nominate form fields
    your_name: Optional[str] = Form(None),
    your_contact: Optional[str] = Form(None),
    nominee_name: Optional[str] = Form(None),
    nominee_contact: Optional[str] = Form(None),
    files: Optional[List[UploadFile]] = File(None)
):
    reference = f"ADV-{uuid.uuid4().hex[:10].upper()}"
    
    form_data = {"form_type": form_type}
    
    if form_type == 'support':
        form_data["contact"] = contact
        form_data["support_type"] = support_type
        form_data["reason"] = reason
        user_name = name
        user_email = email
    elif form_type == 'advocate':
        form_data["contact"] = contact
        form_data["motivation"] = motivation
        form_data["skills"] = skills
        user_name = name
        user_email = email
    else:  # nominate
        form_data["nominator_contact"] = your_contact
        form_data["nominee_name"] = nominee_name
        form_data["nominee_contact"] = nominee_contact
        form_data["reason"] = reason
        user_name = your_name
        user_email = email or f"nominator-{reference}@placeholder.com"
    
    file_attachments = []
    if files:
        for file in files:
            contents = await file.read()
            file_attachments.append(
                (contents, file.filename, file.content_type or 'application/octet-stream')
            )
    
    background_tasks.add_task(
        send_generic_form_email,
        form_source=f"Community Advocacy Page ({form_type.title()})",
        form_data=form_data,
        user_email=user_email,
        user_name=user_name,
        reference=reference,
        attachments=file_attachments
    )
    
    return {
        "success": True,
        "message": "Thank you! Your submission has been received.",
        "reference": reference
    }


@router.post("/forms/crisis-support")
async def crisis_support_form(
    background_tasks: BackgroundTasks,
    name: str = Form(...),
    contact: str = Form(...),
    email: str = Form(...),
    crisis_type: List[str] = Form(...),
    message: Optional[str] = Form(None),
    referral_type: str = Form("self"),
    referred_by: Optional[str] = Form(None),
    files: Optional[List[UploadFile]] = File(None)
):
    reference = f"CRS-{uuid.uuid4().hex[:10].upper()}"
    
    form_data = {
        "contact": contact,
        "crisis_type": crisis_type,
        "message": message,
        "referral_type": referral_type,
    }
    
    if referral_type == 'professional':
        form_data["referred_by"] = referred_by
    
    file_attachments = []
    if files:
        for file in files:
            contents = await file.read()
            file_attachments.append(
                (contents, file.filename, file.content_type or 'application/octet-stream')
            )
    
    background_tasks.add_task(
        send_generic_form_email,
        form_source="Crisis Support Page",
        form_data=form_data,
        user_email=email,
        user_name=name,
        reference=reference,
        attachments=file_attachments
    )
    
    return {
        "success": True,
        "message": "Thank you for reaching out. Our team will contact you soon with support and referrals.",
        "reference": reference
    }


@router.post("/forms/start-fundraiser")
async def start_fundraiser_form(
    background_tasks: BackgroundTasks,
    organizer_name: str = Form(...),
    contact: str = Form(...),
    email: str = Form(...),
    location: str = Form(...),
    event_type: str = Form(...),
    event_title: str = Form(...),
    event_date: str = Form(...),
    event_desc: str = Form(...),
    support_needed: Optional[List[str]] = Form(None),
    files: Optional[List[UploadFile]] = File(None)
):
    reference = f"FND-{uuid.uuid4().hex[:10].upper()}"
    
    form_data = {
        "contact": contact,
        "location": location,
        "event_type": event_type,
        "event_title": event_title,
        "event_date": event_date,
        "event_description": event_desc,
        "support_needed": support_needed or [],
    }
    
    file_attachments = []
    if files:
        for file in files:
            contents = await file.read()
            file_attachments.append(
                (contents, file.filename, file.content_type or 'application/octet-stream')
            )
    
    background_tasks.add_task(
        send_generic_form_email,
        form_source="Start a Fundraiser Page",
        form_data=form_data,
        user_email=email,
        user_name=organizer_name,
        reference=reference,
        attachments=file_attachments
    )
    
    return {
        "success": True,
        "message": "Thank you for registering your fundraiser! Our team will review your application and contact you.",
        "reference": reference
    }


@router.post("/forms/corporate-partnership")
async def corporate_partnership_form(
    background_tasks: BackgroundTasks,
    form_type: str = Form(...),  # 'partner' or 'nominate'
    # Partner fields
    org_type: Optional[str] = Form(None),
    org_name: Optional[str] = Form(None),
    contact_name: Optional[str] = Form(None),
    contact_email: Optional[str] = Form(None),
    phone: Optional[str] = Form(None),
    interest: Optional[str] = Form(None),
    message: Optional[str] = Form(None),
    # Nominate fields
    your_name: Optional[str] = Form(None),
    nominate_org_type: Optional[str] = Form(None),
    nominate_org_name: Optional[str] = Form(None),
    nominate_contact_email: Optional[str] = Form(None),
    nominate_message: Optional[str] = Form(None)
):
    reference = f"PRT-{uuid.uuid4().hex[:10].upper()}"
    
    if form_type == 'partner':
        form_data = {
            "organization_type": org_type,
            "organization_name": org_name,
            "phone": phone,
            "interest": interest,
            "message": message,
        }
        user_name = contact_name
        user_email = contact_email
    else:  # nominate
        form_data = {
            "nominated_org_type": nominate_org_type,
            "nominated_org_name": nominate_org_name,
            "nominated_contact_email": nominate_contact_email,
            "message": nominate_message,
        }
        user_name = your_name
        user_email = nominate_contact_email or f"nominator-{reference}@placeholder.com"
    
    background_tasks.add_task(
        send_generic_form_email,
        form_source=f"Corporate Partnership Page ({form_type.title()})",
        form_data=form_data,
        user_email=user_email,
        user_name=user_name,
        reference=reference,
        attachments=None
    )
    
    return {
        "success": True,
        "message": "Thank you! We'll be in touch soon.",
        "reference": reference
    }
