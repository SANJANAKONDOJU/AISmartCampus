from flask import Blueprint, jsonify
from database import db

worker_bp = Blueprint("worker", __name__)

@worker_bp.route("/worker/my/<email>")
def my_work(email):
    data = list(db.complaints.find({"assignedTo": email}))

    for c in data:
        c["_id"] = str(c["_id"])

    return jsonify(data)
@worker_bp.route("/worker/my/<email>")
def worker_jobs(email):

    data = list(db.complaints.find({"assignedTo": email}))

    for c in data:
        c["_id"] = str(c["_id"])

    return jsonify(data)
