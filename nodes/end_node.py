from state import LearningState
from datetime import datetime
from utils.logger import logger

def end_node(state: LearningState) -> LearningState:
    logger.info("Finalizing learning session...")

    # Update session stats
    state.sessions_completed += 1
    if state.topic not in state.topics_mastered:
        state.topics_mastered.append(state.topic)
        logger.info(f"New topic mastered: {state.topic}")

    logger.info(f"Total sessions completed: {state.sessions_completed}")
    logger.info(f"Total topics mastered: {len(state.topics_mastered)}")

    state.user_behavior_log.append({
        "action": "session_completion",
        "status": "success",
        "topic": state.topic,
        "total_sessions": state.sessions_completed,
        "mastered_topics": len(state.topics_mastered)
    })

    logger.info("Learning session completed successfully")
    return state
