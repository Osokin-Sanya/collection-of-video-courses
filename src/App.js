import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Course from "./components/Course";
import Сourses from "./features/Сourses";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Сourses />} />
        <Route exact path="/course/:id" element={<Course />} />
      </Routes>
    </Router>
  );
}
