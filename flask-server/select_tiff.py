import psycopg2
import json


credentials = ""
with open("credentials.json") as fl:
    credentials = json.load(fl)


conn = psycopg2.connect(host="localhost",
                        port=5432,
                        user= credentials["user"],
                        password= credentials["password"],
                        database=credentials["database"])

cursor = conn.cursor()
cursor.execute("SELECT api_functions.retrieve_tiff(%s)", (1,))
row = cursor.fetchone()

with open("out.tif", "wb") as fl:
    fl.write(row[0])

cursor.close()
conn.commit()
conn.close()

    