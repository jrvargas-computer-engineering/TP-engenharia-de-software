
import os
from dotenv import load_dotenv

env_path = os.path.join(os.path.dirname(__file__), '..', '.env')

try:
    load_dotenv(env_path, override=True)
    MONGO_URI = os.environ.get("MONGO_URI")

except:
    print("Error loading .env file")