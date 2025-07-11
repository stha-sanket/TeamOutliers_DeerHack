from state import LearningState
from llm.gemini_chain import lesson_chain
from utils.logger import logger

def content_type_extractor_node(state: LearningState) -> LearningState:
    logger.info("Extracting core concepts from topic...")

    try:
        prompt_vars = {
            "name": state.name,
            "age": state.age,
            "class_level": state.class_level,
            "subject": state.subject,
            "topic": state.topic,
            "concepts": "",
            "context": f"Extract 3 core concepts from topic: {state.topic}"
        }

        concepts_text = str(lesson_chain.invoke(prompt_vars))
        state.extracted_concepts = [c.strip() for c in concepts_text.split(",") if c.strip()]

        logger.info(f"Extracted concepts: {', '.join(state.extracted_concepts)}")
    except Exception as e:
        logger.error(f"Error extracting concepts: {str(e)}")
        state.extracted_concepts = []

    return state