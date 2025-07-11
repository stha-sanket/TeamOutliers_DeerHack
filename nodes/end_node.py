from state import LearningState
from datetime import datetime

def end_node(state: LearningState) -> LearningState:
    state.sessions_completed += 1
    if state.topic not in state.topics_mastered:
        state.topics_mastered.append(state.topic)

    state.user_behavior_log.append({
        "action": "session_completion",
        "status": "success",
        "topic": state.topic,
        "total_sessions": state.sessions_completed,
        "mastered_topics": len(state.topics_mastered)
    })
    return state
