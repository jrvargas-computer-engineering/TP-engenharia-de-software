import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../')))
from uuid import uuid4  
import pytest

from models.user import User 
from infra.repository.user_repository import UserRepository    

def test_create_user():

    user = User("jp", str(uuid4()), "jp.corso123@gmail.com")
    user_repository = UserRepository()
    user_repository.save_user(user)

    saved_user = user_repository.get_user(user.id)

    assert saved_user is not None
    assert saved_user["username"] == user.username
    assert saved_user["id"] == user.id
    assert saved_user["email"] == user.email
    assert saved_user == user.__dict__

    user_repository.delete_user(user.id)
