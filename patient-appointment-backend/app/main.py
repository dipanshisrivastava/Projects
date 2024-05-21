from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from . import crud, models, schemas
# from .database import SessionLocal, engine

# models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Add your frontend URL here
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()

@app.post("/patients/")
def create_patient(patient: dict):
    print("in main, in create, patient", patient)
    crud.create_patient(patient)
    return {"msg": "Successfully added!"}

@app.get("/patients/")
def read_patients():
    patients = crud.get_patients()
    print("in main, in get, fetched patients details from database ", patients)
    return patients


# @app.get("/patients/{patient_id}", response_model=schemas.Patient)
# def read_patient(patient_id: int, db: Session = Depends(get_db)):
#     db_patient = crud.get_patient(db, patient_id=patient_id)
#     if db_patient is None:
#         raise HTTPException(status_code=404, detail="Patient not found")
#     return db_patient

@app.put("/patients/{patient_id}", response_model=schemas.Patient)
def update_patient(patient: dict):
    print("in main, in update, patient", patient)
    crud.add_appointment(patient)
    return {"msg": "Successfully updated!"}

# @app.delete("/patients/{patient_id}", response_model=schemas.Patient)
# def delete_patient(patient_id: int, db: Session = Depends(get_db)):
#     return crud.delete_patient(db=db, patient_id=patient_id)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
