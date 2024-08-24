import sys
sys.path.append('../../')

from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
from fastapi.security import OAuth2PasswordBearer
from google.oauth2 import id_token
from google.auth.transport import requests

from usecases import create_user_usecase
from infra.repository.user_repository import UserRepository
from settings.settings import GOOGLE_CLIENT_ID  

user_router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

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
async def get_users(input: str = Query(...)): 
    try:
        # Split the comma-separated string into a list of strings
        input_list = input.split(',')
        
        user_repository = UserRepository()
        users = user_repository.get(input_list)
        return users
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail="Error retrieving users")
    
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
        existing_user = user_repository.get_one(user_info["id"])

        if existing_user is None:
            create_user_usecase.exec(user_info)
        
        return {"status": "ok", "user": user_info}
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=401, detail="Token inválido")