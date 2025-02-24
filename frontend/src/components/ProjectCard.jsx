import { Box, Text, Heading, HStack, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast, VStack, Button } from '@chakra-ui/react'
import { useState } from 'react'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { useProjectStore } from '../store/project.js';


const ProjectCard = ({project}) => {

    const [ updatedProject, setUpdateProject ] = useState(project);
    const { deleteProject, updateProject } = useProjectStore();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleDeleteProject = async (pid) => {
        const { success, message } = await deleteProject(pid);
    };

    const handleUpdateProject = async (pid, updatedProject) => {
        const { success, message } = await updateProject(pid, updatedProject);
        onClose();
    };

    const textColor = "gray.600";
    const bg = "white";
  return (
    <Box
        shadow={'lg'}
        rounded={'lg'}
        overflow={'hidden'}
        transition={'all 0.3s'}
        _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}
        bg={bg}
    >
        <Box>
            <Heading as={'h3'} size={'md'} mb={'2'}>
                {project.name}
            </Heading>

            <Text fontWeight={'bold'} fontSize={'xl'} color={textColor} mb={4}>
                ${project.description}
            </Text>

            <Text fontWeight={'normal'} fontSize={'large'} color={textColor}>
                {project.skills}
            </Text>

            <HStack wordSpacing={2}>
                <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme='blue' />
                <IconButton icon={<DeleteIcon />} onClick={() => {handleDeleteProject(project.id)}} colorScheme='red' />
            </HStack>
        </Box>

        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />

            <ModalContent>
                <ModalHeader>Update Project</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack wordSpacing={4}>
                        <Input
                            placeholder='Project Name'
                            name='name'
                            value={updatedProject.name}
                            onChange={(e) => setUpdateProject({ ...updatedProject, name: e.target.value })}
                        />

                        <Input
                            placeholder='Description'
                            name='description'
                            value={updatedProject.description}
                            onChange={(e) => setUpdateProject({ ...updatedProject, description: e.target.value })}
                        />

                        <Input
                            placeholder='Skills'
                            name='Skills'
                            value={updatedProject.skills}
                            onChange={(e) => setUpdateProject({ ...updatedProject, skills: e.target.value })}
                        />
                    </VStack>
                </ModalBody>

                <ModalFooter>
                    <Button
                        colorScheme={'blue'}
                        mr={3}
                        onClick={() => handleUpdateProject(project.id, updatedProject)}
                    >
                        Update
                    </Button>

                    <Button variant='ghost' onClick={onclose}>
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </Box>
  )
}

export default ProjectCard;
