import {
  Box,
  Container,
  Flex,
  FormControl,
  HStack,
  Icon,
  IconButton,
  Input,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { Fragment } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { MdKeyboardArrowRight } from "react-icons/md";
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
          <Box overflowX={"scroll"}>
            <Table size={"sm"} mt={3} overflowX="scroll">
              <Thead>
                <Tr>
                  <Th minW="xs">nome</Th>
                  <Th w="150px" minW="150px">
                    cpf
                  </Th>
                  <Th w="150px" minW="150px">
                    telefone
                  </Th>
                </Tr>
              </Thead>

              <Tbody>
                <Tr>
                  <Td minW="xs">Natanael dos Santos Bezerra</Td>
                  <Td w="150px" minW="150px">
                    017.067.731-10
                  </Td>
                  <Td w="150px" minW="150px">
                    (63) 99971-1716
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </Box>

          <Flex
            justify={[
              "space-between",
              "space-between",
              "space-between",
              "end",
              "end",
            ]}
            px={5}
            py={2}
          >
            <HStack>
              <Text
                d={["block", "block", "block", "none", "none"]}
                fontSize="xs"
                fontWeight={"semibold"}
              >
                Arraste para o lado
              </Text>
              <Icon
                as={MdKeyboardArrowRight}
                d={["block", "block", "block", "block", "none"]}
              />
            </HStack>
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
