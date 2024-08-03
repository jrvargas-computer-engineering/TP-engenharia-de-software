import os
import sys
from dotenv import load_dotenv


sys.path.append("../python-server/")

base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
env_path = os.path.join(base_dir, '.env')


if not load_dotenv(dotenv_path=env_path, override=True):
    print(f"Erro ao carregar o arquivo .env a partir do caminho: {env_path}")

try:
    MONGO_URI = os.environ.get("MONGO_URI")
except Exception as e:
    print(f"Erro ao carregar as variáveis de ambiente: {e}")

