import sys
sys.path.append('../')

from models.topic import Topic
from infra.database.database_connection import DatabaseConnection

class TopicRepository:
    def __init__(self):
        self.db = DatabaseConnection().connect()
        self.collection = self.db["topics"] 

    def save(self, topic: Topic):
        self.collection.insert_one(topic.__dict__)

    def delete(self, id):
        self.collection.delete_one({"id": id})

    def get(self, id):
        document = self.collection.find_one({"id": id})
        if not document:
            return None
        document["_id"] = str(document["_id"])
        return document