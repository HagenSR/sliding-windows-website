import io
import os
from flask import Flask, send_file, request, jsonify
from flask_cors import CORS
import hashlib
from werkzeug.utils import secure_filename
from windowagg.sliding_window import SlidingWindow
from dataAccess import DataAccess

app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = "./store"

dataAccess = DataAccess()

op_id_to_desc = dataAccess.get_operations()

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/check_for_tiff")
def check_for_tiff():
    file_sha_256 = request.args.get('file_sha256')
    win_size = request.args.get('win_size')
    op_id = request.args.get('op_id')
    return jsonify(dataAccess.check(file_sha_256, win_size, op_id))


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() == "tif"


@app.route("/insert_tiff", methods=['POST'])
def insert_tiff():
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            return 'No file part'
        file = request.files['file']
        win_size = int(request.args.get('win_size'))
        op_id = int(request.args.get('op_id'))
        # If the user does not select a file, the browser submits an
        # empty file without a filename.
        if file.filename == '':
            return 'No file selected'
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            hash = ""
            with open(filename, "rb") as fl:
                hash = hashlib.sha256(fl.read())
            id = dataAccess.check(hash.hexdigest(), win_size, op_id)
            if id:
                return jsonify(get_meta_data(id))
            else:
                new_file_name = execute_sliding_windows()
                byte_string = ""
                with open(new_file_name, "rb") as fl:
                    byte_string = fl.read()
                id = dataAccess.insert(byte_string, hash.hexdigest(), win_size, op_id)
                return jsonify(get_meta_data(id))
            # return jsonify(insert(file.stream.read()))
        return "File not allowed"


# Returns tiff image as array of bytes
@app.route("/retrieve_tiff")
def retrieve_tiff():
    img_id = request.args.get('img_id')
    row = dataAccess.retrieve_tiff(img_id)
    return send_file(
        io.BytesIO(row[0].tobytes()),
        download_name='geotiff.tif',
        mimetype='bytes'
    )


@app.route("/get_meta_data")
def get_meta_data():
    img_id = request.args.get('img_id')
    res = dataAccess.get_meta_data(img_id)
    return jsonify(res)


@app.route("/get_operations")
def get_ops():
    res = dataAccess.get_operations()
    return jsonify(res)


def execute_sliding_windows(filePath, win_size, operation):
    new_file_name = ""
    with SlidingWindow(filePath) as slide_window:
        # slide_window.auto_plot = self.auto_plot
        slide_window.initialize_dem()
        slide_window.aggregate_dem(win_size)
        new_file_name = slide_window.dem_slope()
