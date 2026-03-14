import cv2
import os
import time
import numpy as np
import pickle

BASE = os.path.dirname(os.path.abspath(__file__))
FACES = os.path.join(BASE, "faces")
os.makedirs(FACES, exist_ok=True)

name = input("Enter your name: ").strip()

person_dir = os.path.join(FACES, name)
os.makedirs(person_dir, exist_ok=True)

face_cascade = cv2.CascadeClassifier(
    cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
)

cam = cv2.VideoCapture(0, cv2.CAP_DSHOW)

count = 0
TOTAL = 5

print("Look at camera. Capturing 5 photos...")

while count < TOTAL:

    ret, frame = cam.read()
    if not ret:
        continue

    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.3, 5)

    for (x,y,w,h) in faces:

        face = gray[y:y+h, x:x+w]
        face = cv2.resize(face,(200,200))

        cv2.rectangle(frame,(x,y),(x+w,y+h),(0,255,0),2)

        cv2.putText(frame,f"Captured {count+1}/5",
        (x,y-10),cv2.FONT_HERSHEY_SIMPLEX,0.8,(0,255,0),2)

        cv2.imshow("Register",frame)
        cv2.waitKey(500)

        cv2.imwrite(os.path.join(person_dir,f"{count}.jpg"),face)

        count+=1
        time.sleep(2)

        break

    cv2.imshow("Register",frame)

    if cv2.waitKey(1)==27:
        break

cam.release()
cv2.destroyAllWindows()

print("Capture done. Training model...")

# ================= TRAINING =================

x=[]
y=[]
labels={}
current=0

for person in os.listdir(FACES):

    path=os.path.join(FACES,person)
    labels[current]=person

    for img in os.listdir(path):
        im=cv2.imread(os.path.join(path,img),cv2.IMREAD_GRAYSCALE)
        if im is None:
            continue
        im=cv2.resize(im,(200,200))
        x.append(im)
        y.append(current)

    current+=1

recognizer=cv2.face.LBPHFaceRecognizer_create()
recognizer.train(x,np.array(y))
recognizer.save("model.yml")

with open("labels.pkl","wb") as f:
    pickle.dump(labels,f)

print("Training completed.")
print("Registered:",labels)
