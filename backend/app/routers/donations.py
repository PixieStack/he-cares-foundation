from fastapi import APIRouter, Form, BackgroundTasks
from typing import List, Optional
import uuid

from app.services.donation_email_service import send_donation_email, send_goods_donation_email

router = APIRouter(
    prefix="/api",
    tags=["donations"]
)

@router.post("/donate")
async def donate_money(
    background_tasks: BackgroundTasks,
    amount: float = Form(...),
    name: str = Form(...),
    card: str = Form(...),
    expiry: str = Form(...),
    cvc: str = Form(...)
):
    """
    Financial donation endpoint - Mock payment processing
    """
    reference = f"DON-{uuid.uuid4().hex[:10].upper()}"
    
    # Mock payment processing
    # In production, integrate with Stripe/PayPal/etc.
    
    # Send confirmation emails
    background_tasks.add_task(
        send_donation_email,
        name=name,
        amount=amount,
        reference=reference,
        card_last4=card[-4:] if len(card) >= 4 else "****"
    )
    
    return {
        "success": True,
        "message": "Thank you for your generous donation!",
        "reference": reference,
        "amount": amount
    }


@router.post("/donate-goods")
async def donate_goods(
    background_tasks: BackgroundTasks,
    name: str = Form(...),
    email: str = Form(...),
    phone: str = Form(...),
    items: List[str] = Form(...),
    message: Optional[str] = Form(None)
):
    """
    Goods donation endpoint
    """
    reference = f"GDS-{uuid.uuid4().hex[:10].upper()}"
    
    # Send confirmation emails
    background_tasks.add_task(
        send_goods_donation_email,
        name=name,
        email=email,
        phone=phone,
        items=items,
        message=message,
        reference=reference
    )
    
    return {
        "success": True,
        "message": "Thank you for your generous donation offer!",
        "reference": reference,
        "items": items
    }
