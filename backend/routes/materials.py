# from flask import Blueprint, request, jsonify
# import os

# material_bp = Blueprint("material", __name__)

# UPLOAD_FOLDER = "uploads"

# if not os.path.exists(UPLOAD_FOLDER):
#     os.mkdir(UPLOAD_FOLDER)

# @material_bp.route("/material/upload", methods=["POST"])
# def upload():
#     file = request.files["file"]
#     subject = request.form["subject"]

#     filename = subject + "_" + file.filename
#     file.save(os.path.join(UPLOAD_FOLDER, filename))

#     return jsonify({"success": True})

from flask import Blueprint, jsonify, request, send_from_directory
from database import db
import os
from werkzeug.utils import secure_filename
from flask_cors import cross_origin


materials_bp = Blueprint("materials", __name__)

materials = db["materials"]

UPLOAD_FOLDER = "uploads"

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Upload (Faculty)
@materials_bp.route("/materials", methods=["POST"])
def upload_material():

    file = request.files["file"]
    title = request.form["title"]
    faculty = request.form["faculty"]

    filename = secure_filename(file.filename)
    path = os.path.join(UPLOAD_FOLDER, filename)

    file.save(path)

    materials.insert_one({
        "title": title,
        "faculty": faculty,
        "file": filename,
        "reviews": []
    })

    return jsonify({"success": True})


# Get all materials (Students)
@materials_bp.route("/materials", methods=["GET"])
def get_materials():
    data = []

    for m in materials.find():
        m["_id"] = str(m["_id"])
        data.append(m)

    return jsonify(data)


# Serve file
@materials_bp.route("/materials/file/<name>")
def serve_file(name):
    return send_from_directory(UPLOAD_FOLDER, name)


# Student Review
@materials_bp.route("/materials/review/<mid>", methods=["POST","OPTIONS"])
@cross_origin()
def add_review(mid):
    data = request.json

    db.materials.update_one(
        {"_id": __import__("bson").ObjectId(mid)},
        {"$push": {"reviews": data}}
    )

    return jsonify({"success": True})
