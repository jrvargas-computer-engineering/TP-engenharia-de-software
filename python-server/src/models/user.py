from abc import ABC, abstractmethod
from datetime import datetime

class User(ABC):
    def __init__(self, username, id):
        self.username = username
        self.id = id
        self.created_at = datetime.now()
        self.updated_at = datetime.now()

    @abstractmethod
    def get_username(self):
        pass
    
    @abstractmethod
    def get_id(self):
        pass
    
    @abstractmethod
    def set_username(self, username):
        pass

    @abstractmethod
    def set_id(self, id):
        pass

    @abstractmethod
    def get_type(self):
        pass

    @abstractmethod
    def get_created_at(self):
        pass

    @abstractmethod
    def get_updated_at(self):
        pass

    @abstractmethod
    def set_created_at(self):
        pass

    @abstractmethod
    def set_updated_at(self):
        pass

    @abstractmethod
    def __str__(self):
        pass

class AnonymousUser(User):
    def __init__(self, username, id):
        super().__init__(username, id)
        self.type = self.__class__.__name__
    
    def get_username(self):
        return self.username
    
    def get_id(self):
        return self.id
    
    def set_username(self, username):
        self.username = username

    def get_type(self):
        return self.type

    def get_created_at(self):
        return self.created_at
    
    def get_updated_at(self):
        return self.updated_at

    def set_id(self, id):
        self.id = id

    def set_created_at(self):
        self.created_at = datetime.now()

    def set_updated_at(self):
        self.updated_at = datetime.now()

    def __str__(self):
        return f"AnonymousUser(username={self.username}, id={self.id}, created_at={self.created_at}, updated_at={self.updated_at})"

class AuthenticatedUser(User):
    def __init__(self, username, id, email):
        super().__init__(username, id)
        self.email = email
        self.type = self.__class__.__name__
    
    def get_username(self):
        return self.username
    
    def get_id(self):
        return self.id
    
    def set_username(self, username):
        self.username = username

    def get_type(self):
        return self.type

    def get_created_at(self):
        return self.created_at
    
    def get_updated_at(self):
        return self.updated_at

    def set_id(self, id):
        self.id = id

    def set_created_at(self):
        self.created_at = datetime.now()

    def set_updated_at(self):
        self.updated_at = datetime.now()
    
    def __str__(self):
        return f"AuthenticatedUser(username={self.username}, id={self.id}, email={self.email})"
