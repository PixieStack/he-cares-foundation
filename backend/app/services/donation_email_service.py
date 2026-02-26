from dotenv import load_dotenv
import os
import smtplib
from email.message import EmailMessage
from typing import List, Optional

# Load .env file
load_dotenv()

EMAIL_TO = os.getenv("EMAIL_TO", "Godfreymalindisa@gmail.com")
EMAIL_FROM = os.getenv("EMAIL_FROM", "noreply@hecaresfoundation.org")
EMAIL_HOST = os.getenv("EMAIL_HOST", "smtp-relay.brevo.com")
EMAIL_PORT = int(os.getenv("EMAIL_PORT", "587"))
EMAIL_USER = os.getenv("EMAIL_USER")
EMAIL_PASS = os.getenv("EMAIL_PASS")
FOUNDATION_PHONE = os.getenv("FOUNDATION_PHONE", "0681263127")

# Bank details
BANK_NAME = "Nedbank"
BANK_ACCOUNT = "1308803249"
BANK_BRANCH = "198 765"


def send_donation_email(name: str, amount: float, reference: str, card_last4: str):
    """Send confirmation email for financial donation"""
    
    # Admin notification - main email to foundation
    admin_msg = EmailMessage()
    admin_msg["Subject"] = f"[From Donate Page] New Financial Donation - ZAR {amount:.2f} - Ref: {reference}"
    admin_msg["From"] = EMAIL_FROM
    admin_msg["To"] = EMAIL_TO
    
    admin_body_html = f"""
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;border:1px solid #e9e9e9;padding:30px;">
      <h2 style="color:#1e3a8a;margin-bottom:12px;">New Financial Donation Received!</h2>
      <p style="font-size:14px;color:#666;margin-bottom:16px;"><em>Submitted from: Donate Page (Financial Support)</em></p>
      
      <div style="background:#d1fae5;border-radius:7px;padding:20px;margin:20px 0;border:1px solid #10b981;">
        <table style="width:100%;font-size:15px;">
          <tr>
            <td style="padding:6px 0;color:#666;width:150px;">Reference:</td>
            <td style="padding:6px 0;"><b style="color:#1e3a8a;">{reference}</b></td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#666;">Donor Name:</td>
            <td style="padding:6px 0;"><b>{name}</b></td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#666;">Amount:</td>
            <td style="padding:6px 0;"><b style="font-size:18px;color:#10b981;">ZAR {amount:.2f}</b></td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#666;">Card ending in:</td>
            <td style="padding:6px 0;">{card_last4}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#666;">Status:</td>
            <td style="padding:6px 0;"><span style="color:#10b981;font-weight:600;">Confirmed</span></td>
          </tr>
        </table>
      </div>
      
      <hr style="margin:24px 0 18px 0;border:none;border-top:1px solid #eee;">
      <p style="color:#888;font-size:13px;">HE CARES FOUNDATION - Donation Management</p>
    </div>
    """
    
    admin_body_text = f"""[From Donate Page] New Financial Donation Received

Reference: {reference}
Donor: {name}
Amount: ZAR {amount:.2f}
Card ending in: {card_last4}
Status: Confirmed

HE CARES FOUNDATION - Donation Management
"""
    
    admin_msg.set_content(admin_body_text)
    admin_msg.add_alternative(admin_body_html, subtype='html')
    
    # Send emails (mocked if credentials not available)
    if not EMAIL_USER or not EMAIL_PASS:
        print(f"[MOCK EMAIL] Admin notified of donation: ZAR {amount:.2f} - Reference: {reference}")
        return
    
    try:
        with smtplib.SMTP(EMAIL_HOST, EMAIL_PORT, timeout=30) as smtp:
            smtp.starttls()
            smtp.login(EMAIL_USER, EMAIL_PASS)
            smtp.send_message(admin_msg)
        print(f"Donation email sent successfully - Reference: {reference}")
    except Exception as e:
        print(f"Email sending error: {e}")


