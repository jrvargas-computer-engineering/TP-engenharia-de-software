import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../')))
from uuid import uuid4  
import pytest
from datetime import datetime

from models.review import Review
from infra.repository.review_repository import ReviewRepository

def test_create_review():
    
    review = Review(str(uuid4()), "Review 1", "Description 1", "Owner 1", "Prestador de Serviço")
    print(review)
    review_repository = ReviewRepository()
    review_repository.save_review(review)

    saved_review = review_repository.get_review(review.id)

    assert saved_review is not None
    assert saved_review["title"] == review.title
    assert saved_review["id"] == review.id
    assert saved_review["content"] == review.content
    assert saved_review["owner"] == review.owner
    assert saved_review["created_at"] is not None
    assert saved_review["updated_at"] is not None
    assert type(saved_review["created_at"]) == datetime
    assert type(saved_review["updated_at"]) == datetime

    review_repository.delete_review(review.id)

def test_delete_review():
        
    review = Review(str(uuid4()), "Review 1", "Description 1", "Owner 1", "Prestador de Serviço")
    print(review)
    review_repository = ReviewRepository()
    review_repository.save_review(review)

    saved_review = review_repository.get_review(review.id)

    assert saved_review is not None
    assert saved_review["title"] == review.title
    assert saved_review["id"] == review.id
    assert saved_review["content"] == review.content
    assert saved_review["owner"] == review.owner
    assert saved_review["created_at"] is not None
    assert saved_review["updated_at"] is not None
    assert type(saved_review["created_at"]) == datetime
    assert type(saved_review["updated_at"]) == datetime


    review_repository.delete_review(review.id)

    saved_review = review_repository.get_review(review.id)

    assert saved_review is None