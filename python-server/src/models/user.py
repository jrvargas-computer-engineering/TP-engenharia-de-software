class  User:
    def __init__(self, username, id, email):
        self.username = username
        self.id  = id
        self.email = email

    def get_username(self):
        return self.username
    
    def get_id(self):
        return self.id
    
    def get_email(self):
        return self.email
    
    def set_username(self, username):
        self.username = username

    def set_id(self, id):
        self.id = id

    def set_email(self, email):
        self.email = email

    def __str__(self):
        return f"User(username={self.username}, id={self.id}, email={self.email})"
    