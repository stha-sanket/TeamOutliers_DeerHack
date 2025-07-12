from flask import Blueprint

from bundles.common.prototypes import RequestHandler
from controller.content import Content

content = Blueprint("content", __name__)
_common = RequestHandler()
_content = Content()


@content.route("/v1/content/<path:slug>")
def handelContent(slug):
    return _common.handle_exception(lambda: _content.get_content(slug))


@content.route("/v1/context/<path:slug>")
def handelContextResponse(slug):
    return _common.handle_exception(lambda: _content.get_context(slug))


@content.route("/v1/quiz/<path:slug>")
def handelQuiz(slug):
    return _common.handle_exception(lambda: _content.generate_quiz(slug))
