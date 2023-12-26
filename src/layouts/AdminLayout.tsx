import { Outlet } from "react-router-dom";
import { Box, useDisclosure, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/navbar/Navbar";
import {
  selectActiveSubTab,
  selectActiveTab,
} from "../features/navigation/navigationSlice";
import Sidebar from "../components/sidebar/Sidebar";

const AdminLayout = () => {
  const [fixed] = useState(false);
  const activeTab = useSelector(selectActiveTab);
  const activeSubTab = useSelector(selectActiveSubTab);
  const { onOpen } = useDisclosure();
  return (
    <>
      <Flex flexDirection={{ base: "column", md: "column", lg: "column" }}>
        <Box p={{ base: "16px", md: "24px" }} >
          <Flex flexDir={{ base: "column", md: "row" }} pt={{ base: "0px" }}>
            <Navbar
              onOpen={onOpen}
              activeTab={activeTab}
              activeSubTab={activeSubTab}
              fixed={fixed}
            />
          </Flex>
        </Box>
        <Flex flexDir={{ base: "column", md: "row" }}>
            <Sidebar/>
            <Outlet />
        </Flex>
        
      </Flex>
    </>
  );
};

export default AdminLayout;
