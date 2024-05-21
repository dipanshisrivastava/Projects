-- setup.sql

-- Create the database
CREATE DATABASE patients_db;

-- Use the database
USE patients_db;

-- Create the table
CREATE TABLE patients_db (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    gender VARCHAR(50) NOT NULL,
    age INT NOT NULL,
    mobile_no VARCHAR(15) NOT NULL,
    email VARCHAR(255) NOT NULL,
    appointment DATETIME
);

-- -- Insert data into the table
-- INSERT INTO patients (name, gender, age, mobile_no, email, appointment) VALUES 
-- ('John Doe', 'Male', 30, '1234567890', 'john.doe@example.com', '2024-05-20 15:00:00'),
-- ('Jane Smith', 'Female', 28, '0987654321', 'jane.smith@example.com', '2024-05-21 16:00:00');
