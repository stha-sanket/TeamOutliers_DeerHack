import json
import os.path


class JsonIO:
    def __init__(self, file):
        self.__file = file
        self.__json = None
        self.__create_dir()

    def __create_dir(self):
        dir_path = os.path.dirname(self.__file)
        if dir_path and not os.path.exists(dir_path):
            os.makedirs(dir_path)

    def __read_file(self):
        if self.__json is not None:
            return self.__json

        try:
            with open(self.__file) as file:
                self.__json = json.load(file)
        except (json.JSONDecodeError, FileNotFoundError):
            self.__json = {}

        return self.__json

    @staticmethod
    def __iterate_path(path: list, __dict: dict):
        __val = __dict
        for _i in path:
            if isinstance(__val, list):
                return _i

            __val = __val.get(_i, {})

        return __val

    def get_json(self, path: str = None, rep=None, char=".") -> (dict | list):
        __json = self.__read_file()
        if path is None:
            return __json

        path = path.split(char)
        result = self.__iterate_path(path, __json)
        return result or rep

    def __write(self):
        try:
            with open(self.__file, "w") as file:
                json.dump(self.__json, file, indent=4)
        except Exception as e:
            print(f"Error writing to file: {e}")

    def set_json(self, path: str = None, data: [dict | list] = None, char="."):
        __json = self.__read_file()

        if path is None:
            self.__json = data
            self.__write()
            return

        keys = path.split(char)
        current = __json

        for key in keys[:-1]:
            if key not in current or not isinstance(current[key], dict):
                current[key] = {}
            current = current[key]

        current[keys[-1]] = data
        self.__json = __json
        self.__write()
        return self.__json
