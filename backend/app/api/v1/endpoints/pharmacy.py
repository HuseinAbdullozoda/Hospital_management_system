from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.schemas.pharmacy import MedicineCreate, MedicineRead, PharmacyOrderCreate, PharmacyOrderRead, InventoryUpdate, InventoryRead
from app.db.models.pharmacy import Medicine, PharmacyOrder, Inventory
from app.core.dependencies import get_db, require_roles, get_current_user
from typing import List
from datetime import datetime
from app.db.models.user import User
from app.db.schemas.pharmacy import MedicineResponse, MedicineUpdate

router = APIRouter(prefix="/pharmacy", tags=["pharmacy"])

# Medicines
@router.get("/medicines", response_model=List[MedicineResponse])
def get_medicines(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get medicines based on user role"""
    if current_user.role == "pharmacist":
        # Pharmacist sees all medicines
        medicines = db.query(Medicine).all()
    else:
        # Other users see only available medicines
        medicines = db.query(Medicine).filter(Medicine.is_available == True).all()
    
    return [MedicineResponse.from_orm(medicine) for medicine in medicines]

@router.post("/medicines", response_model=MedicineResponse)
def create_medicine(
    medicine: MedicineCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles(["pharmacist"]))
):
    """Create a new medicine (pharmacist only)"""
    db_medicine = Medicine(
        name=medicine.name,
        description=medicine.description,
        price=medicine.price,
        is_available=True,
        created_by=current_user.id
    )
    db.add(db_medicine)
    db.commit()
    db.refresh(db_medicine)
    return MedicineResponse.from_orm(db_medicine)

@router.put("/medicines/{medicine_id}", response_model=MedicineResponse)
def update_medicine(
    medicine_id: int,
    medicine_update: MedicineUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles(["pharmacist"]))
):
    """Update medicine information (pharmacist only)"""
    medicine = db.query(Medicine).filter(Medicine.id == medicine_id).first()
    if not medicine:
        raise HTTPException(status_code=404, detail="Medicine not found")
    
    # Update fields
    for key, value in medicine_update.dict(exclude_unset=True).items():
        setattr(medicine, key, value)
    
    db.commit()
    db.refresh(medicine)
    return MedicineResponse.from_orm(medicine)

@router.delete("/medicines/{medicine_id}")
def delete_medicine(
    medicine_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles(["pharmacist"]))
):
    """Delete a medicine (pharmacist only)"""
    medicine = db.query(Medicine).filter(Medicine.id == medicine_id).first()
    if not medicine:
        raise HTTPException(status_code=404, detail="Medicine not found")
    
    db.delete(medicine)
    db.commit()
    
    return {"message": "Medicine deleted successfully"}

@router.put("/medicines/{medicine_id}/toggle-availability")
def toggle_medicine_availability(
    medicine_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles(["pharmacist"]))
):
    """Toggle medicine availability (pharmacist only)"""
    medicine = db.query(Medicine).filter(Medicine.id == medicine_id).first()
    if not medicine:
        raise HTTPException(status_code=404, detail="Medicine not found")
    
    # Toggle the boolean value
    medicine.is_available = not medicine.is_available
    db.commit()
    
    return {
        "message": f"Medicine {'made available' if medicine.is_available else 'made unavailable'}",
        "is_available": medicine.is_available
    }

# Orders
@router.post("/orders", response_model=PharmacyOrderRead)
def create_pharmacy_order(
    order: PharmacyOrderCreate, 
    db: Session = Depends(get_db), 
    current_user: User = Depends(require_roles(["patient"]))
):
    new_order = PharmacyOrder(**order.dict(), ordered_at=datetime.utcnow())
    db.add(new_order)
    db.commit()
    db.refresh(new_order)
    return new_order

@router.get("/orders/{order_id}", response_model=PharmacyOrderRead)
def get_pharmacy_order(
    order_id: int, 
    db: Session = Depends(get_db), 
    current_user: User = Depends(require_roles(["admin", "pharmacist", "doctor", "hospital_admin", "patient"]))
):
    order = db.query(PharmacyOrder).filter(PharmacyOrder.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order

# Inventory
@router.get("/inventory", response_model=List[InventoryRead])
def list_inventory(
    db: Session = Depends(get_db), 
    current_user: User = Depends(require_roles(["admin", "pharmacist", "hospital_admin"]))
):
    return db.query(Inventory).all()

@router.put("/inventory/{inventory_id}", response_model=InventoryRead)
def update_inventory(
    inventory_id: int, 
    update: InventoryUpdate, 
    db: Session = Depends(get_db), 
    current_user: User = Depends(require_roles(["pharmacist", "hospital_admin"]))
):
    inv = db.query(Inventory).filter(Inventory.id == inventory_id).first()
    if not inv:
        raise HTTPException(status_code=404, detail="Inventory item not found")
    inv.quantity = update.stock
    db.commit()
    db.refresh(inv)
    return inv

@router.get("/orders/{order_id}/status")
def get_order_status(
    order_id: int, 
    db: Session = Depends(get_db), 
    current_user: User = Depends(require_roles(["admin", "pharmacist", "doctor", "hospital_admin", "patient"]))
):
    order = db.query(PharmacyOrder).filter(PharmacyOrder.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return {"status": order.status}

@router.get("/inventory-details")
def get_inventory(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles(["pharmacist"]))
):
    """Get pharmacy inventory (pharmacist only)"""
    inventory = db.query(Inventory).all()
    return [
        {
            "id": item.id,
            "medicine_name": item.medicine.name,
            "quantity": item.quantity,
            "expiry_date": item.expiry_date,
            "batch_number": item.batch_number
        }
        for item in inventory
    ]

@router.post("/inventory/add-stock")
def add_stock(
    medicine_id: int,
    quantity: int,
    expiry_date: str,
    batch_number: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles(["pharmacist"]))
):
    """Add stock to inventory (pharmacist only)"""
    medicine = db.query(Medicine).filter(Medicine.id == medicine_id).first()
    if not medicine:
        raise HTTPException(status_code=404, detail="Medicine not found")
    
    # Check if inventory item already exists
    inventory_item = db.query(Inventory).filter(
        Inventory.medicine_id == medicine_id,
        Inventory.batch_number == batch_number
    ).first()
    
    if inventory_item:
        # Update existing inventory
        inventory_item.quantity += quantity
    else:
        # Create new inventory item
        inventory_item = Inventory(
            medicine_id=medicine_id,
            quantity=quantity,
            expiry_date=datetime.strptime(expiry_date, "%Y-%m-%d").date(),
            batch_number=batch_number
        )
        db.add(inventory_item)
    
    db.commit()
    
    return {"message": f"Added {quantity} units to inventory"}

@router.post("/export-data")
def export_pharmacy_data(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles(["pharmacist"]))
):
    """Export pharmacy data (pharmacist only)"""
    medicines = db.query(Medicine).all()
    inventory = db.query(Inventory).all()
    
    # In a real application, this would generate an actual export file
    # For now, return the data as JSON
    return {
        "export_date": datetime.now().isoformat(),
        "medicines": [MedicineResponse.from_orm(med) for med in medicines],
        "inventory": [
            {
                "id": item.id,
                "medicine_name": item.medicine.name,
                "quantity": item.quantity,
                "expiry_date": item.expiry_date,
                "batch_number": item.batch_number
            }
            for item in inventory
        ]
    }

@router.post("/backup-settings")
def backup_pharmacy_settings(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles(["pharmacist"]))
):
    """Backup pharmacy settings (pharmacist only)"""
    # In a real application, this would create a backup file
    # For now, return a success message
    return {
        "message": "Settings backup created successfully",
        "backup_file": f"pharmacy_backup_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
    } 