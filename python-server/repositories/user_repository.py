

from pymongo import MongoClient

from settings.settings import MONGO_URI
from models.user import User
from services.mongodb_service import MongoDBService

class UserRepository:
    def __init__(self):
        self.db = MongoDBService().connect()
        self.collection = self.db["users"] 

    def save_user(self, user: User):
        self.collection.insert_one(user.__dict__)

    def delete_user(self, id):
        self.collection.delete_one({"id": id})

    def get_user(self, id):
        return self.collection.find_one({"id": id})

