import { IContact } from "@/shared/types/contact";
import { Avatar, Box, Text } from "@chakra-ui/react";
import Link from "next/link";
import { memo, FC } from "react";

interface IProps {
  contacts: IContact[];
}
const ListContacts: FC<IProps> = ({ contacts }) => {
  return (
    <>
      {contacts.map((contact) => (
        <Link href={`/chat/${contact.room}`} key={contact.id}>
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
    </>
  );
};
export default memo(ListContacts);
