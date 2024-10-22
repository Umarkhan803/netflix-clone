import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./page/Home/Home";
import SignUp from "./page/SignUp";
import LogIn from "./page/LogIn";
import Footer from "./components/Footer";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
