from vectorstore.load_db import add_documents
from langchain_core.documents import Document
import os

def load_math_content():
    try:
        # Check if file exists
        if not os.path.exists("resources/math.txt"):
            raise FileNotFoundError("math.txt not found in resources folder")

        with open("resources/math.txt", "r") as f:
            content = f.read()

        if not content.strip():
            raise ValueError("math.txt is empty")

        # Split content into meaningful chunks (by paragraphs)
        chunks = [chunk.strip() for chunk in content.split("\n\n") if chunk.strip()]
        print(f"Found {len(chunks)} content chunks")

        # Create documents from chunks
        documents = [Document(page_content=chunk) for chunk in chunks]

        # Add documents to vector store
        vectorstore = add_documents(documents)
        print(f"Successfully added {len(documents)} documents to vector store")
        return True

    except Exception as e:
        print(f"Error loading math content: {str(e)}")
        return False

if __name__ == "__main__":
    success = load_math_content()
    if success:
        print("Initial math content loaded into vector store successfully!")
    else:
        print("Failed to load initial math content. Please check the errors above.")
