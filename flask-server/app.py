from flask import Flask, send_file, Response
import json

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

# Returns tiff image as array of bytes
@app.route("/get-tiff-text")
def get_tiff_text():
    with open("static/wiki_tiff.tiff", "rb") as fl:
        return fl.read()
