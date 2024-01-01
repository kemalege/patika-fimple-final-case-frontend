import { Box, Flex, Heading, IconButton } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";

const NoResult = ({message}: {message: string}) => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <Box >
            <Box ml={6}>
                <IconButton
                    icon={<MdArrowBackIos />}
                    aria-label="Go back"
                    onClick={handleGoBack}
                />
            </Box>
            <Flex flexDirection={'column'} textAlign="center" mt={10} alignItems={'center'}>
                <Box borderRadius={48} w={'48'}>
                    <Heading as="h1" size="2xl" px={2} py={2}>
                        404
                    </Heading>
                </Box>
                <Heading fontSize="xl" fontWeight="500" mt={4}>
                    {message}
                </Heading>
            </Flex>
        </Box>
    );
};

export default NoResult;
    