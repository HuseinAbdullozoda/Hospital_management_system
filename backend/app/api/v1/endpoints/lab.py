from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.schemas.lab import LabTestCreate, LabTestRead, LabOrderCreate, LabOrderRead, LabResultCreate, LabResultRead
from app.db.models.lab import LabTest, LabOrder, LabResult
from app.core.dependencies import get_db, require_roles
from typing import List
from datetime import datetime

router = APIRouter(prefix="/lab", tags=["lab"])

# Lab Tests
@router.get("/tests", response_model=List[LabTestRead])
def list_lab_tests(db: Session = Depends(get_db), user=Depends(require_roles("admin", "lab_worker", "doctor", "hospital_admin", "patient"))):
    return db.query(LabTest).all()

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