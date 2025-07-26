from openai import OpenAI

from src.envs import get_envs, Envs

envs: Envs = get_envs()

client = OpenAI(api_key=envs.OPENAI_API_KEY)


def get_openai_client():
    return client
