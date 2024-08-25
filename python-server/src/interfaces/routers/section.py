import sys
sys.path.append('../../')

import json
from fastapi import APIRouter, HTTPException, Query
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

class AddSectionTopicInput(BaseModel):
    section_id: str
    topic_id: str

@section_router.post("/create")
async def create_section(input: CreateSectionInput):  
    try:
        create_section_usecase.exec(input)
        return {"status": "ok"}
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail="Erro ao salvar a seção")

@section_router.get("/")
async def get_sections(input: str = Query(...)):
    try:
        # Split the comma-separated string into a list of strings
        input_list = input.split(',')
        
        section_repository = SectionRepository()
        sections = section_repository.get(input_list)
        return sections
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail="Error retrieving sections")

@section_router.post("/delete")
async def delete_section(input: SectionIdInput):
    try:
        section_repository = SectionRepository()
        section_repository.delete(input.id) 
        return {"status": "ok"}
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail="Erro ao deletar a seção")

@section_router.post("/add_topic")
async def add_topic(input: AddSectionTopicInput):
    print(f"input: {input}")    
    try:
        section_repository = SectionRepository()
        section_repository.add_topic(input.section_id, input.topic_id)
        return {"status": "ok"}
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail="Erro ao atualizar os tópicos da seção")