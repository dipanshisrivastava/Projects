# from sqlalchemy.orm import Session
from . import models, schemas
# from app.models import Patient
from app.schemas import PatientCreate
from . import database

# def get_patient(db: Session, patient_id: int):
#     return db.query(models.Patient).filter(models.Patient.id == patient_id).first()

def get_patients():
    return database.fetchQuery()

# def create_patient(db: Session, patient: schemas.PatientCreate):
#     print("Patient data", patient)
    # db_patient = models.Patient(**patient.dict())
    # print("db_patient", db_patient)
    # db.add(db_patient)
    # db.commit()
    # db.refresh(db_patient)
    # return db_patient
def create_patient(patient) :
    print('Inside crud, inside create_patient')
    print(patient)
    col_name = ['name', 'gender', 'age' , 'mobile_no', 'email']
    col_values = [patient["name"], patient["gender"], patient["age"], patient["mobile_no"], patient["email"]]
    table_name = "patients"
    return database.insertQuery (col_name, col_values, table_name)

def add_appointment(patient) :
    print('Inside crud, inside add_appointment, updated patients appointment ', patient)
    table_name = "patients"
    appointment_date = patient['appointment']
    patient_id = patient['0']
    database.addAppointmentQuery(table_name, appointment_date, patient_id)
# def update_patient(db: Session, patient_id: int, patient: schemas.PatientUpdate):
#     db_patient = db.query(models.Patient).filter(models.Patient.id == patient_id).first()
#     for key, value in patient.dict(exclude_unset=True).items():
#         setattr(db_patient, key, value)
#     db.commit()
#     db.refresh(db_patient)
#     return db_patient

# def delete_patient(db: Session, patient_id: int):
#     db_patient = db.query(models.Patient).filter(models.Patient.id == patient_id).first()
#     db.delete(db_patient)
#     db.commit()
#     return db_patient
