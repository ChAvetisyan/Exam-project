import { Flex, Box, Button, Heading } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function LogOut() {
    const navigate = useNavigate();
    const { handleSubmit } = useForm();

    const onSubmit = () => {
        localStorage.clear();
        navigate("/")
    }

    return (
        <Flex
            w="100%"
            h="100vh"
            alignItems="center"
            justifyContent="center"
            backgroundColor="#EDDBC3"
        >
            <Box >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Heading mb={6} fontSize={25} color="#0367A5"> Are you sure you want to log out? </Heading>

                    <Button type="submit" mt={2} bgColor="#0367A5" color="white" _hover="none"> Log out </Button>
                </form>
            </Box>
        </Flex>
    )
}
