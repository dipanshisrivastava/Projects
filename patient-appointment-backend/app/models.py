from sqlalchemy import Column, Integer, String
from .database import Base

class Patient(Base):
    __tablename__ = "patients"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    gender = Column(String)
    age = Column(Integer)
    mobileNo = Column(String)
    email = Column(String, unique=True, index=True)
    appointment = Column(String, nullable=True)
