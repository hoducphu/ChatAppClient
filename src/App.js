import "./App.css";
import ChatPage from "./pages/ChatPage";
import Home from "./pages/Home";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import Contact from "./pages/Contact";
import News from "./pages/News";
import ChatProvider from "./context/ChatProvider";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <ChatProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/news" element={<News />} />
          </Routes>
        </div>
      </ChatProvider>
    </Router>
  );
}

export default App;
