class DummyRetriever:
    def get_relevant_documents(self, query):
        class Doc:
            def __init__(self, content):
                self.page_content = content
        return [
            Doc(f"Document chunk 1 for query: {query}"),
            Doc(f"Document chunk 2 for query: {query}")
        ]

def load_vectorstore():
    return DummyRetriever()
