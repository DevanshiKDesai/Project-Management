import { Link } from 'react-router-dom';
import { Button, Container, Flex, HStack, Text } from '@chakra-ui/react';
import React from 'react';
import { useProjectStore } from '@/store/project';

const Navbar = () => {


  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row"
        }}
      >
        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          textTransform="uppercase"
          textAlign={"center"}
          bgClip={"text"}
          color="blue.500" // Fallback color
        >
          <Link to={'/'}>DBS Project</Link>
        </Text>

        <HStack spacing={2} alignItems={"center"}>
          <Link to={"/create"}>
            <Button>+</Button>
          </Link>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;