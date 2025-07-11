import json
from typing import Union

import requests
from flask import request, jsonify
from requests import Response, JSONDecodeError


class APIException(Exception):
    pass


class RequestHandler:
    @staticmethod
    def get_json(key):
        json_value = request.json if request.is_json else {}
        json_value = (json_value.get(key) or None) if key != "." else (json_value or {})
        return json_value

    @staticmethod
    def get_arg(key):
        args = request.args
        arg_value = (args.get(key) or None) if key != "." else (args or {})
        return arg_value

    @staticmethod
    def get_form_data(key):
        form_value = json.loads(request.form.get("form") or "{}")
        form_value = form_value.get(key) if key != "." else form_value
        return form_value

    @staticmethod
    def handle_exception(call: callable, pass_value=False, ignore_value=False, accept_types=False):
        try:
            callable_return = call()
            if pass_value:
                code = 200
                if type(callable_return) is tuple:
                    code = callable_return[1]
                    callable_return = callable_return[0]

                _tp = type(callable_return)
                if _tp is not dict and not accept_types:
                    raise Warning(f"Got some un-acceptable input type '{_tp}', Pass 'accept_types"
                                  f"=True or pass valid input type' to remove this error.")

                return callable_return, code
            else:
                if callable_return and not ignore_value:
                    raise Warning("Got returnable value from callable function."
                                  " Pass ('val=True' or 'ignore_val=True') as arg to remove this error.")
                return '', 200

        except APIException as e:
            return jsonify({
                "message": str(e),
                "status": "failed",
                "code": 400
            }), 400


class APIReference:
    def __init__(self, api_key=None, base_url=None, headers=None):
        self.api_key = api_key
        self.base_url = base_url
        self.headers = headers or {}

    def POST(self, slug: str, json_data: dict = None, headers: dict = None, files: list = None, formate: bool = True,
             isOkay: callable = None) -> Union[dict, Response]:
        if not (("https://" in slug) or ("http://" in slug)):
            if not self.base_url:
                raise LookupError(f"Invalid STARTING_URL was passed, {slug}")

            slug = f"{self.base_url}{slug}"

        if json_data is None:
            json_data = {}

        new_head = self.headers.copy()
        new_head.update(headers or {})

        response = requests.post(slug, json=json_data, files=files, headers=new_head)

        if formate:
            __callable = callable(isOkay)
            if not ((__callable and isOkay(response)) or not __callable):
                return {}

            try:
                return response.json()
            except JSONDecodeError:
                raise LookupError(f"ERROR: {response.text}, CODE: {response.status_code}")

        return response

    def GET(self, slug: str, headers: dict = None, formate: bool = True, isOkay: callable = None) -> Union[
        dict, Response]:
        if not (("https://" in slug) or ("http://" in slug)):
            if not self.base_url:
                raise LookupError(f"Invalid STARTING_URL was passed, {slug}")

            slug = f"{self.base_url}{slug}"

        new_head = self.headers.copy()
        new_head.update(headers or {})

        response = requests.get(slug, headers=new_head)

        if formate:
            __callable = callable(isOkay)
            if not ((__callable and isOkay(response)) or not __callable):
                return {}

            try:
                return response.json()
            except JSONDecodeError:
                raise LookupError(f"ERROR: {response.text}, CODE: {response.status_code}")

        return response

    @staticmethod
    def removeThisKeys(obj: dict, keys: list = None):
        return {key: value for key, value in obj.items() if key not in keys}
