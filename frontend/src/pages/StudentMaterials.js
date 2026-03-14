
// }
import { useEffect, useState } from "react";

export default function StudentMaterials() {

  const [materials,setMaterials] = useState([]);
  const email = localStorage.getItem("email");

  useEffect(()=>{
    fetch("http://127.0.0.1:5000/materials")
      .then(r=>r.json())
      .then(d=>setMaterials(d));
  },[]);

  const review = async(id)=>{
  const rating = prompt("Give rating out of 10 (0–10)");
  if(rating === null) return;

  if(isNaN(rating) || rating < 0 || rating > 10){
    alert("Please enter number between 0 and 10");
    return;
  }

  const msg = prompt("Write your feedback");

  if(!msg) return;

  await fetch(`http://127.0.0.1:5000/materials/review/${id}`,{
    method:"POST",
    headers:{ "Content-Type":"application/json"},
    body:JSON.stringify({
      student: email,
      rating: rating,
      message: msg
    })
  });

  alert(`⭐ Thanks! You rated ${rating}/10`);

  window.location.reload();
};


  return (
    <div>

      <h2>Study Materials</h2>

      {materials.map(m=>(
        <div key={m._id} style={{border:"1px solid gray",padding:10,margin:10}}>

          <b>{m.title}</b>

          <br/>

          <a
            href={`http://127.0.0.1:5000/materials/file/${m.file}`}
            target="_blank"
          >
            Open
          </a>

          <br/>

          <button onClick={()=>review(m._id)}>
            Review
          </button>

        </div>
      ))}

    </div>
  );
}
