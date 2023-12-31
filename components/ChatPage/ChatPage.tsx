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
import React, { useEffect, useRef, memo } from "react";
import { FiSend } from "react-icons/fi";
import ReactMarkdown from "react-markdown";

import { useChatPageAction } from "./ChatPage.action";
import { IMessage } from "./ChatPage.types";

const ChatPage = () => {
  const router = useRouter();

  const {
    handleSendMessage,
    messages,
    currentMessage,
    setCurrentMessage,
    handleKeyDown,
  } = useChatPageAction();

  const chatContainerRef = useRef<HTMLDivElement>(null);

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
          let justify = "flex-start";
          let bg = "orange.100";
          if (msg.sender === "me") {
            justify = "flex-end";
            bg = "green.100";
          }

          // if (msg.sender === "me") {
          //   return (
          //     <Flex key={index} justify="flex-end">
          //       <Box
          //         bg="green.100"
          //         color="black"
          //         borderRadius="15px"
          //         p={2}
          //         my={1}
          //         fontSize="sm"
          //       >
          //         <ReactMarkdown>{msg.text}</ReactMarkdown>
          //       </Box>
          //     </Flex>
          //   );
          // }
          return (
            <Flex key={index} justify={justify}>
              <Box
                bg={bg}
                color="black"
                borderRadius="15px"
                p={2}
                my={1}
                fontSize="sm"
              >
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </Box>
            </Flex>
          );
        })}
      </Flex>
      <Box p={3} w="full">
        <InputGroup>
          <Textarea
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Write a message..."
            w="full"
            minH="40%"
            h="auto"
            style={{ height: `${currentMessage.split("\n").length * 40}px` }}
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
