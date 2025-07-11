class KDRException(Exception):
    pass


class StreamNotFound(KDRException):
    pass


class InvalidStreamData(KDRException):
    pass


class InvalidCredentials(KDRException):
    pass