from state import LearningState
from vectorstore.load_db import load_vectorstore

retriever = load_vectorstore()

def retriever_node(state: LearningState) -> LearningState:
    query = ", ".join(state.extracted_concepts or [state.topic])
    docs = retriever.get_relevant_documents(query)
    state.retrieved_chunks = [doc.page_content for doc in docs]
    return state
