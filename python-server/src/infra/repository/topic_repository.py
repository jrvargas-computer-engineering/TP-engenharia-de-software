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

    def get(self, ids):
        # Busca todos os documentos cujos ids estão na lista fornecida
        documents = self.collection.find({"id": {"$in": ids}})
        
        # Converte o campo _id de cada documento para string
        result = []
        for document in documents:
            document["_id"] = str(document["_id"])
            result.append(document)
        
        return result
    
    def add_review(self, topic_id, review_id):
    # Adiciona uma nova revisão ao tópico especificado
        self.collection.update_one(
            {"id": topic_id},
            {"$push": {"reviews": review_id}}
        )