import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedRoom, setSelectedRoom] = useState();
  const [user, setUser] = useState();
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState();
  const [roomSelectedIndex, setRoomSelectedIndex] = useState();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
    if (!userInfo && location.pathname === "/chat") navigate("/");
  }, [navigate, location]);

  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        selectedRoom,
        setSelectedRoom,
        roomSelectedIndex,
        setRoomSelectedIndex,
        notification,
        setNotification,
        chats,
        setChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
