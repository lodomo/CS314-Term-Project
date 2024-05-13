import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/loginPage";
import Chats from "./components/chats";
import { ChakraProvider } from "@chakra-ui/react";
//import ChatProvider from "./components/chatcontext";

const App = () => {
  return (
    // <ChatProvider>
    <Router>
      <ChakraProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/chats" element={<Chats />} />
          </Routes>
        </div>
      </ChakraProvider>
    </Router>
    // </ChatProvider>
  );
};

export default App;
