import google.generativeai as genai
import os

API_KEY = os.getenv("GEMINI_API_KEY")

# Configure the SDK
genai.configure(api_key=API_KEY)

# Initialize the model (do this once)
model = genai.GenerativeModel('gemini-2.0-flash')

def generate_content(prompt, temperature=0.7):
    # Generate content using the model
    response = model.generate_content(
        prompt,
        generation_config={
            'temperature': temperature,
        }
    )
    # Make sure we return just the text content
    return response.text if hasattr(response, 'text') else str(response)