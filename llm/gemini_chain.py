import google.generativeai as genai
import os
from typing import Dict, Any
from langchain_core.runnables import RunnablePassthrough

# Configure Gemini
api_key = os.getenv('GOOGLE_API_KEY')
if not api_key:
    raise ValueError("GOOGLE_API_KEY environment variable is not set")

genai.configure(api_key=api_key)
model = genai.GenerativeModel('gemini-2.0-flash')  # Changed to gemini-pro as gemini-2.0-flash is not a valid model name

def gemini_model(prompt_vars: Dict[str, Any]) -> str:
    """
    Process the prompt variables and generate content using Gemini
    """
    try:
        # Create a formatted prompt from the variables
        prompt = f"""
        You are a tutor for a Class {prompt_vars['class_level']} student named {prompt_vars['name']}, age {prompt_vars['age']}.

        Subject: {prompt_vars['subject']}
        Topic: {prompt_vars['topic']}
        Concepts: {prompt_vars['concepts']}

        Use this context to teach clearly:

        {prompt_vars['context']}

        Limit: ~300 words.
        """

        # Generate content using Gemini
        response = model.generate_content(prompt)
        
        # Return the text response
        return response.text.strip()
        
    except Exception as e:
        return f"Error generating content: {str(e)}"

# Create a chain that can be used in the LangGraph
lesson_chain = RunnablePassthrough() | gemini_model