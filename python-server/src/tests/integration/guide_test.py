import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../')))
from uuid import uuid4  
import pytest
from datetime import datetime

from models.guide import Guide
from models.vo.location import Location
from infra.repository.guide_repository import GuideRepository    

def test_create_guide():
    
        guide = Guide(str(uuid4()), "Guide 1", Location("Porto Alegre", "Rio Grande do Sul", "Brazil").__dict__, "Type 1", "Description 1", "Owner 1", ["Section 1", "Section 2"], "Visibility 1", True)
        print(guide)
        guide_repository = GuideRepository()
        guide_repository.save(guide)
    
        saved_guide = guide_repository.get_guide(guide.id)
    
        assert saved_guide is not None
        assert saved_guide["name"] == guide.name
        assert saved_guide["id"] == guide.id
        assert saved_guide["location"] == guide.location
        assert saved_guide["type"] == guide.type
        assert saved_guide["description"] == guide.description
        assert saved_guide["owner"] == guide.owner
        assert saved_guide["sections"] == guide.sections
        assert saved_guide["visibility"] == guide.visibility
        assert saved_guide["anonymous_allowed"] == guide.anonymous_allowed
        assert saved_guide["created_at"] == guide.created_at
        assert saved_guide["updated_at"] == guide.updated_at
        assert saved_guide == guide.__dict__

        guide_repository.delete_guide(guide.id)


    
