from dotenv import load_dotenv
import os
import smtplib
from email.message import EmailMessage
from typing import List, Tuple

# Load .env file
load_dotenv()

EMAIL_TO = os.getenv("EMAIL_TO", "Godfreymalindisa@gmail.com")
EMAIL_FROM = os.getenv("EMAIL_FROM", "noreply@hecaresfoundation.org")
EMAIL_HOST = os.getenv("EMAIL_HOST", "smtp-relay.brevo.com")
EMAIL_PORT = int(os.getenv("EMAIL_PORT", "587"))
EMAIL_USER = os.getenv("EMAIL_USER")
EMAIL_PASS = os.getenv("EMAIL_PASS")
FOUNDATION_PHONE = os.getenv("FOUNDATION_PHONE", "0681263127")


def send_volunteer_email(
    name: str,
    email: str,
    age: int,
    contact: str,
    location: str,
    languages: str,
    occupation: str,
    emergency_contact: str,
    areas: List[str],
    experience: str,
    motivation: str,
    availability: List[str],
    references: str,
    attachments: List[Tuple[bytes, str, str]],
    reference: str
):
    """Send confirmation email for volunteer application"""
    
    areas_list = ", ".join(areas)
    availability_list = ", ".join(availability)
    
    attachments_html = ""
    if attachments:
        attachments_html = "<ul style='margin:5px 0;'>"
        for _, filename, _ in attachments:
            attachments_html += f"<li>{filename}</li>"
        attachments_html += "</ul>"
    
    # Admin notification
    admin_msg = EmailMessage()
    admin_msg["Subject"] = f"[From Volunteer Page] New Volunteer Application - {name} - Ref: {reference}"
    admin_msg["From"] = EMAIL_FROM
    admin_msg["To"] = EMAIL_TO
    admin_msg["Reply-To"] = email
    
    admin_body_html = f"""
    <div style="font-family:Arial,sans-serif;max-width:700px;margin:auto;padding:20px;border:1px solid #e9e9e9;">
      <h2 style="color:#1e3a8a;">New Volunteer Application Received</h2>
      <p style="font-size:14px;color:#666;margin-bottom:16px;"><em>Submitted from: Become a Volunteer Page</em></p>
      
      <table style="width:100%;border-collapse:collapse;font-size:14px;margin-top:20px;">
        <tr style="background:#f8fafc;">
          <td style="padding:10px;border:1px solid #e5e7eb;font-weight:600;width:200px;">Reference</td>
          <td style="padding:10px;border:1px solid #e5e7eb;"><b style="color:#1e3a8a;">{reference}</b></td>
        </tr>
        <tr>
          <td style="padding:10px;border:1px solid #e5e7eb;font-weight:600;">Full Name</td>
          <td style="padding:10px;border:1px solid #e5e7eb;">{name}</td>
        </tr>
        <tr style="background:#f8fafc;">
          <td style="padding:10px;border:1px solid #e5e7eb;font-weight:600;">Age</td>
          <td style="padding:10px;border:1px solid #e5e7eb;">{age}</td>
        </tr>
        <tr>
          <td style="padding:10px;border:1px solid #e5e7eb;font-weight:600;">Email</td>
          <td style="padding:10px;border:1px solid #e5e7eb;"><a href="mailto:{email}">{email}</a></td>
        </tr>
        <tr style="background:#f8fafc;">
          <td style="padding:10px;border:1px solid #e5e7eb;font-weight:600;">Phone/WhatsApp</td>
          <td style="padding:10px;border:1px solid #e5e7eb;"><a href="tel:{contact}">{contact}</a></td>
        </tr>
        <tr>
          <td style="padding:10px;border:1px solid #e5e7eb;font-weight:600;">Location</td>
          <td style="padding:10px;border:1px solid #e5e7eb;">{location}</td>
        </tr>
        <tr style="background:#f8fafc;">
          <td style="padding:10px;border:1px solid #e5e7eb;font-weight:600;">Languages</td>
          <td style="padding:10px;border:1px solid #e5e7eb;">{languages}</td>
        </tr>
        <tr>
          <td style="padding:10px;border:1px solid #e5e7eb;font-weight:600;">Occupation</td>
          <td style="padding:10px;border:1px solid #e5e7eb;">{occupation}</td>
        </tr>
        <tr style="background:#f8fafc;">
          <td style="padding:10px;border:1px solid #e5e7eb;font-weight:600;">Emergency Contact</td>
          <td style="padding:10px;border:1px solid #e5e7eb;">{emergency_contact}</td>
        </tr>
        <tr>
          <td style="padding:10px;border:1px solid #e5e7eb;font-weight:600;vertical-align:top;">Areas of Help</td>
          <td style="padding:10px;border:1px solid #e5e7eb;">{areas_list}</td>
        </tr>
        <tr style="background:#f8fafc;">
          <td style="padding:10px;border:1px solid #e5e7eb;font-weight:600;vertical-align:top;">Availability</td>
          <td style="padding:10px;border:1px solid #e5e7eb;">{availability_list}</td>
        </tr>
        <tr>
          <td style="padding:10px;border:1px solid #e5e7eb;font-weight:600;vertical-align:top;">Skills/Qualifications</td>
          <td style="padding:10px;border:1px solid #e5e7eb;white-space:pre-line;">{experience}</td>
        </tr>
        <tr style="background:#f8fafc;">
          <td style="padding:10px;border:1px solid #e5e7eb;font-weight:600;vertical-align:top;">Motivation</td>
          <td style="padding:10px;border:1px solid #e5e7eb;white-space:pre-line;">{motivation}</td>
        </tr>
        <tr>
          <td style="padding:10px;border:1px solid #e5e7eb;font-weight:600;vertical-align:top;">References</td>
          <td style="padding:10px;border:1px solid #e5e7eb;white-space:pre-line;">{references}</td>
        </tr>
        {f'<tr style="background:#f8fafc;"><td style="padding:10px;border:1px solid #e5e7eb;font-weight:600;vertical-align:top;">Attachments</td><td style="padding:10px;border:1px solid #e5e7eb;">{attachments_html}</td></tr>' if attachments_html else ''}
      </table>
      
      <p style="margin-top:20px;color:#666;">Please review and contact the applicant for next steps.</p>
      <hr style="margin:24px 0 18px 0;border:none;border-top:1px solid #eee;">
      <p style="color:#888;font-size:13px;">HE CARES FOUNDATION - Volunteer Management</p>
    </div>
    """
    
    admin_body_text = f"""[From Volunteer Page] New Volunteer Application

Reference: {reference}
Name: {name}
Age: {age}
Email: {email}
Phone: {contact}
Location: {location}
Languages: {languages}
Occupation: {occupation}
Emergency Contact: {emergency_contact}
Areas of Help: {areas_list}
Availability: {availability_list}

Skills/Qualifications:
{experience}

Motivation:
{motivation}

References:
{references}

Please review and contact the applicant for next steps.

HE CARES FOUNDATION - Volunteer Management
"""
    
    admin_msg.set_content(admin_body_text)
    admin_msg.add_alternative(admin_body_html, subtype='html')
    
    # Attach files to admin email
    if attachments:
        for att_bytes, att_filename, att_content_type in attachments:
            try:
                maintype, subtype = att_content_type.split('/', 1)
                admin_msg.add_attachment(
                    att_bytes,
                    maintype=maintype,
                    subtype=subtype,
                    filename=att_filename
                )
            except Exception as e:
                print(f"Attachment error: {e}")
    
    # Email to volunteer applicant
    applicant_msg = EmailMessage()
    applicant_msg["Subject"] = f"HE CARES FOUNDATION - Thank You for Volunteering [{reference}]"
    applicant_msg["From"] = EMAIL_FROM
    applicant_msg["To"] = email
    applicant_msg["Reply-To"] = EMAIL_TO
    
    applicant_body_html = f"""
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;border:1px solid #e9e9e9;padding:30px;">
      <h2 style="color:#1e3a8a;margin-bottom:12px;">Thank You for Your Volunteer Application!</h2>
      <p style="font-size:16px;">Dear <b>{name}</b>,</p>
      <p style="font-size:15px;">Thank you for applying to volunteer with HE CARES FOUNDATION. Your willingness to make a difference is truly appreciated!</p>
      
      <div style="background:#f8fafc;border-radius:7px;padding:20px;margin:20px 0;border:1px solid #e3e7ee;">
        <div style="font-size:15px;"><b>Application Summary:</b></div>
        <table style="width:100%;margin-top:12px;font-size:14px;">
          <tr>
            <td style="padding:6px 0;color:#666;width:180px;">Reference:</td>
            <td style="padding:6px 0;"><b style="color:#1e3a8a;">{reference}</b></td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#666;">Name:</td>
            <td style="padding:6px 0;">{name}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#666;">Email:</td>
            <td style="padding:6px 0;">{email}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#666;">Contact:</td>
            <td style="padding:6px 0;">{contact}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#666;vertical-align:top;">Areas of Interest:</td>
            <td style="padding:6px 0;">{areas_list}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#666;vertical-align:top;">Availability:</td>
            <td style="padding:6px 0;">{availability_list}</td>
          </tr>
        </table>
      </div>
      
      <div style="background:#d1fae5;border-left:4px solid #10b981;padding:15px;margin:20px 0;">
        <p style="margin:0;font-size:15px;"><b>What Happens Next?</b></p>
        <ul style="margin:8px 0 0 0;padding-left:20px;font-size:14px;">
          <li>Our team will review your application within 5-7 business days</li>
          <li>You'll receive an email with next steps and orientation details</li>
          <li>We may contact you for a brief interview or screening</li>
        </ul>
      </div>
      
      <p style="font-size:15px;">Please keep your reference number: <b style="color:#1e3a8a;">{reference}</b></p>
      <p style="font-size:15px;margin-top:20px;">With gratitude,<br><b>HE CARES FOUNDATION Team</b><br>
      <small>Contact: {FOUNDATION_PHONE}</small></p>
      
      <hr style="margin:24px 0 18px 0;border:none;border-top:1px solid #eee;">
      <p style="color:#888;font-size:13px;">Questions? Contact us at {FOUNDATION_PHONE} or reply to this email.</p>
    </div>
    """
    
    applicant_body_text = f"""Dear {name},

Thank you for applying to volunteer with HE CARES FOUNDATION!

Application Summary:
Reference: {reference}
Name: {name}
Email: {email}
Contact: {contact}
Areas of Interest: {areas_list}
Availability: {availability_list}

What Happens Next?
- Our team will review your application within 5-7 business days
- You'll receive an email with next steps and orientation details
- We may contact you for a brief interview or screening

Please keep your reference number: {reference}

With gratitude,
HE CARES FOUNDATION Team
Contact: {FOUNDATION_PHONE}

Questions? Contact us at {FOUNDATION_PHONE}
"""
    
    applicant_msg.set_content(applicant_body_text)
    applicant_msg.add_alternative(applicant_body_html, subtype='html')
    
    # Send emails (mocked if credentials not available)
    if not EMAIL_USER or not EMAIL_PASS:
        print(f"[MOCK EMAIL] Volunteer application confirmation sent to {name} ({email}) - Reference: {reference}")
        print(f"[MOCK EMAIL] Admin notified of volunteer application")
        return
    
    try:
        with smtplib.SMTP(EMAIL_HOST, EMAIL_PORT, timeout=30) as smtp:
            smtp.starttls()
            smtp.login(EMAIL_USER, EMAIL_PASS)
            smtp.send_message(admin_msg)
            smtp.send_message(applicant_msg)
        print(f"Volunteer application emails sent successfully - Reference: {reference}")
    except Exception as e:
        print(f"Email sending error: {e}")
