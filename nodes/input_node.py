from state import LearningState
from utils.logger import logger

def input_node(state: LearningState) -> LearningState:
    logger.info(f"Starting new learning session for {state.name}")
    logger.info(f"Topic: {state.subject} - {state.topic}")
    return state
