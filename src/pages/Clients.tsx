import {
  Box,
  Container,
  Flex,
  FormControl,
  HStack,
  IconButton,
  Input,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { Fragment } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import Header from "../components/Header";

export default function Clients() {
  return (
    <Fragment>
      <Header title="Clientes" />

      <Container maxW={"6xl"}>
        <Box
          bg={useColorModeValue("white", "whiteAlpha.100")}
          rounded="md"
          shadow={"sm"}
          borderWidth="1px"
          mt={5}
          px={5}
          py={3}
          mb={5}
        >
          <FormControl>
            <Input placeholder="Digite um nome para buscar" />
          </FormControl>
        </Box>

        <Box
          mt={5}
          bg={useColorModeValue("white", "whiteAlpha.100")}
          rounded="md"
          shadow={"sm"}
          borderWidth="1px"
        >
          <Table size={"sm"} mt={3} overflowX="scroll">
            <Thead>
              <Tr>
                <Th>nome</Th>
                <Th w="15%">cpf</Th>
                <Th w="15%">telefone</Th>
              </Tr>
            </Thead>

            <Tbody>
              <Tr>
                <Td>Natanael dos Santos Bezerra</Td>
                <Td w="15%">cpf</Td>
                <Td w="15%">telefone</Td>
              </Tr>
            </Tbody>
          </Table>

          <Flex justify={"end"} px={5} py={2}>
            <HStack>
              <IconButton
                aria-label="previous"
                icon={<AiOutlineArrowLeft />}
                size="sm"
                variant={"outline"}
              />
              <Flex>1 / 2</Flex>
              <IconButton
                aria-label="previous"
                icon={<AiOutlineArrowRight />}
                size="sm"
                variant={"outline"}
              />
            </HStack>
          </Flex>
        </Box>
      </Container>
    </Fragment>
  );
}
