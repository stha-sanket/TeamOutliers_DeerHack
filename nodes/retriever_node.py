from state import LearningState
from vectorstore.load_db import load_vectorstore, create_vectorstore
import os
import logging

logger = logging.getLogger(__name__)

def get_or_create_vectorstore():
    try:
        return load_vectorstore()
    except FileNotFoundError:
        logger.info("Vector store not found, creating new one...")
        return create_vectorstore()

# Initialize the retriever with automatic creation if needed
retriever = get_or_create_vectorstore()

def retriever_node(state: LearningState) -> LearningState:
    try:
        query = ", ".join(state.extracted_concepts or [state.topic])
        docs = retriever.get_relevant_documents(query)
        state.retrieved_chunks = [doc.page_content for doc in docs]
        state.user_behavior_log.append({
            "action": "retrieval",
            "status": "success",
            "count": len(docs),
            "query": query
        })
    except Exception as e:
        state.retrieved_chunks = []
        state.user_behavior_log.append({
            "action": "retrieval",
            "status": "error",
            "error": str(e),
            "query": query
        })
    return state