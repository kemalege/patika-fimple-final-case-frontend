import { Link, useRouteError } from "react-router-dom";
import { Box, Divider, Flex, Heading} from "@chakra-ui/react";
  
  const ErrorBoundary = () => {
      const error = useRouteError();
  
      return (
          <Box >
              <Flex flexDirection={'column'} textAlign="center" mt={10} alignItems={'center'}>
                  <Box borderRadius={48} w={'48'}>
                      <Heading as="h1" size="2xl" px={2} py={2}>
                        { (error as { status?: string })?.status }
                      </Heading>
                  </Box>
                  <Heading fontSize="xl" fontWeight="500" mt={4}>
                      Sayfa bulunamadı
                  </Heading>
                  <Divider my={8} display={{ base: "none", md: "flex", lg: "flex" }} />
                    <Link className="text-blue-500" to='/basvuru-olustur' >Anasayfaya Dön</Link>
              </Flex>
          </Box>
      );
  };
  
  export default ErrorBoundary;
      