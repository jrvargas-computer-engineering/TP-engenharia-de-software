
#Libs
import sys
sys.path.append('../python-server')
from pymongo import MongoClient

#Files
from settings.settings import MONGO_URI

def connect():
    client = MongoClient(MONGO_URI)
    db_connection = client['guia-de']

    return db_connection

#messages_collection = connect().get_collection('users')
