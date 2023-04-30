import { Flex, Box, Link, Image, Divider, Text, Heading, Button, useDisclosure } from "@chakra-ui/react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Link as RouteLink } from "react-router-dom";
import ChangeTaskModal from "./ChangeTaskModal";
import { useAuth } from "../../contexts/AuthContext";

export default function GetTasks() {
    const { user } = useAuth();
    const [tasks, setTasks] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        axios.get("http://localhost:3000/tasks", {
            headers: {
                "user-token": localStorage.getItem("token"),
            }
        })
            .then((res) => {
                setTasks(res.data);
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

            <Box w="20%" ml="100px" >
                <Image src={`http://localhost:3000/${user.image}`} mt="100px" w="50%" borderRadius="50%" />

                <Text fontWeight="bold" color="#0367A5" mt="20px">{user.firstName} {user.lastName}</Text>
                <Text mb="300px">{user.position}</Text>

                <Link as={RouteLink} to="/log-out">
                    Log out
                </Link>

            </Box>

            <Divider orientation="vertical" borderColor="#0367A5" borderWidth="2px" height="100%" />
            <Box w="80%" mt={10} display="flex" flexDirection="column" justifyItems="space-between" flexWrap="wrap" p="30px">
           
                    {tasks.length !== 0 ? tasks.map((element) => {
                        return <Box border="1px" display="flex" flexDirection="column" borderColor="#0367A5" mb={6} borderRadius={6} p="10px" mt="50px" w="45%" h="auto" mr={5}>

                            <Heading mb={4} fontSize="20" color="#0367A5">{element.title}</Heading>
                            <Text mb={2} fontSize="15">{element.description}</Text>
                            <Text mb={2} fontSize="15">{element.assigned}</Text>
                            <Text mb={2} fontSize="15">{element.createdAt}</Text>

                        </Box>
                    }) : <Heading mb={6} color="#0367A5">No tasks found</Heading>}
               
                    <Button w="150px" mt={2} onClick={onOpen} bgColor="#0367A5" color="white" _hover="none"> Create task </Button>
                    <ChangeTaskModal
                        isOpen={isOpen}
                        onClose={onClose} />
                </Box>
        </Flex>
    )
}