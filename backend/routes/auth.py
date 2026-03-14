from flask import Blueprint, request, jsonify
from database import users
from werkzeug.security import generate_password_hash, check_password_hash

auth_bp = Blueprint("auth", __name__)

# REGISTER
@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.json

    email = data["email"]
    password = data["password"]
    role = data["role"]

    import re
    pattern = r"^[0-9]{12}@mvsrec\.edu\.in$"


    if not re.match(pattern, email):
        return jsonify({"success": False, "message": "Invalid college mail"})

    if users.find_one({"email": email}):
        return jsonify({"success": False, "message": "Already registered"})

    users.insert_one({
        "email": email,
        "password": generate_password_hash(password),
        "role": role.lower()
    })

    return jsonify({"success": True, "message": "Registered successfully"})


# LOGIN
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.json

    email = data["email"]
    password = data["password"]

    user = users.find_one({"email": email})

    if not user or not check_password_hash(user["password"], password):
        return jsonify({"success": False})

    return jsonify({
        "success": True,
        "role": user["role"]
    })
