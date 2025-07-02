from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.schemas.hospital import HospitalCreate, HospitalRead, DepartmentCreate, DepartmentRead, StaffCreate, StaffRead
from app.db.models.hospital import Hospital, Department, Staff
from app.core.dependencies import get_db, require_roles
from typing import List

router = APIRouter(prefix="/hospitals", tags=["hospitals"])

@router.get("/{hospital_id}/departments", response_model=List[DepartmentRead])
def list_departments(hospital_id: int, db: Session = Depends(get_db), user=Depends(require_roles("admin", "hospital_admin"))):
    return db.query(Department).filter(Department.hospital_id == hospital_id).all()

@router.post("/{hospital_id}/departments", response_model=DepartmentRead)
def create_department(hospital_id: int, dep: DepartmentCreate, db: Session = Depends(get_db), user=Depends(require_roles("admin", "hospital_admin"))):
    new_dep = Department(**dep.dict(), hospital_id=hospital_id)
    db.add(new_dep)
    db.commit()
    db.refresh(new_dep)
    return new_dep

@router.get("/{hospital_id}/staff", response_model=List[StaffRead])
def list_staff(hospital_id: int, db: Session = Depends(get_db), user=Depends(require_roles("admin", "hospital_admin"))):
    return db.query(Staff).filter(Staff.hospital_id == hospital_id).all()

@router.get("/{hospital_id}/reports")
def get_hospital_reports(hospital_id: int, db: Session = Depends(get_db), user=Depends(require_roles("admin", "hospital_admin"))):
    # Placeholder: implement report logic
    return {"hospital_id": hospital_id, "reports": []}

@router.get("/{hospital_id}/analytics")
def get_hospital_analytics(hospital_id: int, db: Session = Depends(get_db), user=Depends(require_roles("admin", "hospital_admin"))):
    # Placeholder: implement analytics logic
    return {"hospital_id": hospital_id, "analytics": {}} 