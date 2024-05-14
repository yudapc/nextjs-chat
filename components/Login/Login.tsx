import {
  Box,
  VStack,
  Flex,
  Heading,
  FormControl,
  Input,
  Button,
} from "@chakra-ui/react";
import React, { memo } from "react";
import { useLoginAction } from "./Login.action";

const Login = () => {
  const { handleLogin } = useLoginAction();
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
          <Heading size="md" color="white">
            Login
          </Heading>
        </Flex>
      </Box>
      <Flex
        w="100%"
        h="100%"
        overflowY="scroll"
        flexDirection="column"
        p="4"
        pt="5em"
      >
        <FormControl>
          <label>Username</label>
          <Input />
        </FormControl>
        <FormControl>
          <label>Password</label>
          <Input type="password" />
        </FormControl>
        <FormControl>
          <br />
          <Button onClick={handleLogin}>Login</Button>
        </FormControl>
      </Flex>
    </VStack>
  );
};
export default memo(Login);
