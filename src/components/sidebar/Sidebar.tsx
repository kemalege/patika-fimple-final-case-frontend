import {
    Flex,
    useColorModeValue,
} from '@chakra-ui/react'
import { useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import { Link } from 'react-router-dom';


export default function SideBar() {

    const dispatch = useDispatch()
    const MenuBg = useColorModeValue('white', 'gray.800')

    return (
        <Flex
            position="sticky"
            top={{ base: "10", md: "20", lg: "20" }}
            zIndex="sticky"
            backgroundColor={MenuBg}
            h={{md: "80vh", lg: "80vh" }}
            w={{ base: "100%", md: "200px", lg: "200px" }}
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
                align={{ base: "flex-start" }}
                as="nav"
            >
                <Link className="text-blue-500" to="basvuru-olustur" title="Yeni Başvuru Oluştur" >Yeni Başvuru</Link>
                <Link className="text-blue-500" to="basvuru-sorgula" onClick={() => dispatch(logout())} title="Başvuru Sorgula" >Başvuru Sorgula</Link>
            </Flex>
        </Flex>
    )
}