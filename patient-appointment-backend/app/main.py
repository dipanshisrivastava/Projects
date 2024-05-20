from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Patient(BaseModel):
    name: str
    gender: str
    age: int
    mobileNo: str
    email: str
# list
patients = []

@app.post("/patients/", response_model=Patient)
async def create_patient(patient_data: Patient):
    # Your logic to create the patient
    # Return a response with the created patient details
    # list
    patients.append(patient_data)
    return {"name": patient_data.name, "gender": patient_data.gender, "age": patient_data.age, "mobileNo": patient_data.mobileNo, "email": patient_data.email}

@app.get("/patients/", response_model=list[Patient])
async def get_patients():
    # Return the list of all patients
    return patients

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)