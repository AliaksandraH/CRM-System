import { useState } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Home from "./pages/home/home";
import LogIn from "./pages/logIn/logIn";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    const [responsibleUser, setResponsibleUser] = useState({});

    return (
        <Router>
            <ToastContainer />
            <Routes>
                <Route
                    path="/"
                    element={<LogIn setResponsibleUser={setResponsibleUser} />}
                />
                <Route
                    path="/home/:id"
                    element={<Home responsibleUser={responsibleUser} />}
                />
            </Routes>
        </Router>
    );
}

export default App;
