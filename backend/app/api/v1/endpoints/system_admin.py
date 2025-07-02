from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.dependencies import get_db, require_roles
from app.db.models.hospital import Hospital
from app.db.models.user import User
from app.db.schemas.hospital import HospitalRead
from app.db.schemas.user import UserRead
from typing import List

router = APIRouter(prefix="/system-admin", tags=["system-admin"])

@router.get("/dashboard")
def dashboard(user=Depends(require_roles("system_admin"))):
    # Placeholder: implement dashboard logic
    return {"dashboard": "system-wide stats"}

@router.get("/hospitals", response_model=List[HospitalRead])
def list_hospitals(db: Session = Depends(get_db), user=Depends(require_roles("system_admin"))):
    return db.query(Hospital).all()

@router.get("/users", response_model=List[UserRead])
def list_users(db: Session = Depends(get_db), user=Depends(require_roles("system_admin"))):
    return db.query(User).all()

@router.get("/reports")
def cross_hospital_reports(user=Depends(require_roles("system_admin"))):
    # Placeholder: implement cross-hospital report logic
    return {"reports": []}

@router.get("/analytics")
def cross_hospital_analytics(user=Depends(require_roles("system_admin"))):
    # Placeholder: implement cross-hospital analytics logic
    return {"analytics": {}} 