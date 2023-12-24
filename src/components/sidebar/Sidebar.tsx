import {
    Flex,
    Text,
    Divider,
    Avatar,
    
} from '@chakra-ui/react'
import { MdOutlineFormatListBulleted } from "react-icons/md";
import { MdLogout } from "react-icons/md";


import NavItem from './NavItem'
import { useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';


export default function Sidebar() {

    const dispatch = useDispatch()
    return (
        <Flex
            pos="sticky"
            left="5"
            h={{ base: "12vh", md: "95vh", lg: "95vh" }}
            marginTop="2.5vh"
            w={{ base: "100vw", md: "240px", lg: "240px" }}
            boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
            borderRadius={{
                base: "15px",
                md: "30px",
                lg: "30px"
            }}
            flexDir={{ base: "row", md: "column", lg: "column" }}
            justifyContent="space-between"
        >
            <Flex
                gap={4}
                p="25px"
                flexDir={{ base: "row", md: "column", lg: "column" }}
                w="100%"
                as="nav"
            >
                <NavItem icon={MdOutlineFormatListBulleted} title="Başvuru Listesi" active={true} link='admin/basvuru-listesi'/>
                <NavItem onClick={() => dispatch(logout())} icon={MdLogout} title="Çıkış" active={false}/>
            </Flex>

            <Flex
                p="25px"
                flexDir="column"
                w="100%"
                alignItems={{ base: "center", md: "center", lg: "flex-start" }}
                mb={4}
            >
                <Divider display={{ base: "none", sm: "flex", md: "flex", lg: "flex" }} />
                <Flex mt={4} align="center">
                    <Avatar size="sm" src="avatar-1.jpg" />
                    <Flex flexDir="column" ml={4} display={{ base: "none", md: "flex", lg: "flex" }}>
                        <Text color="gray">Admin</Text>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}