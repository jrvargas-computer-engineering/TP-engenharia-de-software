from datetime import datetime

class Guide:
    def __init__(self, id, name, location, description, sections, owner):  
        self.id = id
        self.name = name
        self.location = location
        self.description = description
        self.sections = sections
        self.owner = owner  
        self.created_at = datetime.now()
        self.updated_at = datetime.now()

    # Getters
    def get_id(self):
        return self.id

    def get_name(self):
        return self.name

    def get_location(self):
        return self.location

    def get_owner(self):
        return self.owner

    def get_description(self):
        return self.description

    def get_sections(self): 
        return self.sections    

    # Setters
    def set_id(self, id):
        self.id = id

    def set_owner(self, owner):
        self.owner = owner  

    def set_name(self, name):
        self.name = name

    def set_location(self, location):
        self.location = location

    def set_description(self, description):
        self.description = description

    def set_sections(self, sections):
        self.sections = sections    

    def set_created_at(self):
        self.created_at = datetime.now()

    def set_updated_at(self):
        self.updated_at = datetime.now()

    def __str__(self):
        return f"Guide(id={self.id}, name={self.name}, location={self.location}, description={self.description})"

    