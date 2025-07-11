import os
from state import LearningState
from graph import compiled

def init():
    """Initialize environment and verify requirements"""
    # Check for required environment variables
    if not os.getenv('GOOGLE_API_KEY'):
        raise ValueError("GOOGLE_API_KEY environment variable is not set")

def main():
    # Initialize environment and verify setup
    init()

    # Initialize input state (example)
    state = LearningState(
        name="Dyane Master",
        age=22,
        class_level="11",
        subject="Mathematics",
        topic="Chain Rule"
    )

    # Run the full LangGraph pipeline
    result_state = compiled.invoke(state)

    print("\n--- Generated Lesson Content ---\n")
    print(result_state.generated_content)

    print("\n--- User Behavior Log ---")
    for log in result_state.user_behavior_log:
        print(log)

if __name__ == "__main__":
    main()