from langchain_core.prompts import PromptTemplate
from llm.gemini_client import generate_content

lesson_prompt = PromptTemplate.from_template("""
You are a tutor for a Class {class_level} student named {name}, age {age}.

Subject: {subject}
Topic: {topic}
Concepts: {concepts}

Use this context to teach clearly:

{context}

Limit: ~300 words.
""")

def gemini_model(prompt_dict):
    return generate_content(prompt_dict["prompt"], temperature=0.7)

lesson_chain = lesson_prompt | (lambda vars: {"prompt": lesson_prompt.format(**vars)}) | gemini_model
