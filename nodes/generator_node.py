from state import LearningState
from llm.gemini_chain import lesson_chain

def generator_node(state: LearningState) -> LearningState:
    try:
        vars = {
            "name": state.name,
            "age": state.age,
            "class_level": state.class_level,
            "subject": state.subject,
            "topic": state.topic,
            "concepts": ", ".join(state.extracted_concepts or []),
            "context": "\n".join(state.retrieved_chunks or [])
        }

        result = lesson_chain.invoke(vars)
        state.generated_content = str(result) if result is not None else "No content generated"
        state.user_behavior_log.append({
            "action": "content_generation",
            "status": "success",
            "details": "Content generated successfully"
        })
    except Exception as e:
        state.generated_content = f"Error generating content: {str(e)}"
        state.user_behavior_log.append({
            "action": "content_generation",
            "status": "error",
            "details": str(e)
        })

    return state
