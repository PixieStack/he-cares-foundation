from dotenv import load_dotenv
import os
import smtplib
from email.message import EmailMessage

# Load .env file
load_dotenv()

EMAIL_TO = os.getenv("EMAIL_TO", "admin@hecaresfoundation.org")
EMAIL_FROM = "no-reply@hecaresfoundation.org"
EMAIL_HOST = os.getenv("EMAIL_HOST", "smtp.gmail.com")
EMAIL_PORT = int(os.getenv("EMAIL_PORT", "587"))
EMAIL_USER = os.getenv("EMAIL_USER")
EMAIL_PASS = os.getenv("EMAIL_PASS")

def send_contact_email(
    name, email, topic, message, phone,
    attachments,  # List of tuples: (att_bytes, att_filename, att_content_type)
    reference
):
    admin_msg = EmailMessage()
    admin_msg["Subject"] = f"{topic}: {name} Reference : {reference}"
    admin_msg["From"] = EMAIL_FROM
    admin_msg["To"] = EMAIL_TO
    admin_msg["Reply-To"] = EMAIL_FROM

    attachments_list_html = ""
    attachments_list_text = ""
    if attachments and len(attachments) > 0:
        attachments_list_html = "<ul style='margin:7px 0 0 0;'>"
        for _, filename, _ in attachments:
            attachments_list_html += f"<li>{filename}</li>"
        attachments_list_html += "</ul>"
        attachments_list_text = "\nAttachments:\n" + "\n".join([filename for _, filename, _ in attachments])
    
    admin_body_html = f"""
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;border:1px solid #e9e9e9;padding:30px;">
      <h2 style="color:#1967d2;margin-bottom:12px;">New Contact Form Submission</h2>
      <p style="font-size:16px;">You have received a new message through the foundation website.</p>
      <table style="width:100%;border-collapse:collapse;font-size:15px;">
        <tr>
          <td style="padding:8px 0;width:140px;color:#666;">Reference:</td>
          <td style="padding:8px 0;"><b style="font-size:17px;color:#1967d2;">{reference}</b></td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#666;">Name:</td>
          <td style="padding:8px 0;">{name}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#666;">Email:</td>
          <td style="padding:8px 0;">{email}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#666;">Topic:</td>
          <td style="padding:8px 0;">{topic}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#666;">Phone:</td>
          <td style="padding:8px 0;">{phone or 'N/A'}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#666;vertical-align:top;">Message:</td>
          <td style="padding:8px 0;white-space:pre-line;">{message}</td>
        </tr>
        {"<tr><td style='padding:8px 0;color:#666;vertical-align:top;'>Attachments:</td><td style='padding:8px 0;'>" + attachments_list_html + "</td></tr>" if attachments_list_html else ""}
      </table>
      <hr style="margin:24px 0 18px 0;border:none;border-top:1px solid #eee;">
      <p style="color:#888;font-size:13px;">Sent via HE CARES FOUNDATION website contact form.<br>
      <b>Please do not reply to this email. This mailbox is not monitored.</b></p>
    </div>
    """

    admin_body_text = f"""You have received a new contact form submission:

Reference: {reference}
Name: {name}
Email: {email}
Topic: {topic}
Phone: {phone or 'N/A'}
Message:
{message}
{attachments_list_text if attachments_list_text else ""}

Please do not reply to this email. This mailbox is not monitored.
"""

    admin_msg.set_content(admin_body_text)
    admin_msg.add_alternative(admin_body_html, subtype='html')

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
                print("Attachment error:", e)

    ack_msg = EmailMessage()
    ack_msg["Subject"] = f"HE CARES FOUNDATION – We Received Your Inquiry [{reference}]"
    ack_msg["From"] = EMAIL_FROM
    ack_msg["To"] = email
    ack_msg["Reply-To"] = EMAIL_FROM

    ack_body_html = f"""
    <div style="font-family:Arial,sans-serif;max-width:540px;margin:auto;border:1px solid #e9e9e9;padding:28px;">
      <p style="font-size:16px;margin-bottom:1.7em;">Dear <b>{name}</b>,</p>
      <p style="font-size:15px;margin-bottom:1.6em;">
        Thank you for contacting <b>HE CARES FOUNDATION</b>. We have received your inquiry and will respond to you as soon as possible.
      </p>
      <p style="font-size:15px;margin-bottom:0.7em;">
        <b>Your reference number is:</b>
        <span style="color:#1967d2; font-size:16px; font-weight:700;">{reference}</span>
      </p>
      <div style="background:#f8fafc;border-radius:7px;padding:13px 19px;margin-bottom:1.7em;border:1px solid #e3e7ee;">
        <div style="font-size:15px;"><b>Summary of your message:</b></div>
        <div style="font-size:15px;margin:10px 0 0 0;">
          <b>Topic:</b> {topic}<br>
          <b>Message:</b> <span style="white-space:pre-line;">{message}</span>
        </div>
      </div>
      <p style="font-size:15px;margin-bottom:2.1em;">
        Please keep this reference number for future correspondence.
      </p>
      <p style="font-size:15px;">Sincerely,<br>HE CARES FOUNDATION Team</p>
      <hr style="margin:24px 0 18px 0;border:none;border-top:1px solid #eee;">
      <p style="color:#888;font-size:13px;">
        Please do not reply to this email. This mailbox is not monitored.
      </p>
    </div>
    """
    ack_body_text = f"""Dear {name},

Thank you for contacting HE CARES FOUNDATION. We have received your inquiry and will respond to you as soon as possible.

Your reference number is: {reference}

Summary of your message:

Topic: {topic}

Message: {message}

Please keep this reference number for future correspondence.

Sincerely,
HE CARES FOUNDATION Team

Please do not reply to this email. This mailbox is not monitored.
"""

    ack_msg.set_content(ack_body_text)
    ack_msg.add_alternative(ack_body_html, subtype='html')

    if not EMAIL_USER or not EMAIL_PASS:
        print("EMAIL_USER or EMAIL_PASS not set. Cannot send email.")
        return

    try:
        with smtplib.SMTP(EMAIL_HOST, EMAIL_PORT) as smtp:
            smtp.starttls()
            smtp.login(EMAIL_USER, EMAIL_PASS)
            smtp.send_message(admin_msg)
            smtp.send_message(ack_msg)
    except Exception as e:
        print("Email sending error:", e)