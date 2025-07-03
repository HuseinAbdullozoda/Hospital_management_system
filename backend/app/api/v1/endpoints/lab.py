from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.schemas.lab import LabTestCreate, LabTestRead, LabOrderCreate, LabOrderRead, LabResultCreate, LabResultRead
from app.db.models.lab import LabTest, LabOrder, LabResult
from app.core.dependencies import get_db, require_roles, get_current_user
from typing import List
from datetime import datetime
from app.db.models.user import User
from app.db.schemas.lab_test import LabTestResponse, LabTestUpdate

router = APIRouter(prefix="/lab", tags=["lab"])

# Lab Tests
@router.get("/tests", response_model=List[LabTestResponse])
def get_lab_tests(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get lab tests for the current user"""
    if current_user.role == "patient":
        tests = db.query(LabTest).filter(LabTest.patient_id == current_user.id).all()
    elif current_user.role == "lab_technician":
        tests = db.query(LabTest).all()
    else:
        tests = db.query(LabTest).filter(LabTest.doctor_id == current_user.id).all()
    
    return [LabTestResponse.from_orm(test) for test in tests]

@router.post("/tests", response_model=LabTestResponse)
def create_lab_test(
    test: LabTestCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles(["doctor"]))
):
    """Create a new lab test"""
    db_test = LabTest(
        patient_id=test.patient_id,
        doctor_id=current_user.id,
        test_type=test.test_type,
        test_date=test.test_date,
        status="pending",
        notes=test.notes
    )
    db.add(db_test)
    db.commit()
    db.refresh(db_test)
    return LabTestResponse.from_orm(db_test)

@router.put("/tests/{test_id}/status")
def update_test_status(
    test_id: int,
    status: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles(["lab_technician"]))
):
    """Update lab test status"""
    test = db.query(LabTest).filter(LabTest.id == test_id).first()
    if not test:
        raise HTTPException(status_code=404, detail="Lab test not found")
    
    valid_statuses = ["pending", "in-progress", "completed", "cancelled"]
    if status not in valid_statuses:
        raise HTTPException(status_code=400, detail=f"Invalid status. Must be one of: {valid_statuses}")
    
    test.status = status
    if status == "completed":
        test.completed_date = datetime.now()
    
    db.commit()
    
    return {"message": f"Lab test status updated to {status}"}

@router.post("/tests/{test_id}/generate-report")
def generate_test_report(
    test_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles(["lab_technician"]))
):
    """Generate a report for a completed lab test"""
    test = db.query(LabTest).filter(LabTest.id == test_id).first()
    if not test:
        raise HTTPException(status_code=404, detail="Lab test not found")
    
    if test.status != "completed":
        raise HTTPException(status_code=400, detail="Test must be completed to generate report")
    
    # In a real application, this would generate an actual report
    # For now, we'll just return a success message
    return {
        "message": "Report generated successfully",
        "test_id": test_id,
        "report_url": f"/reports/lab-test-{test_id}.pdf"
    }

@router.get("/tests/{test_id}/patient-info")
def get_patient_info(
    test_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles(["lab_technician", "doctor"]))
):
    """Get patient information for a lab test"""
    test = db.query(LabTest).filter(LabTest.id == test_id).first()
    if not test:
        raise HTTPException(status_code=404, detail="Lab test not found")
    
    # Get patient information
    patient = db.query(User).filter(User.id == test.patient_id).first()
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    
    return {
        "patient_id": patient.id,
        "full_name": patient.full_name,
        "email": patient.email,
        "phone": patient.phone,
        "date_of_birth": patient.date_of_birth,
        "gender": patient.gender
    }

@router.post("/tests/{test_id}/reschedule")
def reschedule_lab_test(
    test_id: int,
    test_update: LabTestUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles(["doctor", "lab_technician"]))
):
    """Reschedule a lab test"""
    test = db.query(LabTest).filter(LabTest.id == test_id).first()
    if not test:
        raise HTTPException(status_code=404, detail="Lab test not found")
    
    # Check if user has permission to reschedule this test
    if current_user.role == "doctor" and test.doctor_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to reschedule this test")
    
    # Update test details
    if test_update.test_date:
        test.test_date = test_update.test_date
    if test_update.notes:
        test.notes = test_update.notes
    
    test.status = "pending"  # Reset status to pending
    db.commit()
    db.refresh(test)
    
    return {"message": "Lab test rescheduled successfully"}

# Lab Orders
@router.post("/orders", response_model=LabOrderRead)
def create_lab_order(order: LabOrderCreate, db: Session = Depends(get_db), user=Depends(require_roles("doctor", "lab_worker", "hospital_admin"))):
    new_order = LabOrder(**order.dict(), ordered_at=datetime.utcnow())
    db.add(new_order)
    db.commit()
    db.refresh(new_order)
    return new_order

@router.get("/orders/{order_id}", response_model=LabOrderRead)
def get_lab_order(order_id: int, db: Session = Depends(get_db), user=Depends(require_roles("admin", "lab_worker", "doctor", "hospital_admin", "patient"))):
    order = db.query(LabOrder).filter(LabOrder.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Lab order not found")
    return order

# Lab Results
@router.put("/results/{result_id}", response_model=LabResultRead)
def update_lab_result(result_id: int, update: LabResultCreate, db: Session = Depends(get_db), user=Depends(require_roles("lab_worker", "doctor"))):
    result = db.query(LabResult).filter(LabResult.id == result_id).first()
    if not result:
        raise HTTPException(status_code=404, detail="Lab result not found")
    for key, value in update.dict(exclude_unset=True).items():
        setattr(result, key, value)
    db.commit()
    db.refresh(result)
    return result

@router.get("/reports/{result_id}/pdf")
def get_lab_report_pdf(result_id: int):
    # Placeholder: implement PDF generation
    return {"pdf_url": f"/static/lab_reports/{result_id}.pdf"} 