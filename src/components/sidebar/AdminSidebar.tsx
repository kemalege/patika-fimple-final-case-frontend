import {
    Flex,
    Text,
    Divider,
    Avatar,
    useColorModeValue,
} from '@chakra-ui/react'
import { MdOutlineFormatListBulleted } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import NavItem from './NavItem'
import { useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';


export default function AdminSidebar() {

    const dispatch = useDispatch()
    const MenuBg = useColorModeValue('white', 'gray.800')

    return (
        <Flex
            position="sticky"
            top={{ base: "10", md: "20", lg: "20" }}
            zIndex="sticky"
            backgroundColor={MenuBg}
            h={{md: "80vh", lg: "80vh" }}
            w={{ base: "100%", md: "240px", lg: "240px" }}
            boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
            flexDir={{ base: "row", md: "column", lg: "column" }}
            justifyContent="space-between"
            align={{ base: "center", md: "center", lg: "flex-start" }}
        >
            <Flex
                gap={4}
                p={{ base: "10px", md: "25px" }}
                flexDir={{ base: "row", md: "column", lg: "column" }}
                w="100%"
                align={{ base: "center", md: "center", lg: "flex-start" }}
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
            >
                <Divider display={{ base: "none", md: "flex", lg: "flex" }} />
                <Flex mt={{ base: "none", md: "4", lg: "4" }} align="center">
                    <Avatar size="sm" src="avatar.jpg" />
                    <Flex flexDir="column" ml={4} display={{ base: "none", md: "flex", lg: "flex" }}>
                        <Text color="gray">Admin</Text>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}