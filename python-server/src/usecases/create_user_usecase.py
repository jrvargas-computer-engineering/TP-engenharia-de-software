from models.user import AuthenticatedUser
from infra.repository.user_repository import UserRepository

def exec(input):
    user = AuthenticatedUser(
        id=input["id"],
        username=input["username"],
        email=input["email"],
        is_authenticated=input["is_authenticated"],
        token=input["token"]
    )

    user_repository = UserRepository()

    user_repository.save(user)