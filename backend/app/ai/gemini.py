import google.generativeai as genai

from app.core.config import settings

# Configure Gemini
genai.configure(api_key=settings.GEMINI_API_KEY)

# Create model instance
model = genai.GenerativeModel("gemini-2.5-flash")