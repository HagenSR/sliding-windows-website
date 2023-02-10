import io
import os
from flask import Flask, send_file, request, jsonify
from flask_cors import CORS
import hashlib
import rasterio
from werkzeug.utils import secure_filename
from windowagg.sliding_window import SlidingWindow
from dataAccess import DataAccess
from werkzeug.exceptions import HTTPException

app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = "./store"

dataAccess = DataAccess()

op_id_to_desc = DataAccess.arrayToDict(dataAccess.get_operations())

@app.errorhandler(Exception)
def handle_exception(e):
    return jsonify(error=str(e)), 404

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
            return 'No file part', 400
        file = request.files['file']
        win_size = int(request.args.get('win_size'))
        op_id = int(request.args.get('op_id'))
        dtype = request.args.get('dtype')
        # If the user does not select a file, the browser submits an
        # empty file without a filename.
        filename = ""
        meta_data_to_return = "File not allowed", 400
        if file.filename == '':
            return 'No file selected', 400
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            filename = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(filename)
            hash = ""
            with open(filename, "rb") as fl:
                hash = hashlib.sha256(fl.read())
            id = dataAccess.check(hash.hexdigest(), win_size, op_id)
            if id:
                meta_data_to_return = jsonify(dataAccess.get_meta_data(id)), 200
            else:
                new_file_name, bounds = execute_sliding_windows(filename, win_size, op_id, dtype)
                byte_string = ""
                with open(new_file_name, "rb") as fl:
                    byte_string = fl.read()
                id = dataAccess.insert(byte_string, hash.hexdigest(), win_size, op_id, new_file_name, bounds)
                os.remove(new_file_name)
                meta_data_to_return = jsonify(dataAccess.get_meta_data(id["insert_geotiff"])), 200
        os.remove(filename)
        return meta_data_to_return


# Returns tiff image as array of bytes
@app.route("/retrieve_tiff")
def retrieve_tiff():
    img_id = request.args.get('img_id')
    row = dataAccess.retrieve_tiff(img_id)
    return send_file(
        io.BytesIO(row["retrieve_tiff"].tobytes()),
        download_name='geotiff.tif',
        mimetype='bytes'
    )


@app.route("/get_meta_data")
def get_meta_data():
    img_id = request.args.get('img_id')
    res = dataAccess.get_meta_data(img_id)
    return jsonify(res)

@app.route("/get_tiffs_inside_bounds")
def get_tiffs_inside_bounds():
    min_x = request.args.get('min_x')
    min_y = request.args.get('min_y')
    max_x = request.args.get('max_x')
    max_y = request.args.get('max_y')
    res = dataAccess.get_tiffs_inside_bounds(min_x, min_y, max_x, max_y)
    return jsonify(res)


@app.route("/get_operations")
def get_ops():
    res = dataAccess.get_operations()
    return jsonify(res)


def execute_sliding_windows(filePath, win_size, operation, dtype : str):
    new_file_name = ""
    with SlidingWindow(filePath, dtype=getattr(rasterio, dtype)) as slide_window:
        # slide_window.auto_plot = self.auto_plot
        slide_window.initialize_dem()
        slide_window.aggregate_dem(win_size)
        if op_id_to_desc[operation] == "dem_slope": 
            new_file_name = slide_window.dem_slope()
        elif op_id_to_desc[operation] == "dem_profile": 
            new_file_name = slide_window.dem_profile()
        elif op_id_to_desc[operation] == "dem_tangential": 
            new_file_name = slide_window.dem_tangential()
        elif op_id_to_desc[operation] == "dem_contour": 
            new_file_name = slide_window.dem_contour()
        elif op_id_to_desc[operation] == "dem_proper_profile": 
            new_file_name = slide_window.dem_proper_profile()
        elif op_id_to_desc[operation] == "dem_proper_tangential": 
            new_file_name = slide_window.dem_proper_tangential()
        else:
            raise Exception("Invalid operation")
    return new_file_name, slide_window._img.bounds