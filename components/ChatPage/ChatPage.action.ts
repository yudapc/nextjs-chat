import { io, Socket } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import { IMessage } from "./ChatPage.types";

export const useChatPageAction = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [message, setMessage] = useState<string>("");
  const socketRef = useRef<Socket | null>(null);

  const handleSendMessage = () => {
    if (message.trim() === "") return;
    const newMessage = {
      id: messages.length + 1,
      content: message,
      sender: "me",
    };
    if (socketRef.current) {
      socketRef.current.emit("newMessage", newMessage);
      setMessage("");
      socketRef.current?.on("dataMessages", (data) => setMessages(data));
    }
  };

  useEffect(() => {
    socketRef.current = io("http://localhost:8080", {
      autoConnect: true,
      withCredentials: true,
    });

    socketRef.current.on("connect", () => {
      console.log("Connected to server");
    });

    socketRef.current.on("disconnect", () => {
      console.log("Disconnect to server");
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  socketRef.current?.emit("listDataMessages");

  socketRef.current?.on("messages", (messages) => {
    setMessages(messages);
  });

  return {
    handleSendMessage,
    messages,
    message,
    handleKeyDown,
    setMessage,
  };
};
