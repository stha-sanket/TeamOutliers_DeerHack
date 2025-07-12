import random

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_groq import ChatGroq
from langchain_openai import ChatOpenAI

from bundles.common.config import ALL_CREDS
from bundles.common.exceptions import InvalidCredentials
from bundles.schema import QuizSchema
from bundles.template import ContentCreatorTemplate, QuizCreatorTemplate


class model:
    @staticmethod
    def __base_model(key, llm=None, temperature=1.0, platform="groq"):
        if not key:
            raise InvalidCredentials("Invalid credentials was passed. Check your creds!")

        if platform == "google_genai":
            return ChatGoogleGenerativeAI(
                model=llm,
                temperature=temperature,
                api_key=key
            )

        elif platform == "groq":
            return ChatGroq(
                api_key=key,
                model=(llm or "meta-llama/llama-4-scout-17b-16e-instruct"),
                temperature=temperature
            )

        elif platform == "openai":
            return ChatOpenAI(
                api_key=key,
                model=llm,
                temperature=temperature
            )

        raise InvalidCredentials("Invalid platform was passed, Check your args!")

    def define(self, key: str = None, llm: str = None, temperature: float = 1,
               platform: str = "groq") -> (ChatGoogleGenerativeAI | ChatGroq | ChatOpenAI):
        return self.__base_model(getattr(ALL_CREDS, (key or "M6")), llm=llm, temperature=temperature, platform=platform)

    def shuffle(self, keys: list = None, llm: str = None, temperature: float = None,
                platform: str = None) -> (ChatGoogleGenerativeAI | ChatGroq | ChatOpenAI):
        return self.define(random.choice(keys), llm, temperature, platform)


class ContentGenerationModel:
    def __init__(self):
        self.__chain = ContentCreatorTemplate() | model().define(
            "G1",
            platform="google_genai",
            llm="gemini-2.0-flash"
        )

    def run(self, inputs):
        return self.__chain.invoke(inputs)


class QuizGenerationModel:
    def __init__(self):
        self.__chain = QuizCreatorTemplate() | model().define(
            "G1",
            platform="google_genai",
            llm="gemini-2.0-flash"
        ).with_structured_output(QuizSchema)

    def run(self, inputs):
        return self.__chain.invoke(inputs)
