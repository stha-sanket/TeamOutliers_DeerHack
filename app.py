from state import LearningState
from graph import compiled

def main():
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
