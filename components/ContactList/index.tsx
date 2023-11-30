import {
  HamburgerIcon,
  BellIcon,
  SettingsIcon,
  ChatIcon,
} from "@chakra-ui/icons";
import {
  Box,
  VStack,
  Text,
  Avatar,
  Flex,
  Heading,
  IconButton,
} from "@chakra-ui/react";
import Link from "next/link";
import router from "next/router";
import React from "react";
import { FiHome } from "react-icons/fi";

const contacts = [
  { id: 1, name: "Alice", lastMessage: "Hi there!" },
  { id: 2, name: "Bob", lastMessage: "How are you?" },
];

const ContactList = () => {
  return (
    <VStack align="stretch">
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
            icon={<HamburgerIcon />}
            colorScheme="white"
          />
          <Heading size="md" color="white">
            Contacts
          </Heading>
        </Flex>
      </Box>
      <Box pt={20}>
        {contacts.map((contact) => (
          <Link href="/chat/123" key={contact.id}>
            <Box
              p={4}
              shadow="md"
              display="flex"
              alignItems="center"
              fontSize="sm"
            >
              <Avatar name={contact.name} mr={5} />
              <Text fontWeight="bold" mr={5}>
                {contact.name}
              </Text>
            </Box>
          </Link>
        ))}
      </Box>
      <Box
        bg="green.400"
        p={2}
        position="fixed"
        bottom={0}
        left={0}
        right={0}
        display="flex"
        justifyContent="space-around"
        alignItems="center"
      >
        <IconButton
          aria-label="Add"
          icon={<FiHome />}
          colorScheme="transparent"
          width="full"
        />
        <IconButton
          aria-label="Search"
          icon={<ChatIcon />}
          colorScheme="transparent"
          width="full"
        />
        <IconButton
          aria-label="Bell"
          icon={<BellIcon />}
          colorScheme="transparent"
          width="full"
        />
        <IconButton
          aria-label="Settings"
          icon={<SettingsIcon />}
          colorScheme="transparent"
          width="full"
        />
      </Box>
    </VStack>
  );
};

export default ContactList;
