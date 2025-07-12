import os

from flask import Flask, request, abort, jsonify, send_from_directory, render_template

from routes.board import board
from routes.chatbot import chatbot

app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 1024 * 1024 * 1024
IGNORE_CHECK = ["/favicon.ico"]
MODEL_3D_LOCAL_PATH = os.path.join(os.path.dirname(__file__), "source/public/models")

app.register_blueprint(chatbot)
app.register_blueprint(board)


@app.route("/v1/source/public/model/<path>")
def serverModel(path):
    return send_from_directory(MODEL_3D_LOCAL_PATH, path)


@app.route("/v1/source/model/<path>")
def modelSource(path):
    return render_template("model_Render.html", model_name=path)


@app.after_request
def add_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Origin, Accept'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST'
    return response


@app.before_request
def handel_before_request():
    if not (request.path in IGNORE_CHECK) and not request.args.get("key"):
        abort(403)


@app.errorhandler(400)
def handle_bad_request(e):
    return jsonify({
        "error": "Bad Request",
        "message": "The server didn't expect the request. Please check your input."
    }), 400


@app.errorhandler(403)
def handle_forbidden_request(e):
    return jsonify({
        "error": "Forbidden",
        "message": "Not enough permission to access. Make sure you are not requesting again."
    }), 403


@app.errorhandler(404)
def handle_not_found_request(e):
    return jsonify({
        "error": "Not Found",
        "message": "The requested resource could not be found on this server."
    }), 404


@app.errorhandler(500)
def handle_server_error_request(e):
    return jsonify({
        "error": "Internal Server Error",
        "message": "The server encountered an internal error. Please try again later."
    }), 500


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=2000, debug=True)  # for development
