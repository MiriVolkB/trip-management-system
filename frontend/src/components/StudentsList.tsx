import { useEffect, useState } from "react";
import { getStudents } from "../services/api";
import { commonStyles as common } from "../components/ui/commonStyles";

type Props = {
  refresh: boolean;
};

type Student = {
  _id: string;
  name: string;
  id: string;
  class: string;
};

export default function StudentsList({ refresh }: Props) {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    getStudents().then((data) => {
      console.log("STUDENTS FROM SERVER:", data);
      setStudents(data);
    });
  }, [refresh]);

  return (
    <div style={common.card}>
      <h3 style={{ marginBottom: "20px" }}>📋 תלמידים</h3>

      {/* HEADER */}
      <div style={styles.headerRow}>
        <span>שם</span>
        <span>ת"ז</span>
        <span>כיתה</span>
      </div>

      {/* DATA */}
      {students.map((s) => (
        <div style={styles.row} key={s._id}>
          <span>{s.name}</span>
          <span>{s.id}</span>
          <span>{s.class}</span>
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