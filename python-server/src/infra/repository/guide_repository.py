import sys
sys.path.append('../')

from models.guide import Guide
from infra.database.database_connection import DatabaseConnection

class GuideRepository:
    def __init__(self):
        self.db = DatabaseConnection().connect()
        self.collection = self.db["guides"] 

    def save(self, guide: Guide):
        self.collection.insert_one(guide.__dict__)

    def delete(self, id):
        self.collection.delete_one({"id": id})

    def get(self, id):
        document = self.collection.find_one({"id": id})
        if document:
            document["_id"] = str(document["_id"])
        return document
    
    def get_all(self):
        documents = self.collection.find()
        guides = []
        for document in documents:
            document["_id"] = str(document["_id"])
            guides.append(document)
        return guides
    
    def search(self, query):
        regex_query = {"$regex": query, "$options": "i"}  # Case-insensitive search
        documents = self.collection.find({
            "$or": [
                {"name": regex_query},
                {"description": regex_query}
            ]
        })
        
        results = []
        for document in documents:
            document["id"] = str(document["id"])
            results.append(document)
        
        return results