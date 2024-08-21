import sys
sys.path.append('../../')

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from usecases import create_section_usecase, update_section_usecase
from infra.repository.section_repository import SectionRepository

section_router = APIRouter()

class SectionIdInput(BaseModel):
    id: str

class CreateSectionInput(BaseModel):
    id: str
    title: str
    topics: list

@section_router.post("/create")
async def create_section(input: CreateSectionInput): 
    print(f"entrou no create_section")      
    try:
        create_section_usecase.exec(input)
        return {"status": "ok"}
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail="Erro ao salvar a seção")
    
@section_router.get("/")
async def get_sections(input: str):  
    section_repository = SectionRepository()
    section = section_repository.get(input) 
    return section

@section_router.post("/delete")
async def delete_section(input: SectionIdInput):
    try:
        section_repository = SectionRepository()
        section_repository.delete(input.id) 
        return {"status": "ok"}
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail="Erro ao deletar a seção")
    
@section_router.post("/update")
async def update_section(input: CreateSectionInput):
    try:
        update_section_usecase.exec(input)
        return {"status": "ok"}
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail="Erro ao atualizar a seção")