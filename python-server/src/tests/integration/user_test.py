import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../')))
from uuid import uuid4  
import pytest
from datetime import datetime

from models.user import AnonymousUser, AuthenticatedUser
from infra.repository.user_repository import UserRepository    

def test_create_authenticated_user():

    user = AuthenticatedUser("jp", str(uuid4()), "jp.corso123@gmail.com")
    user_repository = UserRepository()
    user_repository.save(user)

    saved_user = user_repository.get(user.id)

    assert saved_user is not None
    assert saved_user["username"] == user.username
    assert saved_user["id"] == user.id
    assert saved_user["email"] == user.email
    assert saved_user["created_at"] is not None
    assert saved_user["updated_at"] is not None
    assert type(saved_user["created_at"]) == datetime
    assert type(saved_user["updated_at"]) == datetime

    user_repository.delete(user.id)

def test_create_anoymous_user():
    
    user = AnonymousUser("jp", str(uuid4()))
    user_repository = UserRepository()
    user_repository.save(user)

    saved_user = user_repository.get(user.id)

    assert saved_user is not None
    assert saved_user["username"] == user.username
    assert saved_user["id"] == user.id
    assert saved_user["created_at"] is not None
    assert saved_user["updated_at"] is not None
    assert type(saved_user["created_at"]) == datetime
    assert type(saved_user["updated_at"]) == datetime

    user_repository.delete(user.id)

    