import { Box, Breadcrumb, BreadcrumbItem, Text, Flex, useColorModeValue } from '@chakra-ui/react';

export default function AdminNavbar(props: {
  secondary?: boolean;
  activeSubTab: string | boolean;
  activeTab: string;
  fixed: boolean;
  onOpen: (...args: any[]) => any;
}) {

  const { secondary, activeTab, activeSubTab } = props;
  const mainText = useColorModeValue('#24262D', 'white');
  const secondaryText = useColorModeValue('#24262D', 'white');
  const navbarPosition = 'fixed' as const;
  const navbarFilter = 'none';
  const navbarBackdrop = 'blur(20px)';
  const navbarShadow = 'none';
  const navbarBg = useColorModeValue('rgba(244, 247, 254, 0.2)', 'rgba(36, 38, 45, 0.2)');
  const navbarBorder = 'transparent';
  const secondaryMargin = '0px';
  const gap = '0px';

  return (
    <>
      <Box
        position={navbarPosition}
        boxShadow={navbarShadow}
        bg={navbarBg}
        borderColor={navbarBorder}
        filter={navbarFilter}
        backdropFilter={navbarBackdrop}
        backgroundPosition="center"
        backgroundSize="cover"
        borderRadius="16px"
        borderWidth="1.5px"
        borderStyle="solid"
        transitionDelay="0s, 0s, 0s, 0s"
        transitionDuration=" 0.25s, 0.25s, 0.25s, 0s"
        transition-property="box-shadow, background-color, filter, border"
        transitionTimingFunction="linear, linear, linear, linear"
        alignItems="center"
        display={secondary === true ? 'block' : 'flex'}
        minH="75px"
        justifyContent={{ xl: 'start' }}
        lineHeight="27.6px"
        mx="auto"
        mt={secondaryMargin}
        pb="8px"
        left={{ base: '12px', md: '270px', lg: '270px', xl: '270px' }}
        px={{
          base: '15px',
        }}
        top={{ base: '12px', md: '16px', xl: '18px' }}
        w={{
          base: 'calc(100vw - 6%)',
          md: 'calc(100vw - 8%)',
          lg: 'calc(100vw - 3%)',
        }}
      >

        <Flex w="100%" flexDirection="row" alignItems="center" mb={gap}>
          <Box>
            {activeTab !== '' && (
              <>
                <Breadcrumb
                  mb="5px"
                  className="select-none"
                  display={{ base: 'none', md: 'flex' }}
                  letterSpacing="-0.5px"
                >
                  <BreadcrumbItem color={secondaryText} fontSize="sm">
                    <Text color={secondaryText}>{activeTab}</Text>
                  </BreadcrumbItem>

                  <BreadcrumbItem color={secondaryText} fontSize="sm">
                    <Text color={secondaryText}>{activeSubTab}</Text>
                  </BreadcrumbItem>
                </Breadcrumb>
              </>
            )}
            <Text
              letterSpacing="-0.5px"
              className="select-none"
              color={mainText}
              bg="inherit"
              borderRadius="inherit"
              fontWeight="bold"
              fontSize={{ base: '24px', md: '34px' }}
              _hover={{ color: { mainText } }}
              _active={{
                bg: 'inherit',
                transform: 'none',
                borderColor: 'transparent',
              }}
              _focus={{
                boxShadow: 'none',
              }}
            >
              {activeSubTab}
            </Text>
          </Box>
        </Flex>
      </Box>
    </>
  );
}
