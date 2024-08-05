import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../')))
from uuid import uuid4  
import pytest
from datetime import datetime

from models.topic import Topic

from infra.repository.topic_repository import TopicRepository

def test_create_topic():
            
    topic = Topic(str(uuid4()), "Topic 1", str(datetime.now()), str(datetime.now()))
    print(topic)
    topic_repository = TopicRepository()
    topic_repository.save_topic(topic)

    saved_topic = topic_repository.get_topic(topic.id)

    assert saved_topic is not None
    assert saved_topic["title"] == topic.title
    assert saved_topic["id"] == topic.id
    assert saved_topic["created_at"] == topic.created_at
    assert saved_topic["updated_at"] == topic.updated_at

    topic_repository.delete_topic(topic.id)

def test_delete_topic():
    
    topic = Topic(str(uuid4()), "Topic 1", str(datetime.now()), str(datetime.now()))
    print(topic)
    topic_repository = TopicRepository()
    topic_repository.save_topic(topic)

    saved_topic = topic_repository.get_topic(topic.id)

    assert saved_topic is not None
    assert saved_topic["title"] == topic.title
    assert saved_topic["id"] == topic.id
    assert saved_topic["created_at"] == topic.created_at
    assert saved_topic["updated_at"] == topic.updated_at

    topic_repository.delete_topic(topic.id)

    saved_topic = topic_repository.get_topic(topic.id)

    assert saved_topic is None
    assert saved_topic != topic.__dict__
