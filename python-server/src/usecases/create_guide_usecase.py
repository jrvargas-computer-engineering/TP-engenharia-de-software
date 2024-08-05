from models.guide import Guide
from models.vo.location import Location
from infra.repository.guide_repository import GuideRepository

def exec(input):
    
    location = Location(
            city=input.location["city"],
            state=input.location["state"],
            country=input.location["country"]
    )

    guide = Guide(
        id=input.id,
        name=input.name,
        location=location,
        type=input.type,
        description=input.description,
        owner=input.owner,
        sections=input.sections,
        visibility=input.visibility,
        anonymous_allowed=input.anonymous_allowed,
    )
    guide_repository = GuideRepository()
    guide_repository.save(guide)