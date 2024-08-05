

from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.exceptions import HTTPException

from usecases import create_guide_usecase

app = FastAPI()

class CreateGuideInput(BaseModel):
    id: str
    name: str
    location: dict
    type: str
    description: str
    owner: str
    sections: list
    visibility: str
    anonymous_allowed: bool


@app.get("/healthz")
async def health_check():
    return {"status": "ok"}

@app.post("/guides")
async def create_guide(input: CreateGuideInput):
    try:
        create_guide_usecase.exec(input)
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail="Erro ao salvar o guia")
