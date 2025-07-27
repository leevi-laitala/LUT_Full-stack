import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header";

import Feed from "./pages/Feed";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
    return (
        <>
            <Router>
                <div className="container">
                    <Header />
                    <Routes>
                        <Route path="/" element={<Feed />} />
                        <Route path="/:id" element={<Post />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </div>
            </Router>
            <ToastContainer />
        </>
    );
}

export default App;
