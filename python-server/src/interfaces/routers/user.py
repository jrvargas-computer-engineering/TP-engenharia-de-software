import sys
sys.path.append('../../')

from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from fastapi.security import OAuth2PasswordBearer
from google.oauth2 import id_token
from google.auth.transport import requests

from usecases import create_user_usecase
from infra.repository.user_repository import UserRepository
from settings.settings import GOOGLE_CLIENT_ID  

user_router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

class UserIdInput(BaseModel):
    id: str

class CreateUserInput(BaseModel):
    id: str
    name: str
    email: str
    is_authenticated: bool  

class GoogleToken(BaseModel):
    token: str

@user_router.post("/create")
async def create_user(input: CreateUserInput): 
    try:
        create_user_usecase.exec(input)
        return {"status": "ok"}
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail="Erro ao salvar o usuário")
    
@user_router.get("/")
async def get_users(input: UserIdInput):
    user_repository = UserRepository()
    user = user_repository.get(input.id) 
    return user

@user_router.post("/delete")
async def delete_user(input: UserIdInput):
    try:
        user_repository = UserRepository()
        user_repository.delete(input.id) 
        return {"status": "ok"}
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail="Erro ao deletar o usuário")
    
@user_router.post("/update")
async def update_user(input: CreateUserInput):
    try:
        update_user_usecase.exec(input)
        return {"status": "ok"}
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail="Erro ao atualizar o usuário")
    
@user_router.post("/login")
async def login_with_google(token: GoogleToken):

    try:
        idinfo = id_token.verify_oauth2_token(token.token, requests.Request(), GOOGLE_CLIENT_ID)
        if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
            raise HTTPException(status_code=401, detail="Usuário não autorizado")  

        user_info = {
            "id": idinfo["sub"],
            "username": idinfo["name"],
            "email": idinfo["email"],
            "is_authenticated": True,
            "token": token.token 
        }
        user_repository = UserRepository()
        existing_user = user_repository.get(user_info["id"])

        if existing_user is None:
            
            create_user_usecase.exec(user_info)
        
        return {"status": "ok", "user": user_info}
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=401, detail="Token inválido")