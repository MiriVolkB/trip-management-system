import { useEffect, useState } from "react";
import { getTeachers } from "../services/api";

type Props = {
  refresh: boolean;
};

export default function TeachersList({ refresh }: Props) {
  const [teachers, setTeachers] = useState([]);
  const [filter, setFilter] = useState("");

  const loadTeachers = () => {
    getTeachers(filter).then(setTeachers);
  };

  useEffect(() => {
    loadTeachers();
  }, [refresh]);

  return (
    <div className="card">
      <h3>👩‍🏫 Teachers</h3>

      <input
        placeholder="Filter by class"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      <button onClick={loadTeachers}>Filter</button>

      {teachers.map((t: any) => (
  <div className="list-item" key={t._id}>
    {t.name} - {t.class}
  </div>
))}
    </div>
  );
}