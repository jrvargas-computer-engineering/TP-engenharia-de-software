import sys
sys.path.append('../../')

from fastapi import APIRouter, HTTPException, Query
from typing import Optional
from pydantic import BaseModel
from usecases import create_review_usecase, update_review_usecase
from infra.repository.review_repository import ReviewRepository

review_router = APIRouter()

class ReviewIdInput(BaseModel):
    id: str

class CreateReviewInput(BaseModel):
    id: str
    content: str
    title: str

class SearchQuery(BaseModel):
    query: str  

@review_router.post("/create")
async def create_review(input: CreateReviewInput): 
    try:
        create_review_usecase.exec(input)
        return {"status": "ok"}
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail="Erro ao salvar a review")
    
@review_router.get("/")
async def get_review(id: str):
    print(f"entrou no get_review")
    print(id)
    review_repository = ReviewRepository()
    review = review_repository.get(id) 
    return review

@review_router.get("/all")
async def get_all_reviews():
    review_repository = ReviewRepository()
    reviews = review_repository.get_all() 
    return reviews

@review_router.post("/delete")
async def delete_review(input: ReviewIdInput):
    try:
        review_repository = ReviewRepository()
        review_repository.delete(input.id) 
        return {"status": "ok"}
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail="Erro ao deletar a review")
    
@review_router.post("/update")
async def update_review(input: CreateReviewInput):
    try:
        update_review_usecase.exec(input)
        return {"status": "ok"}
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail="Erro ao atualizar a review")
    
@review_router.get("/search")
async def search_review(input: SearchQuery):
    review_repository = ReviewRepository()
    reviews = review_repository.search(input.query) 
    return reviews  