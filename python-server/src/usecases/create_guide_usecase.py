from models.guide import Guide
from models.vo.location import Location
from infra.repository.guide_repository import GuideRepository

def exec(input):
    
    location = Location(
            city=input.location.city,
            state=input.location.state,
            country=input.location.country,
    )

    guide = Guide(
        id=input.id,
        name=input.name,
        location=location.__dict__,
        description=input.description,
        sections=input.sections,
        owner=input.user_id 
    )
    guide_repository = GuideRepository()
    guide_repository.save(guide)