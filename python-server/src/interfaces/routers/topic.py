import sys
sys.path.append('../../')

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from usecases import create_topic_usecase
from infra.repository.topic_repository import TopicRepository

topic_router = APIRouter()

class CreateTopicInput(BaseModel):
    id: str
    title: str
    hierarchy: int
    children_topics: bool
    reviews: list       

@topic_router.post("/create")
async def create_topic(input: CreateTopicInput):
    print(f"create topic: {input}") 
    try:
        create_topic_usecase.exec(input)
        return {"status": "ok"}
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail="Erro ao criar o tópico")

@topic_router.get("/")
async def get_topics(input: str):
    try:
        topic_repository = TopicRepository()
  
        topic = topic_repository.get(input)
        return topic
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail="Erro ao obter os tópicos")
    
@topic_router.post("/delete")
async def delete_topic(input):
    try:
        topic_repository = TopicRepository()
        topic_repository.delete(input.id)
        return {"status": "ok"}
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail="Erro ao deletar o tópico")