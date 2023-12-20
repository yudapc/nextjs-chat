import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  VStack,
  InputGroup,
  InputRightElement,
  IconButton,
  Textarea,
  Flex,
  Heading,
  Avatar,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState, useEffect, useRef, memo } from "react";
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
    if (message.trim() === "") return;
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
          <Avatar size="sm" name="Other" mr={2} />
          <Heading size="md" color="white">
            Other Contact
          </Heading>
        </Flex>
      </Box>
      <Flex
        w="100%"
        h="100%"
        overflowY="scroll"
        flexDirection="column"
        p="3"
        pt="1em"
        ref={chatContainerRef}
      >
        {messages.map((msg: IMessage, index: number) => {
          if (msg.sender === "me") {
            return (
              <Flex key={index} justify="flex-end">
                <Box
                  bg="green.100"
                  color="black"
                  borderRadius="15px"
                  p={2}
                  my={1}
                  fontSize="sm"
                >
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </Box>
              </Flex>
            );
          }
          return (
            <Flex key={index} justify="flex-start">
              <Box
                bg="orange.100"
                color="black"
                borderRadius="15px"
                p={2}
                my={1}
                fontSize="sm"
              >
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </Box>
            </Flex>
          );
        })}
      </Flex>
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

export default memo(ChatPage);
