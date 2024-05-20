from pydantic import BaseModel

class PatientBase(BaseModel):
    name: str
    gender: str
    age: int
    mobileNo: str
    email: str
    appointment: str = None

class PatientCreate(PatientBase):
    pass

class PatientUpdate(PatientBase):
    pass

class Patient(PatientBase):
    id: int

    class Config:
        orm_mode = True
