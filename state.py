from typing import List, Optional, Dict
from pydantic import BaseModel

class LearningState(BaseModel):
    name: str
    age: int
    class_level: str
    subject: str
    topic: str

    extracted_concepts: Optional[List[str]] = None
    retrieved_chunks: Optional[List[str]] = None
    generated_content: Optional[str] = None

    topics_mastered: List[str] = []
    sessions_completed: int = 0

    user_behavior_log: List[Dict] = []
