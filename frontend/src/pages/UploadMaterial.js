
import { useState } from "react";

export default function UploadMaterial() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");

  const upload = async () => {
    if (!file || !title) {
      alert("Select file and enter title");
      return;
    }

    const form = new FormData();
    form.append("file", file);
    form.append("title", title);
    form.append("faculty", localStorage.getItem("email"));

    await fetch("http://127.0.0.1:5000/materials", {
      method: "POST",
      body: form
    });

    alert("Material uploaded");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Upload Study Material</h2>

      <input
        placeholder="Material Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <br /><br />

      <input
        type="file"
        onChange={e => setFile(e.target.files[0])}
      />

      <br /><br />

      <button onClick={upload}>Upload</button>
    </div>
  );
}
