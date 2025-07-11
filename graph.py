from langgraph.graph import StateGraph
from langchain_core.runnables import RunnableLambda
from state import LearningState

from nodes.input_node import input_node
from nodes.content_type_extractor_node import content_type_extractor_node
from nodes.retriever_node import retriever_node
from nodes.generator_node import generator_node
from nodes.end_node import end_node

graph = StateGraph(LearningState)

graph.add_node("input", RunnableLambda(input_node))
graph.add_node("content_type_extractor", RunnableLambda(content_type_extractor_node))
graph.add_node("retriever", RunnableLambda(retriever_node))
graph.add_node("generator", RunnableLambda(generator_node))
graph.add_node("end", RunnableLambda(end_node))

graph.set_entry_point("input")

graph.add_edge("input", "content_type_extractor")
graph.add_edge("content_type_extractor", "retriever")
graph.add_edge("retriever", "generator")
graph.add_edge("generator", "end")

compiled = graph.compile()
