import os
import pickle
from typing import List
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_core.documents import Document

# Constants
VECTORSTORE_DIR = "vectorstore"
EMBEDDING_MODEL = "all-MiniLM-L6-v2"
VECTORSTORE_PKL = os.path.join(VECTORSTORE_DIR, "vectorstore.pkl")

def get_embeddings():
    return HuggingFaceEmbeddings(model_name=EMBEDDING_MODEL)

def create_vectorstore(documents: List[Document] = None):
    """Create a new vector store with optional initial documents"""
    embeddings = get_embeddings()

    if not documents:
        # Create a dummy document to initialize the vectorstore
        dummy_doc = Document(page_content="Initialization document")
        vectorstore = FAISS.from_documents([dummy_doc], embeddings)
    else:
        # Create FAISS index from actual documents
        vectorstore = FAISS.from_documents(documents, embeddings)

    # Ensure directory exists
    os.makedirs(VECTORSTORE_DIR, exist_ok=True)

    # Save to pickle file
    with open(VECTORSTORE_PKL, "wb") as f:
        pickle.dump(vectorstore, f)

    return vectorstore

def load_vectorstore():
    """Load existing vector store from pickle file"""
    if not os.path.exists(VECTORSTORE_PKL):
        raise FileNotFoundError(f"Vector store not found at {VECTORSTORE_PKL}")

    with open(VECTORSTORE_PKL, "rb") as f:
        vectorstore = pickle.load(f)

    return vectorstore

def add_documents(documents: List[Document]):
    """Add new documents to the vector store"""
    try:
        vectorstore = load_vectorstore()
    except FileNotFoundError:
        vectorstore = create_vectorstore([])

    # Add new documents to the existing vectorstore
    vectorstore.add_documents(documents)

    # Ensure directory exists
    os.makedirs(VECTORSTORE_DIR, exist_ok=True)

    # Save the updated vectorstore
    with open(VECTORSTORE_PKL, "wb") as f:
        pickle.dump(vectorstore, f)

    return vectorstore
