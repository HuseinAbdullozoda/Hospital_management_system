from pydantic import BaseModel
from typing import Optional

class HospitalBase(BaseModel):
    name: str
    address: Optional[str] = None
    info: Optional[str] = None

class HospitalCreate(HospitalBase):
    pass

class HospitalRead(HospitalBase):
    id: int
    class Config:
        from_attributes = True

class DepartmentBase(BaseModel):
    name: str
    hospital_id: int

class DepartmentCreate(DepartmentBase):
    pass

class DepartmentRead(DepartmentBase):
    id: int
    class Config:
        from_attributes = True

class StaffBase(BaseModel):
    user_id: int
    hospital_id: int
    department_id: Optional[int] = None
    role: Optional[str] = None

class StaffCreate(StaffBase):
    pass

class StaffRead(StaffBase):
    id: int
    class Config:
        from_attributes = True 