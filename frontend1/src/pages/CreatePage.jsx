import { Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useProjectStore } from "../store/project";

const CreatePage = () => {
	const [newProject, setNewProject] = useState({
		name: "",
		description: "",
		skills: "",
	});
	const toast = useToast();

	const { createProject } = useProjectStore();

	const handleAddProject = async () => {
		const { success, message } = await createProject(newProject);
		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				isClosable: true,
			});
		} else {
			toast({
				title: "Success",
				description: message,
				status: "success",
				isClosable: true,
			});
		}
		setNewProject({ name: "", description: "", skills: "" });
	};

	return (
		<Container maxW={"container.sm"}>
			<VStack spacing={8}>
				<Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
					Create New Project
				</Heading>

				<Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
					<VStack spacing={4}>
						<Input
							placeholder='Project Name'
							name='name'
							value={newProject.name}
							onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
						/>
						<Input
							placeholder='Description'
							name='description'
							value={newProject.description}
							onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
						/>
						<Input
							placeholder='skills'
							name='skills'
							value={newProject.skills}
							onChange={(e) => setNewProject({ ...newProject, skills: e.target.value })}
						/>

						<Button colorScheme='blue' onClick={handleAddProject} w='full'>
							Add Project
						</Button>
					</VStack>
				</Box>
			</VStack>
		</Container>
	);
};
export default CreatePage;
