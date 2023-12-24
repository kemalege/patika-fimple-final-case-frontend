import { Outlet, useLocation } from 'react-router-dom';
import { Portal, Box, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import AdminNavbar from '../components/navbar/NavbarAdmin';
import { selectActiveSubTab, selectActiveTab } from '../features/navigation/navigationSlice';

const HomeLayout = () => {
  const [fixed] = useState(false);
  const activeTab = useSelector(selectActiveTab);
  const activeSubTab = useSelector(selectActiveSubTab);
  const { onOpen } = useDisclosure();
  const location = useLocation();
  return (
    <>
      <Box>
        <Box
          float="right"
          minHeight="100vh"
          height="100%"
          position="relative"
          maxHeight="100%"
          w={{ base: '100%' }}
          maxWidth={{ base: '100%' }}
          transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
          transitionDuration=".2s, .2s, .35s"
          transitionProperty="top, bottom, width"
          transitionTimingFunction="linear, linear, ease"
        >
          <Portal>
            <Box>
              <AdminNavbar
                onOpen={onOpen}
                activeTab={activeTab}
                activeSubTab={activeSubTab}
                fixed={fixed}
              />
            </Box>
          </Portal>

          <Box mx="auto" p={{ base: '20px', md: '30px' }} pe="20px" pt="40px">
            <Box
              className={`${location.pathname === '/' ? 'h-full' : 'h-[92vh]'} w-full`}
              pt={{ base: '65px' }}
            >
              <Outlet />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default HomeLayout;
