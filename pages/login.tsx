import Layout from "@/components/Layout";
import Login from "@/components/Login";
import { SimpleGrid } from "@chakra-ui/react";

const LoginPage = () => {
  return (
    <Layout>
      <SimpleGrid columns={{ base: 1, md: 1 }} spacing={10}>
        <Login />
      </SimpleGrid>
    </Layout>
  );
};

export default LoginPage;
