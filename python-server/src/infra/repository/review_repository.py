import sys
sys.path.append('../')

from models.review import Review
from infra.database.database_connection import DatabaseConnection

class ReviewRepository:
    def __init__(self):
        self.db = DatabaseConnection().connect()
        self.collection = self.db["reviews"] 

    def save_review(self, review: Review):
        self.collection.insert_one(review.__dict__)

    def delete_review(self, id):
        self.collection.delete_one({"id": id})

    def get_review(self, id):
        return self.collection.find_one({"id": id})