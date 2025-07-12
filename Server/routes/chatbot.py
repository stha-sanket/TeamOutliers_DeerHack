from flask import Blueprint

from bundles.common.prototypes import RequestHandler
from controller.chatbot import ChatBot

chatbot = Blueprint("chatbot", __name__)
_common = RequestHandler()
_chatbot = ChatBot()


@chatbot.route("/v1/chat/<__id>/generate", methods=["POST"])
def generateChatResponse(__id: str):
    inputs = _common.get_json(".")

    return _common.handle_exception(lambda: _chatbot.generate(inputs.get("messages", [])), pass_value=True)
