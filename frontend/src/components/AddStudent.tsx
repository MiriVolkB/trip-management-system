import { useState } from "react";
import { addStudent } from "../services/api";
import {commonStyles  as styles} from "./ui/commonStyles";


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

    onAdded();
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>➕ הוספת תלמיד</h2>

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
          value={studentClass}
          onChange={(e) => setStudentClass(e.target.value)}
        />

        <button style={styles.button} onClick={handleSubmit}>
          הוסף תלמיד
        </button>
      </div>
    </div>
  );
}