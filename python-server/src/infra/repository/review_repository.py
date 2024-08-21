import sys
sys.path.append('../')

from models.review import Review
from infra.database.database_connection import DatabaseConnection

class ReviewRepository:
    def __init__(self):
        self.db = DatabaseConnection().connect()
        self.collection = self.db["reviews"] 

    def save(self, review: Review):
        self.collection.insert_one(review.__dict__)

    def delete(self, id):
        self.collection.delete_one({"id": id})

    def get(self, id):
        document = self.collection.find_one({"id": id})
        if document:
            document["_id"] = str(document["_id"])
        return document
    
    def get_all(self):
        documents = self.collection.find()
        reviews = []
        for document in documents:
            document["_id"] = str(document["_id"])
            reviews.append(document)
        return reviews
    
    def update(self, review):
        self.collection.update_one({"id": review.get_id()}, {"$set": review.__dict__})
