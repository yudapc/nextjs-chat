import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  VStack,
  InputGroup,
  InputRightElement,
  IconButton,
  Text,
  Textarea,
  Flex,
  Heading,
  Spacer,
  Avatar,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";
import { FiSend } from "react-icons/fi";
import ReactMarkdown from "react-markdown";

interface IMessage {
  id: number;
  content: string;
  sender: string;
}

const ChatPage = () => {
  const router = useRouter();
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<IMessage[]>([
    { id: 1, content: "Hello", sender: "me" },
    { id: 2, content: "Hi there!", sender: "other" },
    { id: 3, content: "How are you?\n\nnewline", sender: "me" },
    { id: 4, content: "I'm good, **bold** thanks!", sender: "other" },
    { id: 5, content: "Glad to see you here!", sender: "me" },
  ]);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    const newMessage = {
      id: messages.length + 1,
      content: message,
      sender: "me",
    };
    setMessages([...messages, newMessage]);
    setMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <VStack align="stretch" h="100vh">
      <Box
        bg="green.500"
        p={2}
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={999}
      >
        <Flex align="center">
          <IconButton
            aria-label="Menu"
            icon={<ArrowBackIcon />}
            colorScheme="white"
            onClick={() => router.push("/")}
          />
          <Avatar
            size="sm"
            name="Other"
            src={`https://example.com/avatars/other.png`} // Replace with the actual URL of the avatar image
            mr={2}
          />
          <Heading size="md" color="white">
            Other Contact
          </Heading>
        </Flex>
      </Box>
      <Box pl={4} pr={4} flex="1" overflowY="auto" ref={chatContainerRef}>
        {messages.map((msg: IMessage) => (
          <Box
            key={msg.id}
            bg={msg.sender === "me" ? "green.100" : "orange.100"}
            ml={msg.sender === "me" ? "40%" : ""}
            color="black"
            borderRadius="20px"
            p={2}
            my={2}
            maxWidth="60%"
            minWidth="10%"
            justifySelf={msg.sender === "me" ? "flex-end" : "flex-start"}
            display="flex"
            alignItems={msg.content.length > 50 ? "flex-start" : "center"}
            fontSize="sm"
          >
            <Avatar
              size="sm"
              name={msg.sender}
              src={`https://example.com/avatars/${msg.sender}.png`} // Replace with the actual URL of the avatar image
              mr={2}
            />
            <ReactMarkdown>{msg.content}</ReactMarkdown>
          </Box>
        ))}
      </Box>
      <Box p={3} w="full">
        <InputGroup>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            w="full"
            minH="40%"
            h="auto"
            style={{ height: `${message.split("\n").length * 40}px` }}
          />
          <InputRightElement>
            <IconButton
              aria-label="Send Message"
              icon={<FiSend />}
              onClick={handleSendMessage}
            />
          </InputRightElement>
        </InputGroup>
      </Box>
    </VStack>
  );
};

export default ChatPage;
