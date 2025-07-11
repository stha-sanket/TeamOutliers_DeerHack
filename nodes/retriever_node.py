from state import LearningState
from vectorstore.load_db import load_vectorstore, create_vectorstore
from utils.logger import logger

def get_or_create_vectorstore():
    try:
        logger.info("Loading existing vector store...")
        return load_vectorstore()
    except FileNotFoundError:
        logger.info("Vector store not found, creating new one...")
        return create_vectorstore()

# Initialize the retriever with automatic creation if needed
retriever = get_or_create_vectorstore()

def retriever_node(state: LearningState) -> LearningState:
    try:
        query = ", ".join(state.extracted_concepts or [state.topic])
        logger.info(f"Performing similarity search for query: {query}")

        # Use similarity_search with k=3 to get top 3 most similar documents
        docs = retriever.similarity_search(query, k=3)
        state.retrieved_chunks = [doc.page_content for doc in docs]

        logger.info(f"Retrieved {len(docs)} similar documents")
        for i, chunk in enumerate(state.retrieved_chunks, 1):
            logger.info(f"Similarity match {i}: {chunk[:100]}...")

        state.user_behavior_log.append({
            "action": "retrieval",
            "status": "success",
            "count": len(docs),
            "query": query,
            "retrieval_method": "similarity_search"
        })
    except Exception as e:
        error_msg = f"Error during similarity search: {str(e)}"
        logger.error(error_msg)
        state.retrieved_chunks = []
        state.user_behavior_log.append({
            "action": "retrieval",
            "status": "error",
            "error": str(e),
            "query": query,
            "retrieval_method": "similarity_search"
        })
    return state