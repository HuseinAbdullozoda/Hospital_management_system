from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class MedicineBase(BaseModel):
    name: str
    description: Optional[str] = None
    price: Optional[int] = None
    stock: Optional[int] = 0
    expiry_date: Optional[datetime] = None

class MedicineCreate(MedicineBase):
    pass

class MedicineUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[int] = None
    stock: Optional[int] = None
    expiry_date: Optional[datetime] = None

class MedicineRead(MedicineBase):
    id: int
    class Config:
        from_attributes = True

class MedicineResponse(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    price: Optional[int] = None
    stock: Optional[int] = 0
    expiry_date: Optional[datetime] = None
    is_available: bool = True
    category: Optional[str] = None
    manufacturer: Optional[str] = None
    created_by: Optional[int] = None
    
    class Config:
        from_attributes = True

class PharmacyOrderBase(BaseModel):
    patient_id: int
    medicine_id: int
    quantity: int
    status: Optional[str] = "pending"

class PharmacyOrderCreate(PharmacyOrderBase):
    pass

class PharmacyOrderRead(PharmacyOrderBase):
    id: int
    ordered_at: datetime
    class Config:
        from_attributes = True

class InventoryBase(BaseModel):
    medicine_id: int
    stock: int

class InventoryUpdate(BaseModel):
    stock: int

class InventoryRead(InventoryBase):
    id: int
    class Config:
        from_attributes = True 