

from pymongo import MongoClient

from settings.settings import MONGO_URI
from models.user import User

class UserRepository:
    def __init__(self):
        self.client = MongoClient(MONGO_URI)
        self.db = self.client["guia-de"]
        self.collection = self.db["users"] 

    def save_user(self, user: User):
        self.collection.insert_one(user.__dict__)

    def delete_user(self, id):
        self.collection.delete_one({"id": id})

    def get_user(self, id):
        return self.collection.find_one({"id": id})

