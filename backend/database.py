from pymongo import MongoClient

client = MongoClient("mongodb+srv://sanju081105_db_user:sanju6186@cluster0.n49e70w.mongodb.net/?appName=Cluster0")

db = client["smartcampus"]
users=db["users"]
students = db["students"]
attendance = db["attendance"]
