from uuid import uuid4
from datetime import datetime  # Adicionar importação de datetime

class Topic:
    def __init__(self, id, title, hierarchy, children_topics=[]):
        self.id = id
        self.hierarchy = hierarchy
        self.title = title
        self.children_topics = children_topics
        self.created_at = datetime.now()  # Substituir str(uuid4()) por datetime.now()
        self.updated_at = datetime.now()  # Substituir str(uuid4()) por datetime.now()
    
    def get_id(self):
        return self.id
    
    def get_hierarchy(self):
        return self.hierarchy
    
    def get_children_topics(self):
        return self.children_topics
    
    def get_title(self):
        return self.title
    
    def get_created_at(self):
        return self.created_at
    
    def get_updated_at(self):
        return self.updated_at
    
    def set_id(self, id):
        self.id = id

    def set_title(self, title):
        self.title = title

    def set_hierarchy(self, hierarchy):
        self.hierarchy = hierarchy

    def set_children_topics(self, children_topics):
        self.children_topics = children_topics
    
    def set_created_at(self):
        self.created_at = datetime.now()  # Substituir str(uuid4()) por datetime.now()
    
    def set_updated_at(self):
        self.updated_at = datetime.now()  # Substituir str(uuid4()) por datetime.now()
        self.updated_at = datetime.now()  # Substituir str(uuid4()) por datetime.now()
