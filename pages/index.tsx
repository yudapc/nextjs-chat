import Layout from "@/components/Layout";
import ContactList from "@/components/ContactList";
import { SimpleGrid } from "@chakra-ui/react";

const HomePage = () => {
  return (
    <Layout>
      <SimpleGrid columns={{ base: 1, md: 1 }} spacing={10}>
        <ContactList />
      </SimpleGrid>
    </Layout>
  );
};

export default HomePage;
