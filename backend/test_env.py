from dotenv import load_dotenv
import os

load_dotenv(dotenv_path="C:/Users/thwal/Desktop/Portfolio/he-cares-foundation/backend/.env")
print("EMAIL_USER:", os.getenv("EMAIL_USER"))
print("EMAIL_PASS:", os.getenv("EMAIL_PASS"))
print("CWD:", os.getcwd())