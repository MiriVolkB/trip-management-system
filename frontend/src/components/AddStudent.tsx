import { useState } from "react";
import { addStudent } from "../services/api";

type Props = {
  onAdded: () => void;
};

export default function AddStudent({ onAdded }: Props) {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [studentClass, setStudentClass] = useState("");

  const handleSubmit = async () => {
    await addStudent({
      name,
      id,
      class: studentClass,
    });

    setName("");
    setId("");
    setStudentClass("");
    

    onAdded(); // מפעיל ריענון
  };

  return (
    <div className="card">
      <h3>  +  Add Student</h3>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Id"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />

      <input
        placeholder="Class"
        value={studentClass}
        onChange={(e) => setStudentClass(e.target.value)}
      />

      <button onClick={handleSubmit}>Add</button>
    </div>
  );
}