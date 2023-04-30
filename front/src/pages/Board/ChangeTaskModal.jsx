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
    Text,
    Select
} from '@chakra-ui/react';
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect, setState } from "react";

export default function AddUserModal({ isOpen, onClose }) {
    const [users, setUsers] = useState([]);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        axios.post("http://localhost:3000/create-task", {
            title: data.title,
            description: data.description,
            assigned: data.assigned,
            status: data.status,
            updatedAt: data.updatedAt,
        },
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
        <Modal isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader color="#0367A5" alignSelf="center">Create task</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                        <Input
                            placeholder="Title"
                            mt={6}
                            {...register("title",
                                {
                                    required: "Title is required",

                                })}
                        />

                        {errors?.title && (
                            <Text
                                fontSize="xs"
                                color="red"
                                mt={2}
                            >
                                {errors?.title?.message}
                            </Text>
                        )}

                        <Input
                            placeholder="Description"
                            mt={6}
                            {...register("description",
                                {
                                    required: "Description is required",
                                })}
                        />
                        {errors?.description && (
                            <Text
                                fontSize="xs"
                                color="red"
                                mt={2}
                            >
                                {errors?.description?.message}
                            </Text>
                        )}

                        <Select onChange={(e) => setState(e.target.value)}
                            placeholder="Assigned to"
                            mt={6}
                        >
                            {users.length !== 0 ? users.map((element) => {
                                return <option>{element.firstName} {element.lastName}</option>
                            }) : <option> Undefined </option>}
                        </Select>


                        <Select onChange={(e) => setState(e.target.value)}
                            placeholder="Status"
                            mt={6}
                        >
                            <option> To do </option>
                            <option> In progress </option>
                            <option> Ready for QA </option>
                            <option> Done </option>
                        </Select>

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
