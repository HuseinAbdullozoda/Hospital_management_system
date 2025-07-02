from pydantic import BaseModel
from typing import Optional

class DoctorBase(BaseModel):
    specialization: Optional[str] = None
    bio: Optional[str] = None
    phone: Optional[str] = None
    department: Optional[str] = None

class DoctorCreate(DoctorBase):
    user_id: int

class DoctorUpdate(DoctorBase):
    pass

class DoctorRead(DoctorBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True 