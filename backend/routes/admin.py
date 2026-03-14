from flask import Blueprint, jsonify
from database import users

admin_bp = Blueprint("admin", __name__)

# Get all workers
@admin_bp.route("/admin/workers", methods=["GET"])
def get_workers():
    workers = []

    for u in users.find({"role": "worker"}):
        workers.append(u["email"])

    return jsonify(workers)
