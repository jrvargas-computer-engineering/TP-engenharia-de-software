
#Libs
import sys
sys.path.append('../python-server/src')
from pymongo import MongoClient

#Files
from settings.settings import MONGO_URI

class DatabaseConnection:
    def __init__(self):
        self.client = MongoClient(MONGO_URI)
        self.db = self.client["guia-de"]


    def connect(self):
        return self.db
