from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.schemas.hospital import HospitalCreate, HospitalRead, DepartmentCreate, DepartmentRead, StaffCreate, StaffRead
from app.db.models.hospital import Hospital, Department, Staff
from app.core.dependencies import get_db, require_roles, get_current_user
from typing import List
from app.db.models.user import User
from app.db.schemas.hospital import HospitalResponse, HospitalUpdate
from datetime import datetime

router = APIRouter(prefix="/hospitals", tags=["hospitals"])

@router.get("/", response_model=List[HospitalResponse])
def get_hospitals(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get hospitals based on user role"""
    if current_user.role == "system_admin":
        # System admin sees all hospitals
        hospitals = db.query(Hospital).all()
    elif current_user.role == "hospital_admin":
        # Hospital admin sees only their hospital
        hospitals = db.query(Hospital).filter(Hospital.id == current_user.hospital_id).all()
    else:
        # Other users see approved hospitals only
        hospitals = db.query(Hospital).filter(Hospital.status == "approved").all()
    
    return [HospitalResponse.from_orm(hospital) for hospital in hospitals]

@router.post("/", response_model=HospitalResponse)
def create_hospital(
    hospital: HospitalCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles(["system_admin"]))
):
    """Create a new hospital (system admin only)"""
    db_hospital = Hospital(
        name=hospital.name,
        address=hospital.address,
        phone=hospital.phone,
        email=hospital.email,
        status="pending",
        created_by=current_user.id
    )
    db.add(db_hospital)
    db.commit()
    db.refresh(db_hospital)
    return HospitalResponse.from_orm(db_hospital)

@router.put("/{hospital_id}", response_model=HospitalResponse)
def update_hospital(
    hospital_id: int,
    hospital_update: HospitalUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles(["system_admin", "hospital_admin"]))
):
    """Update hospital information"""
    hospital = db.query(Hospital).filter(Hospital.id == hospital_id).first()
    if not hospital:
        raise HTTPException(status_code=404, detail="Hospital not found")
    
    # Check permissions
    if current_user.role == "hospital_admin" and hospital.id != current_user.hospital_id:
        raise HTTPException(status_code=403, detail="Not authorized to update this hospital")
    
    # Update fields
    for key, value in hospital_update.dict(exclude_unset=True).items():
        setattr(hospital, key, value)
    
    db.commit()
    db.refresh(hospital)
    return HospitalResponse.from_orm(hospital)

@router.post("/{hospital_id}/approve")
def approve_hospital(
    hospital_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles(["system_admin"]))
):
    """Approve a hospital (system admin only)"""
    hospital = db.query(Hospital).filter(Hospital.id == hospital_id).first()
    if not hospital:
        raise HTTPException(status_code=404, detail="Hospital not found")
    
    if hospital.status != "pending":
        raise HTTPException(status_code=400, detail="Hospital is not pending approval")
    
    hospital.status = "approved"
    hospital.approved_at = datetime.now()
    hospital.approved_by = current_user.id
    db.commit()
    
    return {"message": "Hospital approved successfully"}

@router.post("/{hospital_id}/reject")
def reject_hospital(
    hospital_id: int,
    reason: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles(["system_admin"]))
):
    """Reject a hospital (system admin only)"""
    hospital = db.query(Hospital).filter(Hospital.id == hospital_id).first()
    if not hospital:
        raise HTTPException(status_code=404, detail="Hospital not found")
    
    if hospital.status != "pending":
        raise HTTPException(status_code=400, detail="Hospital is not pending approval")
    
    hospital.status = "rejected"
    hospital.rejection_reason = reason
    hospital.rejected_at = datetime.now()
    hospital.rejected_by = current_user.id
    db.commit()
    
    return {"message": "Hospital rejected successfully"}

@router.delete("/{hospital_id}")
def delete_hospital(
    hospital_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles(["system_admin"]))
):
    """Delete a hospital (system admin only)"""
    hospital = db.query(Hospital).filter(Hospital.id == hospital_id).first()
    if not hospital:
        raise HTTPException(status_code=404, detail="Hospital not found")
    
    db.delete(hospital)
    db.commit()
    
    return {"message": "Hospital deleted successfully"}

@router.get("/pending")
def get_pending_hospitals(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles(["system_admin"]))
):
    """Get all pending hospitals for system admin review"""
    hospitals = db.query(Hospital).filter(Hospital.status == "pending").all()
    return [HospitalResponse.from_orm(hospital) for hospital in hospitals]

@router.get("/{hospital_id}/departments")
def get_hospital_departments(
    hospital_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get departments for a specific hospital"""
    hospital = db.query(Hospital).filter(Hospital.id == hospital_id).first()
    if not hospital:
        raise HTTPException(status_code=404, detail="Hospital not found")
    
    # In a real application, you would have a Department model
    # For now, return a placeholder
    return {
        "hospital_id": hospital_id,
        "departments": [
            {"id": 1, "name": "Cardiology", "head_doctor": "Dr. Smith"},
            {"id": 2, "name": "Neurology", "head_doctor": "Dr. Johnson"},
            {"id": 3, "name": "Orthopedics", "head_doctor": "Dr. Williams"}
        ]
    }

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