import sys
sys.path.append('../../')

from fastapi import APIRouter, HTTPException
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
    owner: str
    service_provider: Optional[str] = None

@review_router.post("/create")
async def create_review(input: CreateReviewInput): 
    try:
        create_review_usecase.exec(input)
        return {"status": "ok"}
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail="Erro ao salvar a review")
    
@review_router.get("/")
async def get_reviews(input: ReviewIdInput):
    review_repository = ReviewRepository()
    review = review_repository.get(input.id) 
    return review

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