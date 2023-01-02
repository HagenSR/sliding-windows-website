from flask import Flask, send_file, Response, request, jsonify
import json
import psycopg2
import base64
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

credentials = ""
with open("credentials.json") as fl:
    credentials = json.load(fl)

conn = psycopg2.connect(host="localhost",
                        port=5432,
                        user= credentials["user"],
                        password= credentials["password"],
                        database=credentials["database"])

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

# Returns tiff image as array of bytes
@app.route("/check_for_tiff")
def check_for_tiff():
    file_sha_256 = request.args.get('file_sha256')
    cursor = conn.cursor()
    cursor.execute("SELECT api_functions.check_for_geotiff(bytea %s)", (file_sha_256,))
    row = cursor.fetchone()[0]
    return jsonify(row)

@app.route("/insert_tiff")
def insert_tiff():
    file_sha_256 = request.args.get('file_sha256')
    cursor = conn.cursor()
    cursor.execute("SELECT api_functions.check_for_geotiff(bytea %s)", (file_sha_256,))
    row = cursor.fetchone()
    return jsonify(row)

# Returns tiff image as array of bytes
@app.route("/retrieve_tiff")
def retrieve_tiff():
    file_sha_256 = request.args.get('file_sha256')
    cursor = conn.cursor()
    cursor.execute("SELECT api_functions.retrieve_tiff(bytea %s)", (file_sha_256,))
    row = cursor.fetchone()
    return jsonify(row)
