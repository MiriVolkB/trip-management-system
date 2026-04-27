import { useState } from "react";
import { addTeacher } from "../services/api";

type Props = {
  onAdded: () => void;
};

export default function AddTeacher({ onAdded }: Props) {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [teacherClass, setTeacherClass] = useState("");

  const handleSubmit = async () => {
    await addTeacher({
      name,
      id,
      class: teacherClass,
    });

    setName("");
    setId("");
    setTeacherClass("");

    onAdded(); // אומר ל-App: תתרענן    
  };

  return (
    <div className="card">
      <h3>  + Add Teacher</h3>
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
        value={teacherClass}
        onChange={(e) => setTeacherClass(e.target.value)}
      />
      <button onClick={handleSubmit}>Add</button>
    </div>
  );
}