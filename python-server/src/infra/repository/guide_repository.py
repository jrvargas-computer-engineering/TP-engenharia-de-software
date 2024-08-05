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

    def delete_guide(self, id):
        self.collection.delete_one({"id": id})

    def get_guide(self, id):
        return self.collection.find_one({"id": id})