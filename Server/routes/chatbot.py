from flask import Blueprint

from bundles.common.prototypes import RequestHandler

chatbot = Blueprint("chatbot", __name__)
_common = RequestHandler()


@chatbot.route("/v1/chat/<__id>/generate", methods=["POST"])
def generateChatResponse(__id: str):
    inputs = _common.get_json(".")
    messages = inputs.get("messages", [])

    return _common.handle_exception()
