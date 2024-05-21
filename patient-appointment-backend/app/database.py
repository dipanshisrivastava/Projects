import mysql.connector

mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="astha@123456789",
    database="patients_db"
)

mycursor = mydb.cursor()

def insertQuery (col_name, col_values, table_name):
    query = "INSERT INTO "
    query = query + table_name + "("
    icounter = len(col_name) - 1
    for items in col_name :
        if icounter != 0:
            query = query + items + ", "
        else :
            query = query + items + ") VALUES ("
        icounter = icounter - 1

    icounter = len(col_values) - 1
    for items in col_values :
        if icounter >0:
            query = query + "'" + str(items) + "'" + ", "
        else :
            query = query + "'" + items + "'" + ")"
        icounter = icounter - 1
    print("in database, in insert query ",query)
    mycursor.execute(query)
    mydb.commit()
    print("Successfully added!")

def fetchQuery():
    query = "SELECT * FROM patients"
    print("in database, in fetch query ", query)
    mycursor.execute(query)
    result = mycursor.fetchall()
    print(result)
    return result

def  addAppointmentQuery(table_name, appointment_date, patient_id):
    query = "UPDATE " + table_name + " SET Appointment = '" + appointment_date + "' WHERE id = " + str(patient_id);
    print(query)
    mycursor.execute(query)
    mydb.commit()
    print("Successfully updated!")