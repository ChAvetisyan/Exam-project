import { Flex, Box, Link, Image, Divider, Text, Heading, Button, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link as RouteLink } from "react-router-dom";
import AddUserModal from "./AddUserModal";
import { useAuth } from "../../contexts/AuthContext";


export default function GetUsers() {
    const { user } = useAuth();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/users", {
            headers: {
                "user-token": localStorage.getItem("token"),
            }
        })
            .then((res) => {
                setUsers(res.data);
            })
            .catch((err) => console.log(err))
    }, [])

    return (
        <Flex
            w="100%"
            h="100vh"
            alignItems="flex-start"
            justifyContent="center"
            backgroundColor="#EDDBC3"
        >

            <Box w="20%" ml="100px">
                <Image src={`http://localhost:3000/${user.image}`} mt="100px" w="50%" borderRadius="50%" />
                <Text fontWeight="bold" color="#0367A5" mt="20px">{user.firstName} {user.lastName}</Text>
                <Text mb="300px" >{user.position}</Text>
                <Link as={RouteLink} to="/log-out" >
                    Log out
                </Link>
            </Box>

            <Divider orientation="vertical" borderColor="#0367A5" borderWidth="2px" height="100%" />

            <Box w="80%" mb={10} display="flex" justifyItems="space-between" flexWrap="wrap" p="30px">

                {users.length !== 0 ? users.map((element) => {
                    return <Box border="1px" display="flex" borderColor="#0367A5" mb={6} borderRadius={6} p="10px" mt="50px" w="45%" h="auto" mr={5}>
                        <Box w="50%">

                            <Image src={`http://localhost:3000/${element.image}`} w="50%" borderRadius="50%" />
                        </Box>
                        <Box w="50%">
                            <Heading mb={6} fontSize="20" color="#0367A5">{element.firstName} {element.lastName}</Heading>
                            <Text mb={2} fontSize="15">{element.position}</Text>
                            <Text mb={2} fontSize="15">{element.email}</Text>
                         
                        </Box>
                    </Box>
                }) : <Heading mb={6}>No users found</Heading>}
                <Button mt={2} ml={2} onClick={onOpen} bgColor="#0367A5" color="white" _hover="none"> Add user </Button>
                <AddUserModal
                    isOpen={isOpen}
                    onClose={onClose} />
            </Box>
        </Flex>
    )
}