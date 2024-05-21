from pydantic import BaseModel
from typing import Optional

class PatientBase(BaseModel):
    name: str
    gender: str
    age: int
    mobileNo: str
    email: str
    appointment: Optional[str] = None

class PatientCreate(PatientBase):
    pass

class PatientUpdate(PatientBase):
    pass

class Patient(PatientBase):
    id: int

    class Config:
        orm_mode = True
