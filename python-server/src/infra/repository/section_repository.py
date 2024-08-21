import sys
sys.path.append('../')

from models.section import Section
from infra.database.database_connection import DatabaseConnection

class SectionRepository:
    def __init__(self):
        self.db = DatabaseConnection().connect()
        self.collection = self.db["sections"] 

    def save(self, section: Section):

        topics_ids = section.get_topics()
        
        simple_section = {
            "id": section.get_id(),
            "title": section.get_title(),
            "topics": topics_ids,
            "created_at": section.get_created_at(),
            "updated_at": section.get_updated_at()
        }
        self.collection.insert_one(simple_section)

    def get(self, id):
        document = self.collection.find_one({"id": id})
        if not document:
            return None
        document["_id"] = str(document["_id"])
        return document

    def delete(self, id):
        self.collection.delete_one({"id": id})

    def update(self, section):
        self.collection.update_one({"id": section.get_id()}, {"$set": section.__dict__})
