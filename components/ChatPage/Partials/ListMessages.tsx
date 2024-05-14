import { FC, memo } from "react";
import { Box, Flex } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import { IMessage } from "@/shared/types/message";

interface IProps {
  messages: IMessage[];
}

const ListMessages: FC<IProps> = ({ messages }) => {
  return (
    <>
      {messages.map((msg: IMessage, index: number) => {
        let justify = "flex-start";
        let bg = "orange.100";
        if (msg.sender === "me") {
          justify = "flex-end";
          bg = "green.100";
        }

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
    </>
  );
};

export default memo(ListMessages);
