import os
import requests

API_KEY = os.getenv("GEMINI_API_KEY")
API_URL = "https://api.gemini.com/v1/generate"  # Replace with real endpoint

def generate_content(prompt, temperature=0.7):
    headers = {
        "Authorization": "Bearer " + API_KEY,
        "Content-Type": "application/json"
    }
    data = {"prompt": prompt, "temperature": temperature}
    res = requests.post(API_URL, json=data, headers=headers)
    res.raise_for_status()
    return res.json().get("text", "")
