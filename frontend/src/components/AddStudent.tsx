import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addStudent } from "../services/api";
import { commonStyles as styles } from "./ui/commonStyles";

type Props = {
  onAdded: () => void;
};

export default function AddStudent({ onAdded }: Props) {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [showToast, setShowToast] = useState(false);

  const navigate = useNavigate();

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

   
    setShowToast(true);

    // אחרי שנייה → מעלימים + מעבר לדף הבית
    setTimeout(() => {
      setShowToast(false);
      navigate("/");
    }, 1200);
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

      {/* 🔥 TOAST */}
      {showToast && (
        <div style={styles.toastStyle}>
          ✔ התלמיד נוסף בהצלחה
        </div>
      )}
    </div>
  );
}

