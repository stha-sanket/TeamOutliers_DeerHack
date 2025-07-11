from langchain_core.messages import AIMessage, HumanMessage

from bundles.common.prototypes import APIException
from bundles.model import model
from bundles.template import CHATBOT_INITIALIZER_SYSTEM_PROMPT


class ChatBot:
    def __init__(self):
        self.__model = model().define("G1", llm="gemini-2.0-flash", platform="google_genai", temperature=.8)

    def generate(self, inputs):
        for index, message in enumerate(inputs.copy()):
            __content = None
            if message.get("role") == "ai":
                __content = AIMessage(content=message.get("content", ""))

            elif message.get("role") == "human":
                __content = HumanMessage(content=message.get("content", ""))

            else:
                raise APIException("Invalid role was passed, Either pass valid one or remove the call!!!")

            inputs[index] = __content

        response = self.__model.invoke(
            [CHATBOT_INITIALIZER_SYSTEM_PROMPT] +
            inputs
        )

        if response.type == "ai":
            return {
                "role": "ai",
                "content": response.content
            }

        raise APIException("Well the LLM never generated the repose for your given query!!!")
