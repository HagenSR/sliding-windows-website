import psycopg2
import json

byte_string = ""
with open("4326_nd.geotiff.tif", "rb") as fl:
    byte_string = fl.read()

credentials = ""
with open("credentials.json") as fl:
    credentials = json.load(fl)


conn = psycopg2.connect(host="localhost",
                        port=5432,
                        user= credentials["user"],
                        password= credentials["password"],
                        database=credentials["database"]) # To remove slash

cursor = conn.cursor()
cursor.execute("SELECT api_functions.insert_geotiff(%s)", (byte_string,))
cursor.close()
conn.commit()
conn.close()

    