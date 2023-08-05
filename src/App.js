import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "./Components/dashboard";
import Login from "./Components/login";
import Signup from "./Components/signup";
import Question from "./Components/question";
import { useEffect, useState } from "react";
import Search from "./Components/search";
import Base from "./Base/base";
import Postquestion from "./Components/postquestion";
import Users from "./Components/users";
import Tags from "./Components/tags";
import Tagques from "./Components/tagQues";
import Userques from "./Components/userQuestions";
import Profile from "./Components/myprofile";
import Editquestion from "./Components/edit";

function App() {
  const [questions, setQuestions] = useState([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const isTokenStored = () => {
    const token = localStorage.getItem("token");
    return token !== null;
  };
  const redirectToLogin = () => {
    navigate("/login");
  };
  useEffect(() => {
    async function fetchURL() {
      const res = await fetch(
        "https://stackoverflow-clone-2zgy.onrender.com/api/notes/all",
        {
          method: "GET",
        }
      );
      const result = await res.json();

      if (result.data) {
        setQuestions(result.data);
      }
    }
    fetchURL();
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Dashboard questions={questions} setQuestions={setQuestions} />
          }
        />

        <Route path="/question/:id" element={<Question />} />
        <Route
          path="/base"
          element={<Base query={query} setQuery={setQuery} />}
        />
        <Route
          path="/search/:query"
          element={<Search questions={questions} setQuestions={setQuestions} />}
        />
        <Route
          path="/postquestion"
          element={
            <Postquestion questions={questions} setQuestions={setQuestions} />
          }
        />
        <Route path="/users" element={<Users />} />
        <Route
          path="/tags"
          element={<Tags questions={questions} setQuestions={setQuestions} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/taggedques/:tag" element={<Tagques />} />
        <Route path="/userquestions/:id" element={<Userques />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit/:id" element={<Editquestion />} />
      </Routes>
    </div>
  );
}

export default App;
