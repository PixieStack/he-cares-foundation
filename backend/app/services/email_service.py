import os
import smtplib
from email.message import EmailMessage

def send_email_message(email_msg: EmailMessage, host: str, port: int, user: str, password: str):
    try:
        with smtplib.SMTP(host, port) as smtp:
            smtp.starttls()
            smtp.login(user, password)
            smtp.send_message(email_msg)
    except Exception as e:
        print("Email sending error:", e)