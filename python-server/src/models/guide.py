from uuid import uuid4

class Guide:
    def __init__(self, id, name, location, type, description, owner, sections, visibility, anonymous_allowed):  
        self.id = id
        self.name = name
        self.location = location
        self.type = type
        self.description = description
        self.owner = owner
        self.sections = sections
        self.visibility = visibility
        self.anonymous_allowed = anonymous_allowed
        self.created_at = str(uuid4())
        self.updated_at = str(uuid4())

    # Getters
    def get_id(self):
        return self.id

    def get_name(self):
        return self.name

    def get_location(self):
        return self.location

    def get_type(self):
        return self.type

    def get_description(self):
        return self.description

    def get_owner(self):
        return self.owner

    def get_sections(self):
        return self.sections

    def get_visibility(self):
        return self.visibility

    def get_anonymous_allowed(self):
        return self.anonymous_allowed

    def get_created_at(self):
        return self.created_at

    def get_updated_at(self):
        return self.updated_at

    # Setters
    def set_id(self, id):
        self.id = id

    def set_name(self, name):
        self.name = name

    def set_location(self, location):
        self.location = location

    def set_type(self, type):
        self.type = type

    def set_description(self, description):
        self.description = description

    def set_owner(self, owner):
        self.owner = owner

    def set_sections(self, sections):
        self.sections = sections

    def set_visibility(self, visibility):
        self.visibility = visibility

    def set_anonymous_allowed(self, anonymous_allowed):
        self.anonymous_allowed = anonymous_allowed

    def set_created_at(self):
        self.created_at = str(uuid4())

    def set_updated_at(self):
        self.updated_at = str(uuid4())

    def __str__(self):
        return f"Guide(id={self.id}, name={self.name}, location={self.location}, type={self.type}, description={self.description}, owner={self.owner}, sections={self.sections}, visibility={self.visibility}, anonymous_allowed={self.anonymous_allowed}, created_at={self.created_at}, updated_at={self.updated_at})"

    