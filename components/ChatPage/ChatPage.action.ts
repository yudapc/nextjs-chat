import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getCookie, setCookie } from "cookies-next";
import { IMessage } from "@/shared/types/message";
import useWebSocket from "react-use-websocket";

export const useChatPageAction = () => {
  const router = useRouter();
  const userId = getCookie("userId");
  const { room } = router.query;

  const [dataMessages, setDataMessages] = useState<IMessage[]>([]);
  const [textMessage, setTextMessage] = useState<string>("");
  const { sendJsonMessage, lastMessage, readyState } = useWebSocket(
    "ws://localhost:8080",
    {
      onOpen: () => console.log("WS-Stream connected."),
      onClose: () => console.log("WS-Stream disconnected."),
      shouldReconnect: () => true,
      onMessage: (event: WebSocketEventMap["message"]) =>
        console.log(event.data),
    },
  );

  const handleJoinRoom = () => {
    if (readyState > 0) {
      sendJsonMessage({
        event: "joinRoom",
        data: {
          room: String(room),
        },
      });
      setTextMessage("");
    }
  };

  const handleChangeText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setTextMessage(value);
  };

  const handleSendMessage = () => {
    if (textMessage.trim() === "" && readyState <= 0) {
      return;
    } else {
      sendJsonMessage({
        event: "message",
        data: {
          text: textMessage,
          sender: userId,
          room: String(room),
        },
      });
      setTextMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleGetData = (lastMessageData: MessageEvent<any>) => {
    const dataObject = JSON.parse(lastMessageData.data);

    setDataMessages([...dataMessages, ...dataObject]);
  };

  useEffect(() => {
    if (
      lastMessage &&
      lastMessage !== null &&
      typeof lastMessage?.data === "string"
    ) {
      handleGetData(lastMessage);
    }
  }, [lastMessage]);

  useEffect(() => {
    if (!userId) router.push("/login");
  }, [userId]);

  useEffect(() => {
    if (!room) {
      return;
    } else {
      handleJoinRoom();
    }
  }, [room]);

  return {
    handleSendMessage,
    dataMessages,
    textMessage,
    handleKeyDown,
    handleChangeText,
    userId: String(userId),
  };
};
