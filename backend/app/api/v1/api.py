from fastapi import APIRouter
from app.api.v1.endpoints import auth, patients, doctors, appointments, prescriptions, lab, pharmacy, hospitals, system_admin

api_router = APIRouter()
api_router.include_router(auth.router)
api_router.include_router(patients.router)
api_router.include_router(doctors.router)
api_router.include_router(appointments.router)
api_router.include_router(prescriptions.router)
api_router.include_router(lab.router)
api_router.include_router(pharmacy.router)
api_router.include_router(hospitals.router)
api_router.include_router(system_admin.router) 