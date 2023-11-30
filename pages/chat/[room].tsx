import Layout from "@/components/Layout";
import ChatPage from "@/components/ChatPage";
import { SimpleGrid } from "@chakra-ui/react";

const HomePage = () => {
  return (
    <Layout>
      <SimpleGrid columns={{ base: 1, md: 1 }} spacing={10}>
        <ChatPage />
      </SimpleGrid>
    </Layout>
  );
};

export default HomePage;
