from pydantic import BaseModel, EmailStr
from typing import Optional

class UserBase(BaseModel):
    username: str
    email: EmailStr
    full_name: Optional[str] = None
    role: str
    is_active: Optional[bool] = True

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class UserRead(UserBase):
    id: int
    created_at: str

    class Config:
        from_attributes = True 