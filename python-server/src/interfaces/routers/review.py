import sys
sys.path.append('../../')

import json
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

@review_router.post("/create")
async def create_review(input: CreateReviewInput): 
    try:
        create_review_usecase.exec(input)
        return {"status": "ok"}
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail="Erro ao salvar a review")
    
@review_router.get("/")
async def get_review(input: str = Query(...)):
    try:
        # Split the comma-separated string into a list of strings
        input_list = input.split(',')
        
        review_repository = ReviewRepository()
        reviews = review_repository.get(input_list)
        return reviews
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail="Error retrieving reviews")

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
    