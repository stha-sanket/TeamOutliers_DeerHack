import os
from state import LearningState
from graph import compiled

def init():
    """Initialize environment and verify requirements"""
    if not os.getenv('GOOGLE_API_KEY'):
        raise ValueError("GOOGLE_API_KEY environment variable is not set")

def main():
    # Initialize environment and verify setup
    init()

    try:
        # Initialize input state
        initial_state = LearningState(
            name="Dyane Master",
            age=22,
            class_level="11",
            subject="Mathematics",
            topic="Chain Rule"
        )

        # Run the workflow
        result_state = compiled(initial_state)

        # Display results
        print("\n=== Generated Lesson Content ===")
        print(result_state.generated_content)

        print("\n=== Learning Session Summary ===")
        print(f"Topic: {result_state.topic}")
        print(f"Concepts Covered: {', '.join(result_state.extracted_concepts or [])}")
        print(f"Total Sessions: {result_state.sessions_completed}")
        print(f"Topics Mastered: {', '.join(result_state.topics_mastered)}")

        print("\n=== Session Log ===")
        for entry in result_state.user_behavior_log:
            if isinstance(entry, dict):
                action = entry.get('action', 'unknown')
                status = entry.get('status', 'unknown')
                print(f"- {action}: {status}")

    except Exception as e:
        print(f"\nError during execution: {str(e)}")
        raise

if __name__ == "__main__":
    main()