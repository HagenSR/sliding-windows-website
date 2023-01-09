import psycopg2
import json
import base64

byte_string = ""
with open("cropped_slope_w=4.tif", "rb") as fl:
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
cursor.execute("SELECT api_functions.insert_geotiff(bytea %s, %s, %s)", (byte_string, 2, 1))
cursor.close()
conn.commit()
conn.close()

    