from state import LearningState
from llm.gemini_chain import lesson_chain

def content_type_extractor_node(state: LearningState) -> LearningState:
    prompt_vars = {
        "name": state.name,
        "age": state.age,
        "class_level": state.class_level,
        "subject": state.subject,
        "topic": state.topic,
        "concepts": "",        # Empty here, since this node extracts concepts
        "context": f"Extract 3 core concepts from topic: {state.topic}"
    }

    concepts_text = lesson_chain.invoke(prompt_vars)
    state.extracted_concepts = [c.strip() for c in concepts_text.split(",") if c.strip()]
    return state
