
from flask import Blueprint, request, jsonify
from database import db
from datetime import datetime
from bson import ObjectId


complaint_bp = Blueprint("complaint", __name__)

complaints = db["complaints"]

# CREATE COMPLAINT
@complaint_bp.route("/complaint", methods=["POST"])
def create_complaint():
    data = request.json

    complaint = {
        "title": data["title"],
        "category": data["category"],
        "location": data["location"],
        "priority": data["priority"],
        "description": data["description"],
        "reportedBy": data["reportedBy"],
        "status": "Reported",
        "createdAt": datetime.now(),
        "statusHistory": [
            {
                "status": "Reported",
                "message": "Complaint reported successfully",
                "time": datetime.now()
            }
        ]
    }

    result = complaints.insert_one(complaint)

    return jsonify({
     "success": True,
     "id": str(result.inserted_id)
   })



# ADMIN GET ALL COMPLAINTS
@complaint_bp.route("/admin/complaints", methods=["GET"])
def get_complaints():
    all_complaints = []

    for c in complaints.find():
        c["_id"] = str(c["_id"])
        all_complaints.append(c)

    return jsonify(all_complaints)
@complaint_bp.route("/complaints/<cid>", methods=["GET"])
def get_single_complaint(cid):
    complaint = complaints.find_one({"_id": ObjectId(cid)})

    if not complaint:
        return jsonify({"message": "Complaint not found"}), 404

    complaint["_id"] = str(complaint["_id"])

    return jsonify(complaint)
@complaint_bp.route("/complaints/user/<email>", methods=["GET"])
def get_user_complaints(email):
    result = []

    for c in complaints.find({"reportedBy.email": email}):
        c["_id"] = str(c["_id"])
        result.append(c)

    return jsonify(result)
@complaint_bp.route("/admin/update/<cid>", methods=["PUT"])
def admin_update(cid):
    data = request.json

    update = {}

    if "assignedTo" in data:
        update["assignedTo"] = data["assignedTo"]
        update["status"] = "Assigned"

    if "status" in data:
        update["status"] = data["status"]

    if "deadlineDate" in data:
        update["deadlineDate"] = data["deadlineDate"]

    complaints.update_one(
        {"_id": ObjectId(cid)},
        {
            "$set": update,
            "$push": {
                "statusHistory": {
                    "status": update.get("status", "Updated"),
                    "message": "Updated",
                    "time": datetime.now()
                }
            }
        }
    )

    return jsonify({"success": True})


@complaint_bp.route("/my/<email>", methods=["GET","POST"])
def my_complaints(email):
    if request.method == "POST":
        data = request.json

        complaint = {
            "title": data["title"],
            "category": data["category"],
            "location": data["location"],
            "priority": data["priority"],
            "description": data["description"],
            "reportedBy": data["reportedBy"],
            "status": "Reported",
            "createdAt": datetime.now(),
            "statusHistory": [
                {
                    "status": "Reported",
                    "message": "Complaint reported successfully",
                    "time": datetime.now()
                }
            ]
        }

        result = complaints.insert_one(complaint)

        return jsonify({"id": str(result.inserted_id)})

    # GET
    data = list(db.complaints.find({"reportedBy.email": email}))
    for c in data:
        c["_id"] = str(c["_id"])
    return jsonify(data)
@complaint_bp.route("/worker/<email>", methods=["GET"])
def worker_complaints(email):
    result = []

    for c in complaints.find({"assignedTo": email}):
        c["_id"] = str(c["_id"])
        result.append(c)

    return jsonify(result)
@complaint_bp.route("/worker/<email>")
def worker_jobs(email):
    data = list(db.complaints.find({"assignedTo": email}))
    for c in data:
        c["_id"] = str(c["_id"])
    return jsonify(data)

