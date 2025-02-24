import React, { useEffect } from 'react'
import { Container, VStack, Text, SimpleGrid, Box} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useProjectStore } from '@/store/project'
import ProjectCard from '@/components/ProjectCard';

const HomePage = () => {

  const { fetchProjects, projects } = useProjectStore();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);
  console.log("Projects", projects);

  return (
    <Container maxW='container.xl' py={12}>
      <VStack wordSpacing={8}>
        <Text
          fontSize={"30"}
          fontWeight={"bold"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
          textAlign={"center"}
        >
          Current Products
        </Text>

        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3,
          }} 
          wordSpacing={10}
          w={"full"}
        >
          {projects.map((project) => {
            <ProjectCard key={project._id} project={project} />
          })}
        </SimpleGrid>

        <Text fontSize={"xl"} textAlign={'center'} fontWeight={'bold'} color={'gray.500'}>
          No project found{' '}
          <Link to={'/create'}>
            <Box as="span" color={'blue.300'} _hover={{ textDecoration: 'underline' }}>
              Create a project
            </Box>
          </Link>
        </Text>
      </VStack>
    </Container>
  )
}

export default HomePage
