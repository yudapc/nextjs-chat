import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import { IMessage } from "@/shared/types/message";
import useWebSocket from "react-use-websocket";
import { configEnv } from "@/shared/env";

export const useChatPageAction = () => {
  const router = useRouter();
  const userId = getCookie("userId");
  const { room } = router.query;

  const [dataMessages, setDataMessages] = useState<IMessage[]>([]);
  const [textMessage, setTextMessage] = useState<string>("");

  const { sendJsonMessage, lastMessage, readyState } = useWebSocket(
    configEnv.websocketHost,
    {
      onOpen: () => console.log("WS-Stream connected."),
      onClose: () => console.log("WS-Stream disconnected."),
      shouldReconnect: () => true,
      onMessage: (event: WebSocketEventMap["message"]) => {
        if (!configEnv.isProduction) {
          console.log(event.data);
        }
      },
    },
  );

  const handleJoinRoom = (roomName: string) => {
    sendJsonMessage({
      event: "joinRoom",
      data: {
        room: roomName,
      },
    });
    setTextMessage("");
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
    const roomName = String(room);
    if (!roomName) {
      return;
    } else {
      handleJoinRoom(roomName);
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
