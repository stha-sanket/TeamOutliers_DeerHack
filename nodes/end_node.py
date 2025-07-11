from state import LearningState
from datetime import datetime

def end_node(state: LearningState) -> LearningState:
    state.sessions_completed += 1
    if state.topic not in state.topics_mastered:
        state.topics_mastered.append(state.topic)

    state.user_behavior_log.append({
        "message": f"Completed lesson on '{state.topic}'",
        "step": "end_node",
        "timestamp": datetime.utcnow().isoformat()
    })
    return state
