import sys
sys.path.append('../')

from models.user import User
from infra.database.database_connection import DatabaseConnection

class UserRepository:
    def __init__(self):
        self.db = DatabaseConnection().connect()
        self.collection = self.db["users"] 

    def save_user(self, user: User):
        self.collection.insert_one(user.__dict__)

    def delete_user(self, id):
        self.collection.delete_one({"id": id})

    def get_user(self, id):
        return self.collection.find_one({"id": id})

