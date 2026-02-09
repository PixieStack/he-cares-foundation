from dotenv import load_dotenv
import os
import smtplib
from email.message import EmailMessage
from typing import List, Optional

# Load .env file
load_dotenv()

EMAIL_TO = os.getenv("EMAIL_TO", "admin@hecaresfoundation.org")
EMAIL_FROM = "no-reply@hecaresfoundation.org"
EMAIL_HOST = os.getenv("EMAIL_HOST", "smtp.gmail.com")
EMAIL_PORT = int(os.getenv("EMAIL_PORT", "587"))
EMAIL_USER = os.getenv("EMAIL_USER")
EMAIL_PASS = os.getenv("EMAIL_PASS")


def send_donation_email(name: str, amount: float, reference: str, card_last4: str):
    """Send confirmation email for financial donation"""
    
    # Email to donor
    donor_msg = EmailMessage()
    donor_msg["Subject"] = f"Thank You for Your Donation - [{reference}]"
    donor_msg["From"] = EMAIL_FROM
    donor_msg["To"] = EMAIL_TO  # In production, this would be the donor's email
    donor_msg["Reply-To"] = EMAIL_FROM
    
    donor_body_html = f"""
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;border:1px solid #e9e9e9;padding:30px;">
      <h2 style="color:#1e3a8a;margin-bottom:12px;">Thank You for Your Generous Donation!</h2>
      <p style="font-size:16px;">Dear <b>{name}</b>,</p>
      <p style="font-size:15px;">Thank you for your generous donation to HE CARES FOUNDATION. Your support helps us protect and empower vulnerable women and children.</p>
      
      <div style="background:#f8fafc;border-radius:7px;padding:20px;margin:20px 0;border:1px solid #e3e7ee;">
        <div style="font-size:15px;"><b>Donation Details:</b></div>
        <table style="width:100%;margin-top:12px;font-size:15px;">
          <tr>
            <td style="padding:6px 0;color:#666;">Reference:</td>
            <td style="padding:6px 0;"><b style="color:#1e3a8a;">{reference}</b></td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#666;">Amount:</td>
            <td style="padding:6px 0;"><b>ZAR {amount:.2f}</b></td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#666;">Card ending in:</td>
            <td style="padding:6px 0;">{card_last4}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#666;">Status:</td>
            <td style="padding:6px 0;"><span style="color:#10b981;font-weight:600;">✓ Confirmed</span></td>
          </tr>
        </table>
      </div>
      
      <p style="font-size:15px;">Your donation directly funds:</p>
      <ul style="font-size:15px;line-height:1.8;">
        <li>Safe houses and emergency shelter</li>
        <li>Educational empowerment programs</li>
        <li>Crisis support and counseling</li>
        <li>Community advocacy and awareness</li>
      </ul>
      
      <p style="font-size:15px;">Please keep your reference number for your records.</p>
      <p style="font-size:15px;margin-top:20px;">With gratitude,<br><b>HE CARES FOUNDATION Team</b></p>
      
      <hr style="margin:24px 0 18px 0;border:none;border-top:1px solid #eee;">
      <p style="color:#888;font-size:13px;">This is an automated confirmation. Please do not reply to this email.</p>
    </div>
    """
    
    donor_body_text = f"""Dear {name},

Thank you for your generous donation to HE CARES FOUNDATION!

Donation Details:
Reference: {reference}
Amount: ZAR {amount:.2f}
Card ending in: {card_last4}
Status: Confirmed

Your support helps us protect and empower vulnerable women and children.

Please keep your reference number for your records.

With gratitude,
HE CARES FOUNDATION Team
"""
    
    donor_msg.set_content(donor_body_text)
    donor_msg.add_alternative(donor_body_html, subtype='html')
    
    # Admin notification
    admin_msg = EmailMessage()
    admin_msg["Subject"] = f"New Donation Received - ZAR {amount:.2f} [{reference}]"
    admin_msg["From"] = EMAIL_FROM
    admin_msg["To"] = EMAIL_TO
    
    admin_body = f"""New donation received:

Reference: {reference}
Donor: {name}
Amount: ZAR {amount:.2f}
Card ending in: {card_last4}
Status: Confirmed

HE CARES FOUNDATION
"""
    admin_msg.set_content(admin_body)
    
    # Send emails (mocked if credentials not available)
    if not EMAIL_USER or not EMAIL_PASS:
        print(f"[MOCK EMAIL] Donation confirmation sent to {name} - Reference: {reference}")
        print(f"[MOCK EMAIL] Admin notified of donation: ZAR {amount:.2f}")
        return
    
    try:
        with smtplib.SMTP(EMAIL_HOST, EMAIL_PORT) as smtp:
            smtp.starttls()
            smtp.login(EMAIL_USER, EMAIL_PASS)
            smtp.send_message(donor_msg)
            smtp.send_message(admin_msg)
        print(f"Donation emails sent successfully - Reference: {reference}")
    except Exception as e:
        print(f"Email sending error: {e}")


