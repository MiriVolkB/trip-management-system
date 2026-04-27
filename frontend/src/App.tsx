import { useState } from "react";
import AddTeacher from "./components/AddTeacher";
import AddStudent from "./components/AddStudent";
import StudentsList from "./components/StudentsList";
import TeachersList from "./components/TeachersList";

function App() {
    // שליטה בהצגה
  const [showStudents, setShowStudents] = useState(false);
  const [showTeachers, setShowTeachers] = useState(false);

   // חדש – טריגר לריענון
  const [refreshStudents, setRefreshStudents] = useState(false);
  const [refreshTeachers, setRefreshTeachers] = useState(false);


  return (
    <div className="page-wrapper">
      <div className="app-container">
        <header className="app-header">
          <h1>Trip Management</h1>
          <p>Organize your travelers and staff in one place</p>
        </header>

        <div className="main-layout">
          {/* Action Sidebar */}
          <aside className="action-sidebar">
            <AddStudent onAdded={() => setRefreshStudents(prev => !prev)} />

          <AddTeacher onAdded={() => setRefreshTeachers(prev => !prev)} />

          </aside>

          {/* List Content */}
          <main className="content-area">
            <nav className="pill-nav">
              <button onClick={() => setShowStudents(!showStudents)}>
            📋 Get Students
          </button>

          <button onClick={() => setShowTeachers(!showTeachers)}>
            👩‍🏫 Get Teachers
          </button>
          </nav>

            <div className="list-display card">
              {showStudents && <StudentsList refresh={refreshStudents} />}
              {showTeachers && <TeachersList refresh={refreshTeachers} />}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;