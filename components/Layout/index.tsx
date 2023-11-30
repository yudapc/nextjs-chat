import { Box } from "@chakra-ui/react";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <Box>{children}</Box>;
};

export default Layout;
