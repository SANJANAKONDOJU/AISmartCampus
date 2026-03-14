
from flask import Blueprint, jsonify
from database import attendance

student_bp = Blueprint("student", __name__)

@student_bp.route("/student/attendance/<email>")
def attendance_status(email):
    present = attendance.count_documents({"student": email})
    dates = attendance.distinct("date")
    total = len(dates)

    if total == 0:
        percentage = 0
    else:
        percentage = int((present / total) * 100)

    return jsonify({
        "present": present,
        "total": total,
        "percentage": percentage
    })

