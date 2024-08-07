import sys
sys.path.append('../')

from models.topic import Topic
from infra.database.database_connection import DatabaseConnection

class TopicRepository:
    def __init__(self):
        self.db = DatabaseConnection().connect()
        self.collection = self.db["topics"] 

    def save_topic(self, topic: Topic):
        self.collection.insert_one(topic.__dict__)

    def delete_topic(self, id):
        self.collection.delete_one({"id": id})

    def get_topic(self, id):
        document = self.collection.find_one({"id": id})
        if document:
            document["_id"] = str(document["_id"])
        return document