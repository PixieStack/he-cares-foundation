from dotenv import load_dotenv
import os
import smtplib
from email.message import EmailMessage
from typing import List, Optional, Tuple

# Load .env file
load_dotenv()

EMAIL_TO = os.getenv("EMAIL_TO", "Godfreymalindisa@gmail.com")
EMAIL_FROM = os.getenv("EMAIL_FROM", "noreply@hecaresfoundation.org")
EMAIL_HOST = os.getenv("EMAIL_HOST", "smtp-relay.brevo.com")
EMAIL_PORT = int(os.getenv("EMAIL_PORT", "587"))
EMAIL_USER = os.getenv("EMAIL_USER")
EMAIL_PASS = os.getenv("EMAIL_PASS")
FOUNDATION_PHONE = os.getenv("FOUNDATION_PHONE", "0681263127")


def send_generic_form_email(
    form_source: str,
    form_data: dict,
    user_email: str,
    user_name: str,
    reference: str,
    attachments: Optional[List[Tuple[bytes, str, str]]] = None
):
    """
    Send email for any form submission.
    
    Args:
        form_source: The page/form name (e.g., "Educational Empowerment", "Crisis Support")
        form_data: Dictionary of form fields and values
        user_email: Email of the person submitting the form
        user_name: Name of the person submitting the form
        reference: Unique reference number
        attachments: Optional list of (bytes, filename, content_type) tuples
    """
    
    # Build the form data HTML table
    form_rows_html = ""
    form_rows_text = ""
    for key, value in form_data.items():
        if value and key not in ['email', 'name', 'files']:
            label = key.replace('_', ' ').title()
            if isinstance(value, list):
                value_str = ", ".join(str(v) for v in value)
            else:
                value_str = str(value)
            form_rows_html += f"""
            <tr>
              <td style="padding:8px 0;color:#666;vertical-align:top;width:180px;">{label}:</td>
              <td style="padding:8px 0;white-space:pre-line;">{value_str}</td>
            </tr>
            """
            form_rows_text += f"{label}: {value_str}\n"
    
    # Attachments info
    attachments_html = ""
    attachments_text = ""
    if attachments:
        attachments_html = "<ul style='margin:5px 0;'>"
        for _, filename, _ in attachments:
            attachments_html += f"<li>{filename}</li>"
        attachments_html += "</ul>"
        attachments_text = "Attachments: " + ", ".join([f[1] for f in attachments])
    
    # Admin notification email
    admin_msg = EmailMessage()
    admin_msg["Subject"] = f"[From {form_source}] New Submission - {user_name} - Ref: {reference}"
    admin_msg["From"] = EMAIL_FROM
    admin_msg["To"] = EMAIL_TO
    admin_msg["Reply-To"] = user_email
    
    admin_body_html = f"""
    <div style="font-family:Arial,sans-serif;max-width:700px;margin:auto;padding:20px;border:1px solid #e9e9e9;">
      <h2 style="color:#1e3a8a;margin-bottom:12px;">New Form Submission</h2>
      <p style="font-size:14px;color:#666;margin-bottom:16px;"><em>Submitted from: {form_source}</em></p>
      
      <table style="width:100%;border-collapse:collapse;font-size:14px;margin-top:20px;">
        <tr style="background:#f8fafc;">
          <td style="padding:10px;border:1px solid #e5e7eb;font-weight:600;width:180px;">Reference</td>
          <td style="padding:10px;border:1px solid #e5e7eb;"><b style="color:#1e3a8a;">{reference}</b></td>
        </tr>
        <tr>
          <td style="padding:10px;border:1px solid #e5e7eb;font-weight:600;">Name</td>
          <td style="padding:10px;border:1px solid #e5e7eb;">{user_name}</td>
        </tr>
        <tr style="background:#f8fafc;">
          <td style="padding:10px;border:1px solid #e5e7eb;font-weight:600;">Email</td>
          <td style="padding:10px;border:1px solid #e5e7eb;"><a href="mailto:{user_email}">{user_email}</a></td>
        </tr>
      </table>
      
      <h3 style="color:#1e3a8a;margin-top:20px;">Form Details:</h3>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        {form_rows_html}
        {f'<tr><td style="padding:8px 0;color:#666;vertical-align:top;">Attachments:</td><td style="padding:8px 0;">{attachments_html}</td></tr>' if attachments_html else ''}
      </table>
      
      <hr style="margin:24px 0 18px 0;border:none;border-top:1px solid #eee;">
      <p style="color:#888;font-size:13px;">HE CARES FOUNDATION</p>
    </div>
    """
    
    admin_body_text = f"""[From {form_source}] New Form Submission

Reference: {reference}
Name: {user_name}
Email: {user_email}

Form Details:
{form_rows_text}
{attachments_text}

HE CARES FOUNDATION
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
    
    # Acknowledgment email to user
    ack_msg = EmailMessage()
    ack_msg["Subject"] = f"HE CARES FOUNDATION - We Received Your Submission [{reference}]"
    ack_msg["From"] = EMAIL_FROM
    ack_msg["To"] = user_email
    ack_msg["Reply-To"] = EMAIL_TO
    
    ack_body_html = f"""
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;border:1px solid #e9e9e9;padding:30px;">
      <h2 style="color:#1e3a8a;margin-bottom:12px;">Thank You for Your Submission!</h2>
      <p style="font-size:16px;">Dear <b>{user_name}</b>,</p>
      <p style="font-size:15px;">Thank you for reaching out to HE CARES FOUNDATION via our <b>{form_source}</b> form. We have received your submission and will respond as soon as possible.</p>
      
      <div style="background:#f8fafc;border-radius:7px;padding:20px;margin:20px 0;border:1px solid #e3e7ee;">
        <div style="font-size:15px;"><b>Your Reference Number:</b></div>
        <div style="font-size:20px;color:#1e3a8a;font-weight:700;margin-top:8px;">{reference}</div>
      </div>
      
      <p style="font-size:15px;">Please keep this reference number for future correspondence. Our team typically responds within 2-5 business days.</p>
      
      <p style="font-size:15px;margin-top:20px;">With gratitude,<br><b>HE CARES FOUNDATION Team</b><br>
      <small>Contact: {FOUNDATION_PHONE}</small></p>
      
      <hr style="margin:24px 0 18px 0;border:none;border-top:1px solid #eee;">
      <p style="color:#888;font-size:13px;">For urgent matters, please call us at {FOUNDATION_PHONE}.</p>
    </div>
    """
    
    ack_body_text = f"""Dear {user_name},

Thank you for reaching out to HE CARES FOUNDATION via our {form_source} form. We have received your submission and will respond as soon as possible.

Your Reference Number: {reference}

Please keep this reference number for future correspondence. Our team typically responds within 2-5 business days.

With gratitude,
HE CARES FOUNDATION Team
Contact: {FOUNDATION_PHONE}

For urgent matters, please call us at {FOUNDATION_PHONE}.
"""
    
    ack_msg.set_content(ack_body_text)
    ack_msg.add_alternative(ack_body_html, subtype='html')
    
    # Send emails
    if not EMAIL_USER or not EMAIL_PASS:
        print(f"[MOCK EMAIL] Form submission notification sent for {form_source} - Reference: {reference}")
        print(f"[MOCK EMAIL] Acknowledgment sent to {user_email}")
        return
    
    try:
        with smtplib.SMTP(EMAIL_HOST, EMAIL_PORT, timeout=30) as smtp:
            smtp.starttls()
            smtp.login(EMAIL_USER, EMAIL_PASS)
            smtp.send_message(admin_msg)
            smtp.send_message(ack_msg)
        print(f"Form submission emails sent successfully - {form_source} - Reference: {reference}")
    except Exception as e:
        print(f"Email sending error: {e}")
