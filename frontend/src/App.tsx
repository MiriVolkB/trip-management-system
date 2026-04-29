import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import TeacherDashboard from "./components/TeacherDashboard";
import { useState } from "react";
import AddStudent from "./components/AddStudent";
import AddTeacher from "./components/AddTeacher";

function App() {
  const [user, setUser] = useState<any>(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/login" element={<Login onLogin={setUser} />} />

<Route
  path="/add-teacher"
  element={<AddTeacher onAdded={() => console.log("added")} />}
/>

<Route
  path="/add-student"
  element={<AddStudent onAdded={() => console.log("added")} />}
/>

      


        <Route
          path="/dashboard"
          element={
            user?.role === "TEACHER" ? (
              <TeacherDashboard />
            ) : (
              <h1>Access Denied</h1>
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;