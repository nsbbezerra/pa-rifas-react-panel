import {
  Box,
  Container,
  Flex,
  HStack,
  IconButton,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  MenuDivider,
  Button,
  RadioGroup,
  Stack,
  Radio,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Text,
} from "@chakra-ui/react";
import { Fragment, useRef, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
import Header from "../components/Header";

export default function Petitions() {
  const [payment, setPayment] = useState<boolean>(false);
  const [alert, setAlert] = useState<boolean>(false);
  const cancelRef = useRef(null);

  return (
    <Fragment>
      <Header title="Pedidos" />

      <Container maxW={"6xl"} overflow="hidden">
        <Box
          bg={useColorModeValue("white", "whiteAlpha.100")}
          rounded="md"
          shadow={"sm"}
          borderWidth="1px"
          mt={5}
          w="100%"
          mb={5}
        >
          <Box overflowX="auto">
            <Table size={"sm"} w="100%" mt={3}>
              <Thead>
                <Tr>
                  <Th w="3%">Nº</Th>
                  <Th>cliente</Th>
                  <Th w="15%">telefone</Th>
                  <Th w="7%">números</Th>
                  <Th w="10%">valor</Th>
                  <Th w="10%">Pagamento</Th>
                  <Th w="10%">Ações</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td w="3%">300</Td>
                  <Td minW={"xs"}>Natanael dos Santos Bezerra</Td>
                  <Td w="15%" minW={"44"}>
                    (63) 99971-1716
                  </Td>
                  <Td w="7%">100</Td>
                  <Td w="10%" minW={"32"}>
                    R$ 700,00
                  </Td>
                  <Td
                    w="10%"
                    bg={useColorModeValue("yellow.400", "yellow.200")}
                    color={"gray.800"}
                  >
                    Aguardando
                  </Td>
                  <Td w="10%">
                    <Menu>
                      <MenuButton
                        as={Button}
                        rightIcon={<MdKeyboardArrowDown />}
                        size="sm"
                        colorScheme="blue"
                      >
                        Opções
                      </MenuButton>
                      <MenuList>
                        <MenuItem>Gerar Rifa</MenuItem>
                        <MenuItem onClick={() => setPayment(true)}>
                          Pagamento
                        </MenuItem>
                        <MenuDivider />
                        <MenuItem onClick={() => setAlert(true)}>
                          Excluir
                        </MenuItem>
                      </MenuList>
                    </Menu>
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
              "space-between",
              "end",
            ]}
            px={5}
            py={2}
            w="100%"
            align={"center"}
          >
            <Text
              d={["block", "block", "block", "block", "none"]}
              color={useColorModeValue("red.500", "red.200")}
              fontSize="xs"
              fontWeight={"semibold"}
            >
              Arraste para o lado
            </Text>
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

      <Modal isOpen={payment} onClose={() => setPayment(false)} size="sm">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Pagamento</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <RadioGroup defaultValue="2">
              <Stack spacing={2}>
                <Radio colorScheme="red" value="1">
                  Cancelado
                </Radio>
                <Radio colorScheme="yellow" value="2">
                  Aguardando
                </Radio>
                <Radio colorScheme="green" value="3">
                  Aprovado
                </Radio>
              </Stack>
            </RadioGroup>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={() => setPayment(false)}>
              Fechar
            </Button>
            <Button colorScheme="blue">Salvar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <AlertDialog
        isOpen={alert}
        onClose={() => setAlert(false)}
        leastDestructiveRef={cancelRef}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Apagar Pedido
            </AlertDialogHeader>

            <AlertDialogBody>
              Tem certeza que quer excluir este pedido?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={() => setAlert(false)}>Não</Button>
              <Button colorScheme="blue" ml={3}>
                Sim
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Fragment>
  );
}
