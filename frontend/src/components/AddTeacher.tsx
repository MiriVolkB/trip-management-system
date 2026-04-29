import { useState } from "react";
import { addTeacher } from "../services/api";
import {commonStyles  as styles} from "./ui/commonStyles";

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

    onAdded();
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>הוספת מורה</h2>

        <input
          style={styles.input}
          placeholder="שם"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          style={styles.input}
          placeholder="תעודת זהות"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />

        <input
          style={styles.input}
          placeholder="כיתה"
          value={teacherClass}
          onChange={(e) => setTeacherClass(e.target.value)}
        />

        <button style={styles.button} onClick={handleSubmit}>
          הוסף מורה
        </button>
      </div>
    </div>
  );
}