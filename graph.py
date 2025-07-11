from langgraph.graph import StateGraph
from langchain_core.runnables import RunnableLambda
from state import LearningState
from typing import Dict, Any

from nodes.input_node import input_node
from nodes.content_type_extractor_node import content_type_extractor_node
from nodes.retriever_node import retriever_node
from nodes.generator_node import generator_node
from nodes.end_node import end_node

def dict_to_learning_state(state_dict: Dict[str, Any]) -> LearningState:
    """Convert a dictionary back to a LearningState object"""
    if isinstance(state_dict, LearningState):
        return state_dict
    return LearningState(**state_dict)

# Create the graph with LearningState
workflow = StateGraph(LearningState)

# Add nodes with state conversion
workflow.add_node("input", RunnableLambda(input_node))
workflow.add_node("content_type_extractor", RunnableLambda(content_type_extractor_node))
workflow.add_node("retriever", RunnableLambda(retriever_node))
workflow.add_node("generator", RunnableLambda(generator_node))
workflow.add_node("end", RunnableLambda(end_node))

# Set the entry point
workflow.set_entry_point("input")

# Add edges to create the workflow
workflow.add_edge("input", "content_type_extractor")
workflow.add_edge("content_type_extractor", "retriever")
workflow.add_edge("retriever", "generator")
workflow.add_edge("generator", "end")

# Compile the graph and wrap it to ensure proper state handling
graph_execution = workflow.compile()

def run_workflow(state: LearningState) -> LearningState:
    """Execute the workflow and ensure proper state conversion"""
    result = graph_execution.invoke(state)
    return dict_to_learning_state(result)

# Export the wrapped execution
compiled = run_workflow
