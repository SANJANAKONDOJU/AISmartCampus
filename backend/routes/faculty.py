
from flask import Blueprint, jsonify
import subprocess
import os

faculty_bp = Blueprint("faculty", __name__)

process = None

@faculty_bp.route("/faculty/ai", methods=["POST"])
def start_ai():
    global process

    if process and process.poll() is None:
        return jsonify({"status": "already running"})

    BASE = os.path.dirname(os.path.abspath(__file__))
    AI_PATH = os.path.join(BASE, "..", "..", "ai", "attendance.py")

    process = subprocess.Popen(["python", AI_PATH])

    return jsonify({"status": "started"})