def send_goods_donation_email(name: str, email: str, phone: str, items: List[str], message: Optional[str], reference: str):
    """Send confirmation email for goods donation"""
    
    items_list = "\n".join([f"  • {item}" for item in items])
    items_html = "".join([f"<li>{item}</li>" for item in items])
    
    # Email to donor
    donor_msg = EmailMessage()
    donor_msg["Subject"] = f"Thank You for Your Goods Donation Offer - [{reference}]"
    donor_msg["From"] = EMAIL_FROM
    donor_msg["To"] = email
    donor_msg["Reply-To"] = EMAIL_TO
    
    donor_body_html = f"""
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;border:1px solid #e9e9e9;padding:30px;">
      <h2 style="color:#1e3a8a;margin-bottom:12px;">Thank You for Your Donation Offer!</h2>
      <p style="font-size:16px;">Dear <b>{name}</b>,</p>
      <p style="font-size:15px;">Thank you for offering to donate essential goods to HE CARES FOUNDATION. Your generosity makes a real difference!</p>
      
      <div style="background:#f8fafc;border-radius:7px;padding:20px;margin:20px 0;border:1px solid #e3e7ee;">
        <div style="font-size:15px;"><b>Your Donation Details:</b></div>
        <table style="width:100%;margin-top:12px;font-size:15px;">
          <tr>
            <td style="padding:6px 0;color:#666;">Reference:</td>
            <td style="padding:6px 0;"><b style="color:#1e3a8a;">{reference}</b></td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#666;vertical-align:top;">Items:</td>
            <td style="padding:6px 0;">
              <ul style="margin:0;padding-left:20px;">
                {items_html}
              </ul>
            </td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#666;">Phone:</td>
            <td style="padding:6px 0;">{phone}</td>
          </tr>
          {f'<tr><td style="padding:6px 0;color:#666;vertical-align:top;">Message:</td><td style="padding:6px 0;">{message}</td></tr>' if message else ''}
        </table>
      </div>
      
      <div style="background:#fff3cd;border-left:4px solid #f97316;padding:15px;margin:20px 0;">
        <p style="margin:0;font-size:15px;"><b>Next Steps:</b></p>
        <p style="margin:8px 0 0 0;font-size:14px;">A member of our team will contact you within 2-3 business days to arrange collection or delivery of the goods.</p>
      </div>
      
      <p style="font-size:15px;">Please keep your reference number for future correspondence.</p>
      <p style="font-size:15px;margin-top:20px;">With gratitude,<br><b>HE CARES FOUNDATION Team</b></p>
      
      <hr style="margin:24px 0 18px 0;border:none;border-top:1px solid #eee;">
      <p style="color:#888;font-size:13px;">For questions, please contact us at {EMAIL_TO}</p>
    </div>
    """
    
    donor_body_text = f"""Dear {name},

Thank you for offering to donate essential goods to HE CARES FOUNDATION!

Your Donation Details:
Reference: {reference}
Items:
{items_list}
Phone: {phone}
{f'Message: {message}' if message else ''}

Next Steps:
A member of our team will contact you within 2-3 business days to arrange collection or delivery of the goods.

Please keep your reference number for future correspondence.

With gratitude,
HE CARES FOUNDATION Team

For questions, please contact us at {EMAIL_TO}
"""
    
    donor_msg.set_content(donor_body_text)
    donor_msg.add_alternative(donor_body_html, subtype='html')
    
    # Admin notification
    admin_msg = EmailMessage()
    admin_msg["Subject"] = f"New Goods Donation Offer - [{reference}]"
    admin_msg["From"] = EMAIL_FROM
    admin_msg["To"] = EMAIL_TO
    
    admin_body = f"""New goods donation offer received:

Reference: {reference}
Donor: {name}
Email: {email}
Phone: {phone}

Items offered:
{items_list}

{f'Message from donor: {message}' if message else ''}

Please contact the donor to arrange collection/delivery.

HE CARES FOUNDATION
"""
    admin_msg.set_content(admin_body)
    
    # Send emails (mocked if credentials not available)
    if not EMAIL_USER or not EMAIL_PASS:
        print(f"[MOCK EMAIL] Goods donation confirmation sent to {name} ({email}) - Reference: {reference}")
        print(f"[MOCK EMAIL] Admin notified of goods donation offer")
        return
    
    try:
        with smtplib.SMTP(EMAIL_HOST, EMAIL_PORT) as smtp:
            smtp.starttls()
            smtp.login(EMAIL_USER, EMAIL_PASS)
            smtp.send_message(donor_msg)
            smtp.send_message(admin_msg)
        print(f"Goods donation emails sent successfully - Reference: {reference}")
    except Exception as e:
        print(f"Email sending error: {e}")
