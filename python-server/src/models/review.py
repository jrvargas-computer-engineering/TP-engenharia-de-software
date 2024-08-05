class Review:
    def __init__(self, id, title, content, owner, service_provider, created_at, updated_at):
        self.service_provider = service_provider
        self.id = id
        self.title = title
        self.content = content
        self.owner = owner
        self.created_at = created_at
        self.updated_at = updated_at

    def get_id(self):
        return self.id
    
    def get_title(self):
        return self.title
    
    def get_content(self):
        return self.content
    
    def get_owner(self):
        return self.owner
    
    def get_service_provider(self):
        return self.service_provider
    
    def set_id(self, id):
        self.id = id

    def set_title(self, title):
        self.title = title

    def set_content(self, content):
        self.content = content
    
    def set_owner(self, owner):
        self.owner = owner

    def set_service_provider(self, service_provider):
        self.service_provider = service_provider