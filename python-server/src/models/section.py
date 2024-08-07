from uuid import uuid4
from datetime import datetime  # Adicionar importação de datetime

class Section:
    def __init__(self, id, title, topics):
        self.id = id
        self.title = title
        self.topics = topics
        self.created_at = datetime.now()  # Substituir str(uuid4()) por datetime.now()
        self.updated_at = datetime.now()  # Substituir str(uuid4()) por datetime.now()

    def get_id(self):
        return self.id

    def get_title(self):
        return self.title
    
    def get_topics(self):
        return self.topics
    
    def get_created_at(self):
        return self.created_at

    def get_updated_at(self):
        return self.updated_at
    
    def set_id(self, id):
        self.id = id

    def set_title(self, title):
        self.title = title
    
    def set_topics(self, topics):
        self.topics = topics

    def set_created_at(self):
        self.created_at = datetime.now()  # Substituir str(uuid4()) por datetime.now()

    def set_updated_at(self):
        self.updated_at = datetime.now()  # Substituir str(uuid4()) por datetime.now()

    def __str__(self):
        return f"Section(id={self.id}, title={self.title}, topics={self.topics}, created_at={self.created_at}, updated_at={self.updated_at})"