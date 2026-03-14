
# import cv2
# import pickle
# from datetime import date

# recognizer=cv2.face.LBPHFaceRecognizer_create()
# recognizer.read("model.yml")

# with open("labels.pkl","rb") as f:
#     labels=pickle.load(f)

# face=cv2.CascadeClassifier(
# cv2.data.haarcascades+"haarcascade_frontalface_default.xml")

# cam=cv2.VideoCapture(0,cv2.CAP_DSHOW)

# marked=set()

# while True:

#     ret,frame=cam.read()
#     if not ret:
#         continue

#     gray=cv2.cvtColor(frame,cv2.COLOR_BGR2GRAY)
#     faces=face.detectMultiScale(gray,1.3,5)

#     for (x,y,w,h) in faces:

#         roi=gray[y:y+h,x:x+w]
#         roi=cv2.resize(roi,(200,200))

#         label,conf=recognizer.predict(roi)

#         if conf<70:

#             name=labels[label]

#             if name not in marked:
#                 msg=f"{name} - Marked"
#                 marked.add(name)
#                 color=(0,255,0)
#             else:
#                 msg=f"{name} - Already Marked"
#                 color=(255,255,0)

#         else:
#             msg="Unregistered"
#             color=(0,0,255)

#         cv2.rectangle(frame,(x,y),(x+w,y+h),color,2)
#         cv2.putText(frame,msg,(x,y-10),
#         cv2.FONT_HERSHEY_SIMPLEX,0.8,color,2)

#     cv2.imshow("Attendance",frame)

#     if cv2.waitKey(1)==27:
#         break

# cam.release()
# cv2.destroyAllWindows()
import cv2
import pickle
from datetime import date
from pymongo import MongoClient
import os
BASE = os.path.dirname(os.path.abspath(__file__))


# MongoDB
client = MongoClient("mongodb+srv://sanju081105_db_user:sanju6186@cluster0.n49e70w.mongodb.net/?appName=Cluster0")
db = client.smartcampus
attendance_db = db.attendance

today = date.today().isoformat()

recognizer = cv2.face.LBPHFaceRecognizer_create()
recognizer.read(os.path.join(BASE, "model.yml"))

with open(os.path.join(BASE, "labels.pkl"), "rb") as f:

    labels = pickle.load(f)

face = cv2.CascadeClassifier(
    cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
)

cam = cv2.VideoCapture(0, cv2.CAP_DSHOW)

marked = set()

while True:

    ret, frame = cam.read()
    if not ret:
        continue

    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = face.detectMultiScale(gray, 1.3, 5)

    for (x,y,w,h) in faces:

        roi = gray[y:y+h, x:x+w]
        roi = cv2.resize(roi, (200,200))

        label, conf = recognizer.predict(roi)

        if conf < 55:

            name = labels[label]

            record = attendance_db.find_one({
                "student": name,
                "date": today
            })

            if not record:

                attendance_db.insert_one({
                    "student": name,
                    "date": today
                })

                msg = f"{name} - Marked"
                color = (0,255,0)

            else:
                msg = f"{name} - Already Marked"
                color = (255,255,0)

        else:
            msg = "Unregistered"
            color = (0,0,255)

        cv2.rectangle(frame,(x,y),(x+w,y+h),color,2)
        cv2.putText(frame,msg,(x,y-10),
        cv2.FONT_HERSHEY_SIMPLEX,0.8,color,2)

    cv2.imshow("Attendance",frame)

    if cv2.waitKey(1)==27:
        break

cam.release()
cv2.destroyAllWindows()

