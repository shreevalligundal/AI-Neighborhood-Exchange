from app.core.database import get_database
from app.core.security import (
    hash_password,
    verify_password,
    create_access_token
)
from app.models.user_model import create_user_document
from app.schemas.user_schema import (
    UserRegister,
    UserLogin
)


# -------------------------------------------------------
# Register User
# -------------------------------------------------------

async def register_user(user: UserRegister):

    database = get_database()

    # Check if email already exists
    existing_user = await database.users.find_one(
        {"email": user.email.lower()}
    )

    if existing_user:
        raise ValueError("Email already registered.")

    # Hash password
    hashed_password = hash_password(user.password)

    # Create MongoDB document
    user_document = create_user_document(
        full_name=user.full_name,
        email=user.email,
        hashed_password=hashed_password
    )

    # Insert into MongoDB
    result = await database.users.insert_one(user_document)

    # Fetch inserted user
    created_user = await database.users.find_one(
        {"_id": result.inserted_id}
    )

    return created_user


# -------------------------------------------------------
# Login User
# -------------------------------------------------------

async def login_user(user: UserLogin):

    database = get_database()

    # Check if user exists
    existing_user = await database.users.find_one(
        {"email": user.email.lower()}
    )

    if not existing_user:
        raise ValueError("Invalid email or password.")

    # Verify password
    password_valid = verify_password(
        user.password,
        existing_user["hashed_password"]
    )

    if not password_valid:
        raise ValueError("Invalid email or password.")

    # Generate JWT token
    access_token = create_access_token(
        data={
            "sub": existing_user["email"]
        }
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }