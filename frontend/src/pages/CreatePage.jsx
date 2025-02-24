import { useProjectStore } from '@/store/project';
import { Box, Container, Heading, Input, VStack, Button, } from '@chakra-ui/react';
import React, { useState } from 'react'

const CreatePage = () => {

  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    skills: [""]
  });

  const { createProject } = useProjectStore();

  const handleAddProject = async () => {
    const {success, message} = await createProject(newProject);
    setNewProject({ name: "", description: "", skills: "" });
    console.log(newProject);
    console.log("Success:",  success);
    console.log("Message:", message);
  }

  return (
    <Container maxW={"container.sm"}>
      <VStack
        wordSpacing={8}
      >
        <Heading as={"h1"} size={"3xl"} textAlign={"center"} mb={"8"} letterSpacing={"normal"}>
          ADD NEW PROJECT
        </Heading>

        <Box
          w={"full"} bg={"blue.200"}
          p={6} rounded={"lg"} shadow={"md"}
        >
          <VStack wordSpacing={4}>
            <Input 
              placeholder='Name'
              name='name'
              type='String'
              value={newProject.name}
              onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
            />

            <Input 
              placeholder='Description'
              name='description'
              type='String'
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            />

            <Input 
              placeholder='SKills'
              name='name'
              type='String'
              value={newProject.skills}
              onChange={(e) => setNewProject({ ...newProject, skills: e.target.value })}
            />

            <Button bg={"red.200"} colorScheme="blue" onClick={handleAddProject} w='full'>
              Add Project
            </Button>
          </VStack>
        </Box>

      </VStack>
    </Container>
  )
}

export default CreatePage
