from models.topic import Topic
from models.vo.location import Location
from infra.repository.topic_repository import TopicRepository

def exec(input):

    topic = Topic(
        id=input.id,
        title=input.title,
        hierarchy=input.hierarchy,
        children_topics=input.children_topics,
    )
    topic_repository = TopicRepository()
    topic_repository.save(topic)