from langchain_core.messages import SystemMessage
from langchain_core.prompts import PromptTemplate

CHATBOT_INITIALIZER_SYSTEM_PROMPT = SystemMessage(content="""Answer my questions.""")


class ContentCreatorTemplate(PromptTemplate):
    def __init__(self):
        super().__init__(
            template="""
You are an expert content creator specializing in the NEB board curriculum. Your task is to write a detailed, accurate, and well-structured article on the topic provided.

Before writing:
- If the topic requires context, background, or factual accuracy, **research the topic thoroughly** using reliable sources.
- Ensure all key concepts, explanations, and examples align with the NEB syllabus standards.

---
Topic:
{content}
---

Important instructions:
- Do **not** include any preamble or explanation before the article.
- The response must be polished, informative, and ready for publication.
- Avoid generic filler—focus on clarity, structure, and real value for NEB students.
""",
            input_vars=["content"]
        )

class QuizCreatorTemplate(PromptTemplate):
    def __init__(self):
        super().__init__(
            template="""
You are an expert NEB curriculum content creator. Your task is to generate a set of well-structured, curriculum-aligned quiz questions based on the given content.

---
Content:
{content}
---

Instructions:
- Create **5 to 10** quiz questions depending on content length.
- Use a mix of **multiple choice (MCQs)**, **fill-in-the-blanks**, and **short answer questions**.
- Ensure all questions are factually accurate and reflect the NEB syllabus.
- For MCQs, always provide **4 options** with **one correct answer marked clearly**.
- Keep the language clear, academic, and suitable for NEB Grade 11/12 students.
- Do **not** include any preamble or explanation outside the quiz.
""",
            input_vars=["content"]
        )