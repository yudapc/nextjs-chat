import { io, Socket } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import { IMessage } from "./ChatPage.types";
import { useRouter } from "next/router";
import { getCookie, setCookie } from "cookies-next";

export const useChatPageAction = () => {
  const router = useRouter();
  const userId = getCookie("userId");
  const { room } = router.query;
  const socketIOHost: string = "http://localhost:8080";
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const socketRef = useRef<Socket | null>(null);

  const handleSendMessage = () => {
    if (currentMessage.trim() === "") return;
    const newMessage: IMessage = {
      text: currentMessage,
      sender: String(userId),
      roomId: Number(room),
    };
    if (socketRef.current) {
      socketRef.current.emit("newMessage", newMessage);
      setCurrentMessage("");
      socketRef.current?.on("dataMessages", (data) => setMessages(data));
    }
  };

  useEffect(() => {
    if (!userId) router.push("/login");
  }, [userId]);

  useEffect(() => {
    if (!room) return;
    socketRef.current = io(socketIOHost, {
      autoConnect: true,
      withCredentials: true,
    });

    socketRef.current?.emit("joinRoom", Number(room));
    setCookie("roomId", Number(room));

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
  }, [room]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const listenListMessages = () => {
    const currentRoomId = getCookie("roomId");
    socketRef.current?.emit("listDataMessages", { roomId: currentRoomId });

    socketRef.current?.on("dataMessages", (messages) => {
      const messagesMap = messages.map((message: IMessage) => ({
        ...message,
        sender: message.sender === userId ? "me" : message.sender,
      }));
      setMessages(messagesMap);
    });
  };

  listenListMessages();

  return {
    handleSendMessage,
    messages,
    currentMessage,
    handleKeyDown,
    setCurrentMessage,
  };
};
