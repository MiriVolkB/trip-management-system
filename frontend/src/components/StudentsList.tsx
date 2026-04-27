import { useEffect, useState } from "react";
import { getStudents } from "../services/api";

type Props = {
  refresh: boolean;
};

type Student = {
  _id: string;
  name: string;
  class: string;
};

export default function StudentsList({ refresh }: Props) {
  const [students, setStudents] = useState([]);


  useEffect(() => {
  getStudents().then((data) => {
    console.log("STUDENTS FROM SERVER:", data);
    setStudents(data);
  });
}, [refresh]);

  useEffect(() => {
    getStudents().then(setStudents);
  }, [refresh]);

  return (
    <div className="card">
      <h3>📋 Students</h3>
      

      {students.map((s: any) => (
  <div className="list-item" key={s._id}>
    {s.name} - {s.id} - {s.class}  </div>
))}
    </div>
  );
}

