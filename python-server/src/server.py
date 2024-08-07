

from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.exceptions import HTTPException

from usecases import save_guide_usecase
from infra.repository.guide_repository import GuideRepository

app = FastAPI()

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

class GetGuideInput(BaseModel):
    id: str


@app.get("/healthz")
async def health_check():
    return {"status": "ok"}

@app.post("/save-guide")
async def create_guide(input: CreateGuideInput):   
    try:
        save_guide_usecase.exec(input)
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail="Erro ao salvar o guia")
    
@app.get("/guide")
async def get_guides(input: GetGuideInput):
    guide_repository = GuideRepository()
    guide = guide_repository.get_guide(input.id) 
    return guide
