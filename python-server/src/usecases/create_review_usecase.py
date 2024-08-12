from models.review import Review
from infra.repository.review_repository import ReviewRepository

def exec(input):
    
        review = Review(
            id=input.id,
            title=input.title,
            content=input.content,
            owner=input.owner,
            service_provider=input.service_provider,
        )
    
        review_repository = ReviewRepository()
        review_repository.save(review)