from sympy.polys.subresultants_qq_zz import res

from bundles.model import ContentGenerationModel, QuizGenerationModel
from bundles.utils import JsonIO


class Content:
    def __init__(self):
        self.__map = JsonIO("source/content/map.json")
        self.__model = ContentGenerationModel()
        self.__model_quiz = QuizGenerationModel()

    def __print_hierarchy(self, data, indent=0):
        if not data or type(data) is str: return data
        if type(data) is list: return "\n-".join(data)
        chars = ""
        for key, value in data.items():
            chars += ("  " * indent + f"- {key}\n")
            if isinstance(value, dict):
                chars += self.__print_hierarchy(value, indent + 1) + "\n"
            elif isinstance(value, list):
                for item in value:
                    chars += ("  " * (indent + 1) + f"- {item}\n")

        return chars

    def generate_quiz(self, path):
        data = self.__map.get_json(f"store.{path.replace('/', '.')}.quiz", char=".")
        if data:
            return {
                "quiz": data
            }

        response = self.__map.get_json(path, char="/", rep={})
        if not response:
            return {
                "quiz": None,
                "status": "failed"
            }

        response = self.__print_hierarchy(response, indent=2)
        response = self.__model_quiz.run(response).model_dump()
        self.__map.set_json(f"store.{path.replace('/', '.')}.quiz", response, char=".")

        return {
            "quiz": response
        }

    def get_context(self, path):
        return self.__map.get_json(path, char="/", rep={})

    def get_content(self, path):
        data = self.__map.get_json(f"store.{path.replace('/', '.')}.content", char=".")
        if data:
            return {
                "content": data
            }

        response = temp = self.__map.get_json(path, char="/", rep={})
        if not response:
            return {
                "content": None,
                "status": "failed"
            }

        response = self.__print_hierarchy(response, indent=2)
        response = self.__model.run(response).content
        self.__map.set_json(f"store.{path.replace('/', '.')}.content", response, char=".")

        return {
            "content": response
        }