def send_goods_donation_email(name: str, email: str, phone: str, items: List[str], message: Optional[str], reference: str):
    """Send confirmation email for goods donation"""
    
    items_list = "\n".join([f"  - {item}" for item in items])
    items_html = "".join([f"<li>{item}</li>" for item in items])
    
    # Admin notification
    admin_msg = EmailMessage()
    admin_msg["Subject"] = f"[From Donate Page] New Goods Donation Offer - Ref: {reference}"
    admin_msg["From"] = EMAIL_FROM
    admin_msg["To"] = EMAIL_TO
    admin_msg["Reply-To"] = email
    
    admin_body_html = f"""
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;border:1px solid #e9e9e9;padding:30px;">
      <h2 style="color:#1e3a8a;margin-bottom:12px;">New Goods Donation Offer!</h2>
      <p style="font-size:14px;color:#666;margin-bottom:16px;"><em>Submitted from: Donate Page (Essential Goods)</em></p>
      
      <div style="background:#f8fafc;border-radius:7px;padding:20px;margin:20px 0;border:1px solid #e3e7ee;">
        <table style="width:100%;font-size:15px;">
          <tr>
            <td style="padding:6px 0;color:#666;width:150px;">Reference:</td>
            <td style="padding:6px 0;"><b style="color:#1e3a8a;">{reference}</b></td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#666;">Donor Name:</td>
            <td style="padding:6px 0;"><b>{name}</b></td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#666;">Email:</td>
            <td style="padding:6px 0;"><a href="mailto:{email}">{email}</a></td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#666;">Phone:</td>
            <td style="padding:6px 0;"><a href="tel:{phone}">{phone}</a></td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#666;vertical-align:top;">Items Offered:</td>
            <td style="padding:6px 0;">
              <ul style="margin:0;padding-left:20px;">
                {items_html}
              </ul>
            </td>
          </tr>
          {f'<tr><td style="padding:6px 0;color:#666;vertical-align:top;">Message:</td><td style="padding:6px 0;">{message}</td></tr>' if message else ''}
        </table>
      </div>
      
      <div style="background:#fff3cd;border-left:4px solid #f97316;padding:15px;margin:20px 0;">
        <p style="margin:0;font-size:15px;"><b>Action Required:</b></p>
        <p style="margin:8px 0 0 0;font-size:14px;">Please contact the donor to arrange collection or delivery of the goods.</p>
      </div>
      
      <hr style="margin:24px 0 18px 0;border:none;border-top:1px solid #eee;">
      <p style="color:#888;font-size:13px;">HE CARES FOUNDATION - Donation Management</p>
    </div>
    """
    
    admin_body_text = f"""[From Donate Page] New Goods Donation Offer

Reference: {reference}
Donor: {name}
Email: {email}
Phone: {phone}

Items offered:
{items_list}

{f'Message from donor: {message}' if message else ''}

ACTION REQUIRED: Please contact the donor to arrange collection/delivery.

HE CARES FOUNDATION - Donation Management
"""
    
    admin_msg.set_content(admin_body_text)
    admin_msg.add_alternative(admin_body_html, subtype='html')
    
    # Email to donor
    donor_msg = EmailMessage()
    donor_msg["Subject"] = f"HE CARES FOUNDATION - Thank You for Your Donation Offer [{reference}]"
    donor_msg["From"] = EMAIL_FROM
    donor_msg["To"] = email
    donor_msg["Reply-To"] = EMAIL_TO
    
    donor_body_html = f"""
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;border:1px solid #e9e9e9;padding:30px;">
      <h2 style="color:#1e3a8a;margin-bottom:12px;">Thank You for Your Donation Offer!</h2>
      <p style="font-size:16px;">Dear <b>{name}</b>,</p>
      <p style="font-size:15px;">Thank you for offering to donate essential goods to HE CARES FOUNDATION. Your generosity makes a real difference in the lives of vulnerable women and children!</p>
      
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
        </table>
      </div>
      
      <div style="background:#d1fae5;border-left:4px solid #10b981;padding:15px;margin:20px 0;">
        <p style="margin:0;font-size:15px;"><b>Next Steps:</b></p>
        <p style="margin:8px 0 0 0;font-size:14px;">A member of our team will contact you within 2-3 business days to arrange collection or delivery of the goods.</p>
      </div>
      
      <p style="font-size:15px;">Please keep your reference number for future correspondence.</p>
      <p style="font-size:15px;margin-top:20px;">With gratitude,<br><b>HE CARES FOUNDATION Team</b><br>
      <small>Contact: {FOUNDATION_PHONE}</small></p>
      
      <hr style="margin:24px 0 18px 0;border:none;border-top:1px solid #eee;">
      <p style="color:#888;font-size:13px;">For questions, please contact us at {FOUNDATION_PHONE} or reply to this email.</p>
    </div>
    """
    
    donor_body_text = f"""Dear {name},

Thank you for offering to donate essential goods to HE CARES FOUNDATION!

Your Donation Details:
Reference: {reference}
Items:
{items_list}

Next Steps:
A member of our team will contact you within 2-3 business days to arrange collection or delivery of the goods.

Please keep your reference number for future correspondence.

With gratitude,
HE CARES FOUNDATION Team
Contact: {FOUNDATION_PHONE}

For questions, please contact us at {FOUNDATION_PHONE}
"""
    
    donor_msg.set_content(donor_body_text)
    donor_msg.add_alternative(donor_body_html, subtype='html')
    
    # Send emails (mocked if credentials not available)
    if not EMAIL_USER or not EMAIL_PASS:
        print(f"[MOCK EMAIL] Goods donation confirmation sent to {name} ({email}) - Reference: {reference}")
        print(f"[MOCK EMAIL] Admin notified of goods donation offer")
        return
    
    try:
        with smtplib.SMTP(EMAIL_HOST, EMAIL_PORT, timeout=30) as smtp:
            smtp.starttls()
            smtp.login(EMAIL_USER, EMAIL_PASS)
            smtp.send_message(admin_msg)
            smtp.send_message(donor_msg)
        print(f"Goods donation emails sent successfully - Reference: {reference}")
    except Exception as e:
        print(f"Email sending error: {e}")
