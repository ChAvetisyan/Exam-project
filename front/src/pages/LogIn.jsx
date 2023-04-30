import { Flex, Box, Input, Button, Heading, Text, Image } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import Img from "../assets/signin.jpeg";

export default function LogIn() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const toast = useToast();

    const onSubmit = async (data) => {
        await axios.post("http://localhost:3000/log-in", data)
            .then((res) => {
                const { user, token } = res.data;
                localStorage.setItem("token", token)
                localStorage.setItem("user", JSON.stringify(user));

                navigate("/board");
            })
            .catch((err) => {
                console.log(err.response.data);
                toast({
                    title: "SignIn faild",
                    description: err.response.data.message,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                })
            })
    }

    return (
        <Flex
            w="100%"
            h="100vh"
            alignItems="center"
            justifyContent="center"
            backgroundColor="#EDDBC3"
        >

            <Box w="50%">
                <Image src={Img} alt="img" w="100%" />
            </Box>
            <Box w="50%" p="150px">
                <form onSubmit={handleSubmit(onSubmit)} w="80%" h="auto">
                    <Heading fontSize={25} color="#0367A5"> TASK MANAGEMENT SYSTEM  </Heading>

                    <Input

                        type="email"
                        placeholder="Email"
                        mt={6}
                        borderColor="#0367A5"
                        {...register("email",
                            {
                                required: "Email is required",
                                pattern: {
                                    value: /[A-z\d-_]+@[a-z]+.[a-z]{2,}/,
                                    message: "Please enter valid email"
                                },
                            })}
                    />
                    {errors?.email && (
                        <Text
                            fontSize="xs"
                            fontWeight="bold"
                            color="#49475C"
                            mt={2}
                        >
                            {errors?.email?.message}
                        </Text>
                    )}

                    <Input

                        type="password"
                        placeholder="Password"
                        mt={6}
                        borderColor="#0367A5"
                        {...register("password",
                            {
                                required: "Password is required",
                                minLength: {
                                    value: 5,
                                    message: "Password must have at least 5 characters"
                                }
                            })}
                    />
                    {errors?.password && (
                        <Text
                            fontSize="xs"
                            fontWeight="bold"
                            color="#49475C"
                            mt={2}
                        >
                            {errors?.password?.message}
                        </Text>
                    )}

                    <Button type="submit" bgColor="#0367A5" color="#EDDBC3" _hover="none" mt={6}> Login </Button>
                </form>
            </Box>

        </Flex>
    )
}