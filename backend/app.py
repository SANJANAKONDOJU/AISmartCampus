
from flask import Flask
from flask_cors import CORS

from routes.auth import auth_bp
from routes.faculty import faculty_bp
from routes.student import student_bp
from routes.complaint import complaint_bp
from routes.admin import admin_bp
from routes.worker import worker_bp
from routes.materials import materials_bp

app = Flask(__name__)
CORS(app)

# PREFIX ALL ROUTES
app.register_blueprint(auth_bp, url_prefix="/auth")
app.register_blueprint(faculty_bp)
app.register_blueprint(student_bp)
app.register_blueprint(complaint_bp)
app.register_blueprint(admin_bp)
app.register_blueprint(materials_bp)
app.register_blueprint(worker_bp)

if __name__ == "__main__":
    print("SERVER STARTED")
    app.run(debug=True)
