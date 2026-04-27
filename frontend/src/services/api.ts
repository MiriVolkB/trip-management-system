const BASE_URL = "http://localhost:3001";

// 📚 תלמידים
export const getStudents = async () => {
  try {
    const res = await fetch(`${BASE_URL}/students`);
    console.log("STATUS:", res.status);

    const data = await res.json();
    console.log("DATA:", data);

    return data;
  } catch (err) {
    console.error("FETCH ERROR:", err);
  }
};

export const addStudent = async (data: any) => {
  const res = await fetch(`${BASE_URL}/students`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

// 👩‍🏫 מורות (עם role!)
export const getTeachers = async (teacherClass?: string) => {
  const url = teacherClass
    ? `${BASE_URL}/teachers?class=${teacherClass}`
    : `${BASE_URL}/teachers`;

  const res = await fetch(url, {
    headers: {
      role: "teacher", // 🔒 חשוב!
    },
  });

  return res.json();
};

export const addTeacher = async (data: any) => {
  const res = await fetch(`${BASE_URL}/teachers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};