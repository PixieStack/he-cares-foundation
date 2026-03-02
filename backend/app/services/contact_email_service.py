from dotenv import load_dotenv
import os
import smtplib
from email.message import EmailMessage

# Load .env file
load_dotenv()

EMAIL_TO = os.getenv("EMAIL_TO", "thembinkosithwala16@gmail.com")
EMAIL_FROM = os.getenv("EMAIL_FROM", "thembinkosithwala16@gmail.com")
EMAIL_HOST = os.getenv("EMAIL_HOST", "smtp-relay.brevo.com")
EMAIL_PORT = int(os.getenv("EMAIL_PORT", "587"))
EMAIL_USER = os.getenv("EMAIL_USER")
EMAIL_PASS = os.getenv("EMAIL_PASS")
FOUNDATION_PHONE = os.getenv("FOUNDATION_PHONE", "0681263127")


def send_contact_email(
    name, email, topic, message, phone,
    attachments,  # List of tuples: (att_bytes, att_filename, att_content_type)
    reference
):
    admin_msg = EmailMessage()
    admin_msg["Subject"] = f"[From Contact Page] {topic}: {name} - Ref: {reference}"
    admin_msg["From"] = EMAIL_FROM
    admin_msg["To"] = EMAIL_TO
    admin_msg["Reply-To"] = email

    attachments_list_html = ""
    attachments_list_text = ""
    if attachments and len(attachments) > 0:
        attachments_list_html = "<ul style='margin:7px 0 0 0;'>"
        for _, filename, _ in attachments:
            attachments_list_html += f"<li>{filename}</li>"
        attachments_list_html += "</ul>"
        attachments_list_text = "\nAttachments:\n" + "\n".join(
            [filename for _, filename, _ in attachments]
        )

    admin_body_html = f"""
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;border:1px solid #e9e9e9;padding:30px;">
      <div style="background-color:#2c7a4b;padding:20px;text-align:center;border-radius:6px 6px 0 0;">
        <h1 style="color:white;margin:0;">He Cares Foundation</h1>
        <p style="color:#c8f5da;margin:5px 0 0;">New Contact Form Submission</p>
      </div>
      <div style="padding:24px;">
        <h2 style="color:#2c7a4b;margin-bottom:12px;">New Contact Form Submission</h2>
        <p style="font-size:14px;color:#666;margin-bottom:16px;"><em>Submitted from: Contact Page</em></p>
        <table style="width:100%;border-collapse:collapse;font-size:15px;">
          <tr style="background:#f8fafc;">
            <td style="padding:10px;border:1px solid #e5e7eb;font-weight:600;width:140px;">Reference:</td>
            <td style="padding:10px;border:1px solid #e5e7eb;">
              <b style="font-size:17px;color:#2c7a4b;">{reference}</b>
            </td>
          </tr>
          <tr>
            <td style="padding:10px;border:1px solid #e5e7eb;font-weight:600;">Name:</td>
            <td style="padding:10px;border:1px solid #e5e7eb;">{name}</td>
          </tr>
          <tr style="background:#f8fafc;">
            <td style="padding:10px;border:1px solid #e5e7eb;font-weight:600;">Email:</td>
            <td style="padding:10px;border:1px solid #e5e7eb;">
              <a href="mailto:{email}">{email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding:10px;border:1px solid #e5e7eb;font-weight:600;">Topic:</td>
            <td style="padding:10px;border:1px solid #e5e7eb;">{topic}</td>
          </tr>
          <tr style="background:#f8fafc;">
            <td style="padding:10px;border:1px solid #e5e7eb;font-weight:600;">Phone:</td>
            <td style="padding:10px;border:1px solid #e5e7eb;">{phone or 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding:10px;border:1px solid #e5e7eb;font-weight:600;vertical-align:top;">Message:</td>
            <td style="padding:10px;border:1px solid #e5e7eb;white-space:pre-line;">{message}</td>
          </tr>
          {"<tr style='background:#f8fafc;'><td style='padding:10px;border:1px solid #e5e7eb;font-weight:600;vertical-align:top;'>Attachments:</td><td style='padding:10px;border:1px solid #e5e7eb;'>" + attachments_list_html + "</td></tr>" if attachments_list_html else ""}
        </table>
      </div>
      <div style="background:#f0f0f0;padding:12px;text-align:center;font-size:12px;color:#888;">
        He Cares Foundation &copy; 2026 | South Africa | {FOUNDATION_PHONE}
      </div>
    </div>
    """

    admin_body_text = f"""[From Contact Page] New Contact Form Submission

Reference: {reference}
Name: {name}
Email: {email}
Topic: {topic}
Phone: {phone or 'N/A'}
Message:
{message}
{attachments_list_text if attachments_list_text else ""}

Sent via HE CARES FOUNDATION website contact form.
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

    # Acknowledgment email to sender
    ack_msg = EmailMessage()
    ack_msg["Subject"] = f"HE CARES FOUNDATION - We Received Your Inquiry [{reference}]"
    ack_msg["From"] = EMAIL_FROM
    ack_msg["To"] = email
    ack_msg["Reply-To"] = EMAIL_TO

    ack_body_html = f"""
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;border:1px solid #e9e9e9;">
      <div style="background-color:#2c7a4b;padding:20px;text-align:center;">
        <h1 style="color:white;margin:0;">He Cares Foundation</h1>
        <p style="color:#c8f5da;margin:5px 0 0;">Message Received</p>
      </div>
      <div style="padding:28px;">
        <p style="font-size:16px;">Dear <b>{name}</b>,</p>
        <p style="font-size:15px;">
          Thank you for contacting <b>HE CARES FOUNDATION</b>. 
          We have received your inquiry and will respond as soon as possible.
        </p>
        <div style="background:#f8fafc;border-radius:7px;padding:20px;margin:20px 0;border:1px solid #e3e7ee;">
          <div style="font-size:15px;"><b>Your Reference Number:</b></div>
          <div style="font-size:22px;color:#2c7a4b;font-weight:700;margin-top:8px;">{reference}</div>
        </div>
        <table style="width:100%;border-collapse:collapse;font-size:15px;">
          <tr style="background:#f8fafc;">
            <td style="padding:10px;border:1px solid #e5e7eb;font-weight:600;width:140px;">Topic:</td>
            <td style="padding:10px;border:1px solid #e5e7eb;">{topic}</td>
          </tr>
          <tr>
            <td style="padding:10px;border:1px solid #e5e7eb;font-weight:600;vertical-align:top;">Message:</td>
            <td style="padding:10px;border:1px solid #e5e7eb;white-space:pre-line;">{message}</td>
          </tr>
        </table>
        <p style="font-size:15px;margin-top:20px;">
          Please keep your reference number 
          <strong style="color:#2c7a4b">{reference}</strong> 
          for future correspondence. Our team typically responds within 2-5 business days.
        </p>
        <p style="font-size:15px;">
          Warm regards,<br/>
          <b>He Cares Foundation Team</b><br/>
          <small>Contact: {FOUNDATION_PHONE}</small>
        </p>
      </div>
      <div style="background:#f0f0f0;padding:12px;text-align:center;font-size:12px;color:#888;">
        He Cares Foundation &copy; 2026 | South Africa<br/>
        For urgent matters, please call us at {FOUNDATION_PHONE}
      </div>
    </div>
    """

    ack_body_text = f"""Dear {name},

Thank you for contacting HE CARES FOUNDATION. We have received your inquiry 
and will respond to you as soon as possible.

Your Reference Number: {reference}

Summary:
Topic: {topic}
Message: {message}

Please keep this reference number for future correspondence.
Our team typically responds within 2-5 business days.

Warm regards,
He Cares Foundation Team
Contact: {FOUNDATION_PHONE}

For urgent matters, please call us at {FOUNDATION_PHONE}.
"""

    ack_msg.set_content(ack_body_text)
    ack_msg.add_alternative(ack_body_html, subtype='html')

    if not EMAIL_USER or not EMAIL_PASS:
        print("EMAIL_USER or EMAIL_PASS not set. Cannot send email.")
        return

    try:
        with smtplib.SMTP(EMAIL_HOST, EMAIL_PORT, timeout=30) as smtp:
            smtp.starttls()
            smtp.login(EMAIL_USER, EMAIL_PASS)
            smtp.send_message(admin_msg)
            smtp.send_message(ack_msg)
        print(f"Contact emails sent successfully - Reference: {reference}")
    except Exception as e:
        print("Email sending error:", e)