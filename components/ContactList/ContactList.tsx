import {
  HamburgerIcon,
  BellIcon,
  SettingsIcon,
  ChatIcon,
} from "@chakra-ui/icons";
import { Box, VStack, Flex, Heading, IconButton } from "@chakra-ui/react";
import React from "react";
import { FiHome } from "react-icons/fi";
import ListContacts from "./Partials/ListContacts";
import { IContact } from "@/shared/types/contact";

const contacts: IContact[] = [
  { id: 1, name: "Alice", lastMessage: "Hi there!", room: "123" },
  { id: 2, name: "Bob", lastMessage: "How are you?", room: "124" },
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
        <ListContacts contacts={contacts} />
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
