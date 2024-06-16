import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/home/home";
import LogIn from "./pages/logIn/logIn";
import "react-toastify/dist/ReactToastify.css";

function App() {
    return (
        <Router>
            <ToastContainer />
            <Routes>
                <Route path="/" element={<LogIn />} />
                <Route path="/home/:id" element={<Home />} />
            </Routes>
        </Router>
    );
}

export default App;
