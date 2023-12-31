import React from 'react'
import {
    Flex,
    Text,
    Icon,
    Box,
    useColorModeValue,
} from '@chakra-ui/react'


export interface NavItemProps {
    icon: React.ElementType;
    title: string;
    active: boolean;
    link?: string;
    onClick?: () => void;
}

export default function NavItem({ icon, title, active, onClick }: NavItemProps) {

    const activeBg = useColorModeValue('gray.200', 'gray.700')

    return (
        <Flex
            mt={0}
            flexDir="column"
            w="100%"
        > 
            <Box
                onClick={onClick}
                cursor="pointer"
                backgroundColor={active ? activeBg : ""}
                p={3}
                borderRadius={8}
                _hover={{ textDecor: 'none', backgroundColor: "#AEC8CA" }}
                
            >
                <Flex alignItems={'center'}>
                    <Icon as={icon} fontSize="xl" color={active ? "#82AAAD" : "gray.500"} />
                    <Text ml={5} >{title}</Text>
                </Flex>
            </Box>
       
        </Flex>
    )
}