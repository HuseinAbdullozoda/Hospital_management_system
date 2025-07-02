from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.schemas.user import UserCreate, UserRead, UserLogin
from app.db.models.user import User
from app.core.security import hash_password, verify_password
from app.core.dependencies import get_db
from app.core.config import settings
import jwt

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/register", response_model=UserRead)
def register(user: UserCreate, db: Session = Depends(get_db)):
    existing = db.query(User).filter((User.username == user.username) | (User.email == user.email)).first()
    if existing:
        raise HTTPException(status_code=400, detail="Username or email already registered")
    db_user = User(
        username=user.username,
        email=user.email,
        hashed_password=hash_password(user.password),
        full_name=user.full_name,
        role=user.role,
        is_active=True
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.username == user.username).first()
    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token_data = {"sub": db_user.username, "role": db_user.role}
    token = jwt.encode(token_data, settings.JWT_SECRET, algorithm=settings.JWT_ALGORITHM)
    return {"access_token": token, "token_type": "bearer"} 