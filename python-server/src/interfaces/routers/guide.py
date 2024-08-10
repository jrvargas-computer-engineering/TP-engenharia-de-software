import sys
sys.path.append('../../')

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from usecases import save_guide_usecase
from infra.repository.guide_repository import GuideRepository

guide_router = APIRouter()

class Location(BaseModel):
    city: str
    state: str
    country: str    

class CreateGuideInput(BaseModel):
    id: str
    name: str
    location: Location
    type: str
    description: str
    owner: str
    sections: list
    visibility: str
    anonymous_allowed: bool

class GuideIdInput(BaseModel):
    id: str

@guide_router.post("/save")
async def save_guide(input: CreateGuideInput):   
    try:
        save_guide_usecase.exec(input)
        return {"status": "ok"}
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail="Erro ao salvar o guia")
    
@guide_router.get("/")
async def get_guides(input: GuideIdInput):
    guide_repository = GuideRepository()
    guide = guide_repository.get_guide(input.id) 
    return guide

@guide_router.post("/delete")
async def delete_guide(input: GuideIdInput):
    try:
        guide_repository = GuideRepository()
        guide_repository.delete_guide(input.id) 
        return {"status": "ok"}
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail="Erro ao deletar o guia")