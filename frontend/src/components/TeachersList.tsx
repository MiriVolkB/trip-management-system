import { useEffect, useState } from "react";
import { getTeachers } from "../services/api";
import { commonStyles as common } from "../components/ui/commonStyles";

type Props = {
  refresh: boolean;
};

type Teacher = {
  _id: string;
  name: string;
  id: string;
  class: string;
};

export default function TeachersList({ refresh }: Props) {
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  useEffect(() => {
    getTeachers().then((data) => {
      console.log("TEACHERS FROM SERVER:", data);
      setTeachers(data);
    });
  }, [refresh]);

  return (
    <div style={common.card}>
      <h3 style={{ marginBottom: "20px" }}>👩‍🏫 מורים</h3>

      {/* HEADER */}
      <div style={styles.headerRow}>
        <span>שם</span>
        <span>ת"ז</span>
        <span>כיתה</span>
      </div>

      {/* DATA */}
      {teachers.map((t, index) => (
        <div
          key={t._id}
          style={{
            ...styles.row,
            background: index % 2 === 0 ? "#fafafa" : "white",
          }}
        >
          <span>{t.name}</span>
          <span>{t.id}</span>
          <span>{t.class}</span>
        </div>
      ))}
    </div>
  );
}

const styles = {
  headerRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    fontWeight: "bold",
    padding: "10px",
    borderBottom: "2px solid #ddd",
    marginBottom: "10px",
  },

  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    padding: "10px",
    borderBottom: "1px solid #eee",
  },
};