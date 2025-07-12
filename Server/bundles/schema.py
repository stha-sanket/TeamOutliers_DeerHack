from pydantic import BaseModel, Field
from typing import List


class QuizItemSchema(BaseModel):
    question: str = Field(
        description="The text of the quiz question that the student needs to answer."
    )
    options: List[str] = Field(
        description="A list of possible answer choices for the question. "
                    "For multiple-choice questions, provide all options here."
    )
    correct_answer: int = Field(
        description="The zero-based index indicating which option in 'options' is the correct answer."
    )


class QuizSchema(BaseModel):
    questions: List[QuizItemSchema] = Field(
        description="A list of quiz items, each representing a question with possible answers and the correct answer index."
    )
