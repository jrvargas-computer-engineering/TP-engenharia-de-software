import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../')))
from uuid import uuid4  
import pytest
from datetime import datetime

from models.topic import Topic
from models.section import Section

from infra.repository.section_repository import SectionRepository

def test_create_section():
        
        topics = [Topic(str(uuid4()), "Topic 1", 2, []), Topic(str(uuid4()), "Topic 2", 1, [str(uuid4()), str(uuid4())])]
        section = Section(str(uuid4()), "Section 1", topics)
        print(section)
        section_repository = SectionRepository()
        section_repository.save(section)
    
        saved_section = section_repository.get(section.id)
    
        assert saved_section is not None
        assert saved_section["title"] == section.title
        assert saved_section["id"] == section.id
        assert saved_section["created_at"] is not None
        assert saved_section["updated_at"] is not None
        assert type(saved_section["created_at"]) == datetime
        assert type(saved_section["updated_at"]) == datetime
        assert saved_section["topics"] == [topic.get_id() for topic in topics]

        section_repository.delete(section.id)


def test_delete_section():
            
            topics = [Topic(str(uuid4()), "Topic 1", 1, []), Topic(str(uuid4()), "Topic 2", 2, [str(uuid4()), str(uuid4())])]
            section = Section(str(uuid4()), "Section 1", topics)
            print(section)
            section_repository = SectionRepository()
            section_repository.save(section)
        
            saved_section = section_repository.get(section.id)
        
            assert saved_section is not None
            assert saved_section["title"] == section.title
            assert saved_section["id"] == section.id
            assert saved_section["created_at"] is not None
            assert saved_section["updated_at"] is not None
            assert type(saved_section["created_at"]) == datetime
            assert type(saved_section["updated_at"]) == datetime
            assert saved_section["topics"] == [topic.get_id() for topic in topics]
        
            section_repository.delete(section.id)
        
            saved_section = section_repository.get(section.id)
        
            assert saved_section is None
            assert saved_section != section.__dict__