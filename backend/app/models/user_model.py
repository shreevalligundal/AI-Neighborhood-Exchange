from datetime import datetime


def create_user_document(
    full_name: str,
    email: str,
    hashed_password: str
):
    """
    Creates a MongoDB user document.
    """

    return {
        "full_name": full_name,
        "email": email.lower(),
        "hashed_password": hashed_password,

        "profile_image": "",

        "phone_number": "",

        "address": "",

        "location": {
            "latitude": None,
            "longitude": None
        },

        "rating": 0,

        "items_shared": 0,

        "is_verified": False,

        "created_at": datetime.utcnow(),

        "updated_at": datetime.utcnow()
    }