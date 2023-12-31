import { Outlet } from "react-router-dom";
import { Box, useDisclosure, Flex } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import Navbar from "../components/navbar/Navbar";
import {
  selectActiveSubTab,
  selectActiveTab,
} from "../features/navigation/navigationSlice";
import Sidebar from "../components/sidebar/Sidebar";

const AdminLayout = () => {
  const activeTab = useSelector(selectActiveTab);
  const activeSubTab = useSelector(selectActiveSubTab);
  const { onOpen } = useDisclosure();
  return (
    <>
      <Flex flexDirection={{ base: "column", md: "column", lg: "column" }}>
        <Navbar
          onOpen={onOpen}
          activeTab={activeTab}
          activeSubTab={activeSubTab}
        />
        <Flex flexDir={{ base: "column", md: "row" }}>
          <Sidebar />
          <Box flex="1">
            <Outlet />
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default AdminLayout;
