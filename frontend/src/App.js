import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./screens/Register";
import HomeScreen from "./screens/HomeScreen";
import Quizr from "./screens/Quiz";
import Login from "./screens/Login";
import Logout from "./screens/Logout";
import MyResult from "./screens/MyResult";
import Teacher from "./screens/Teachers";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import "./cat.css";
import Profile from "./screens/Profile";
import UpdateProfile from "./screens/UpdateProfile";
import ResultByUsers from "./screens/ResultByUsers";
import CreateQuiz from "./screens/CreateQuiz";
import CreateQestions from "./screens/CreateQestions";
import QuizTeacher from "./screens/QuizTeacher";
import TeacherQuizzes from "./screens/TeacherQuizzes";
function App() {
  return (
    <Router>
      <Header />
      <main>
        <Container>
          <Routes>
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/" element={<HomeScreen />} />
            <Route exact path="/logout" element={<Logout />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/quiz/:id" element={<Quizr />} />
            <Route exact path="/myresult" element={<MyResult />} />
            <Route exact path="/admin/teacher" element={<Teacher />} />
            <Route
              exact
              path="/admin/teacher/quizzes"
              element={<TeacherQuizzes />}
            />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/createquiz" element={<CreateQuiz />} />
            <Route exact path="/profile/update" element={<UpdateProfile />} />
            <Route exact path="/results/:id" element={<ResultByUsers />} />
            <Route exact path="/quizteacher/:id" element={<QuizTeacher />} />
            <Route
              exact
              path="/createquestions/:id"
              element={<CreateQestions />}
            />

            {/* <Route path="*" component={NotFound} /> */}
          </Routes>
        </Container>
      </main>
    </Router>
  );
}

export default App;
