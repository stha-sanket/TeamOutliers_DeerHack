from state import LearningState
from llm.gemini_chain import lesson_chain
from utils.logger import logger

def generator_node(state: LearningState) -> LearningState:
    try:
        logger.info("Generating personalized lesson content...")
        vars = {
            "name": state.name,
            "age": state.age,
            "class_level": state.class_level,
            "subject": state.subject,
            "topic": state.topic,
            "concepts": ", ".join(state.extracted_concepts or []),
            "context": "\n".join(state.retrieved_chunks or [])
        }

        logger.info(f"Using {len(state.retrieved_chunks or [])} context chunks for generation")
        result = lesson_chain.invoke(vars)
        state.generated_content = str(result) if result is not None else "No content generated"

        logger.info("Content generation completed successfully")
        logger.debug(f"Generated content preview: {state.generated_content[:100]}...")

        state.user_behavior_log.append({
            "action": "content_generation",
            "status": "success",
            "details": "Content generated successfully"
        })
    except Exception as e:
        error_msg = f"Error generating content: {str(e)}"
        logger.error(error_msg)
        state.generated_content = error_msg
        state.user_behavior_log.append({
            "action": "content_generation",
            "status": "error",
            "details": str(e)
        })

    return state
