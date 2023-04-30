import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Input,
    Text
} from '@chakra-ui/react';
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";

export default function AddUserModal({ isOpen, onClose }) {
    const [file, setFile] = useState();
    const { register, handleSubmit, formState: { errors } } = useForm({});
    const onSubmit = async (data) => {
        const formData = new FormData()
        formData.append("image", file)
        formData.append("firstName", data.firstName)
        formData.append("lastName", data.lastName)
        formData.append("position", data.position)
        formData.append("email", data.email)
        formData.append("password", data.password)

        await axios.put("http://localhost:3000/add-user",
            formData,
            {
                headers: {
                    "user-token": localStorage.getItem("token")
                }
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => console.log(err))
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit(onSubmit)} enctype="multipart/form-data">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader color="#0367A5" alignSelf="center">Add new user</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                        <Input
                            placeholder="First name"
                            mt={6}
                            {...register("firstName",
                                {
                                    required: "First name is required",
                                    pattern: {
                                        value: /[A-z]([a-z]{2,})/,
                                        message: "First name must have at least 2 characters"
                                    }
                                })}
                        />

                        {errors?.firstName && (
                            <Text
                                fontSize="xs"
                                color="red"
                                mt={2}
                            >
                                {errors?.firstName?.message}
                            </Text>
                        )}

                        <Input
                            placeholder="Last name"
                            mt={6}
                            {...register("lastName",
                                {
                                    required: "Last name is required",
                                    pattern: {
                                        value: /[A-z]([a-z]{2,})/,
                                        message: "Last name must have at least 2 characters"
                                    }
                                })}
                        />
                        {errors?.lastName && (
                            <Text
                                fontSize="xs"
                                color="red"
                                mt={2}
                            >
                                {errors?.lastName?.message}
                            </Text>
                        )}

                        <Input
                            placeholder="Position"
                            mt={6}
                            {...register("position",
                                {
                                    required: "Position is required",
                                    pattern: {
                                        value: /[A-z]([a-z]{2,})/,
                                        message: "Position must have at least 2 characters"
                                    }
                                })}
                        />
                        {errors?.position && (
                            <Text
                                fontSize="xs"
                                color="red"
                                mt={2}
                            >
                                {errors?.position?.message}
                            </Text>
                        )}

                        <Input
                            placeholder="Role"
                            mt={6}
                            {...register("role",
                                {
                                    required: "Position is required",

                                })}
                        />
                        {errors?.role && (
                            <Text
                                fontSize="xs"
                                color="red"
                                mt={2}
                            >
                                {errors?.role?.message}
                            </Text>
                        )}


                        <Input
                            type="Email"
                            placeholder="Email"
                            mt={6}
                            {...register("email",
                                {
                                    required: "Email is required",
                                    pattern: {
                                        value: /[A-z\d-_]+@[a-z]+.[a-z]{2,}/,
                                        message: "Please enter valid email"
                                    }
                                })}
                        />
                        {errors?.email && (
                            <Text
                                fontSize="xs"
                                color="red"
                                mt={2}
                            >
                                {errors?.email?.message}
                            </Text>
                        )}


                        <Input
                            type="password"
                            placeholder="Password"
                            mt={6}
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
                                color="red"
                                mt={2}
                            >
                                {errors?.password?.message}
                            </Text>
                        )}

                        <Input
                            filename={file}
                            accept="image/*"
                            type="file"
                            mt={6}
                            onChange={(e) => setFile(e.target.files[0])}
                        />

                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button type="submit" variant="ghost">Save</Button>
                    </ModalFooter>
                </ModalContent>
            </form>
        </Modal>
    )
}
