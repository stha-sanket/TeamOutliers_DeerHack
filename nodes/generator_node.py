from state import LearningState
from llm.gemini_chain import lesson_chain

def generator_node(state: LearningState) -> LearningState:
    vars = {
        "name": state.name,
        "age": state.age,
        "class_level": state.class_level,
        "subject": state.subject,
        "topic": state.topic,
        "concepts": ", ".join(state.extracted_concepts or []),
        "context": "\n".join(state.retrieved_chunks or [])
    }

    state.generated_content = lesson_chain.invoke(vars)
    return state
