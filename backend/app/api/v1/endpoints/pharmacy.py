from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.schemas.pharmacy import MedicineCreate, MedicineRead, PharmacyOrderCreate, PharmacyOrderRead, InventoryUpdate, InventoryRead
from app.db.models.pharmacy import Medicine, PharmacyOrder, Inventory
from app.core.dependencies import get_db, require_roles
from typing import List
from datetime import datetime

router = APIRouter(prefix="/pharmacy", tags=["pharmacy"])

# Medicines
@router.get("/medicines", response_model=List[MedicineRead])
def list_medicines(db: Session = Depends(get_db), user=Depends(require_roles("admin", "pharmacist", "doctor", "hospital_admin", "patient"))):
    return db.query(Medicine).all()

# Orders
@router.post("/orders", response_model=PharmacyOrderRead)
def create_pharmacy_order(order: PharmacyOrderCreate, db: Session = Depends(get_db), user=Depends(require_roles("patient"))):
    new_order = PharmacyOrder(**order.dict(), ordered_at=datetime.utcnow())
    db.add(new_order)
    db.commit()
    db.refresh(new_order)
    return new_order

@router.get("/orders/{order_id}", response_model=PharmacyOrderRead)
def get_pharmacy_order(order_id: int, db: Session = Depends(get_db), user=Depends(require_roles("admin", "pharmacist", "doctor", "hospital_admin", "patient"))):
    order = db.query(PharmacyOrder).filter(PharmacyOrder.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order

# Inventory
@router.get("/inventory", response_model=List[InventoryRead])
def list_inventory(db: Session = Depends(get_db), user=Depends(require_roles("admin", "pharmacist", "hospital_admin"))):
    return db.query(Inventory).all()

@router.put("/inventory/{inventory_id}", response_model=InventoryRead)
def update_inventory(inventory_id: int, update: InventoryUpdate, db: Session = Depends(get_db), user=Depends(require_roles("pharmacist", "hospital_admin"))):
    inv = db.query(Inventory).filter(Inventory.id == inventory_id).first()
    if not inv:
        raise HTTPException(status_code=404, detail="Inventory item not found")
    inv.stock = update.stock
    db.commit()
    db.refresh(inv)
    return inv

@router.get("/orders/{order_id}/status")
def get_order_status(order_id: int, db: Session = Depends(get_db), user=Depends(require_roles("admin", "pharmacist", "doctor", "hospital_admin", "patient"))):
    order = db.query(PharmacyOrder).filter(PharmacyOrder.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return {"status": order.status} 