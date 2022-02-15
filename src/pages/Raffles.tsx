import Header from "../components/Header";
import { Fragment, useState } from "react";
import {
  Avatar,
  Box,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  HStack,
  Icon,
  IconButton,
  Input,
  Select,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Button,
  Badge,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Switch,
  RadioGroup,
  Stack,
  Radio,
  Textarea,
  MenuGroup,
  InputGroup,
  InputRightAddon,
} from "@chakra-ui/react";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function Raffles() {
  const [couponsModal, setCouponsModal] = useState<boolean>(false);
  const [statusModal, setStatusModal] = useState<boolean>(false);
  const [newCoupon, setNewCoupon] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <Fragment>
      <Header title="Rifas" />

      <Container maxW={"6xl"} mt={5} mb={5}>
        <Box
          bg={useColorModeValue("white", "whiteAlpha.100")}
          rounded="md"
          shadow={"sm"}
          px={5}
          py={3}
          borderWidth="1px"
        >
          <Grid
            templateColumns={["1fr", "1fr", "1fr 2fr", "1fr 3fr", "1fr 3fr"]}
            gap={[1, 1, 5, 5, 5]}
          >
            <FormControl>
              <FormLabel>Selecione uma opção</FormLabel>
              <Select>
                <option>Buscar por número</option>
                <option>Buscar por cliente</option>
                <option>Buscar por CPF</option>
                <option>Buscar todas</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Digite para buscar</FormLabel>
              <Input placeholder="Digite para buscar" />
            </FormControl>
          </Grid>
        </Box>

        <Box
          bg={useColorModeValue("white", "whiteAlpha.100")}
          rounded="md"
          shadow={"sm"}
          borderWidth="1px"
          mt={5}
        >
          <Box overflowX={"scroll"}>
            <Table size={"sm"} mt={3}>
              <Thead>
                <Tr>
                  <Th w={"60px"} minW="60px"></Th>
                  <Th w="360px" minW="360px">
                    Título
                  </Th>
                  <Th w="90px" minW="90px" isNumeric>
                    Valor
                  </Th>
                  <Th w="210px" minW="210px">
                    Cliente
                  </Th>
                  <Th>Sorteio</Th>
                  <Th>Status</Th>
                  <Th w="130px">Ações</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td w={"60px"} minW="60px">
                    <Avatar
                      src="https://img.freepik.com/psd-gratuitas/super-rifa-renderizacao-em-3d_475327-317.jpg"
                      size={"sm"}
                    />
                  </Td>
                  <Td w="360px" minW="360px" isTruncated maxW="360px">
                    Título da Rifa Título da Rifa Título da Rifa Título da Rifa
                    Título da Rifa
                  </Td>
                  <Td w="90px" minW="90px" isNumeric>
                    R$ 20,00
                  </Td>
                  <Td w="210px" minW="210px" maxW={"210px"} isTruncated>
                    Natanael dos Santos Bezerra
                  </Td>
                  <Td>10/10/1000 às 19:00h</Td>
                  <Td>
                    <Badge p={1}>Bloqueada</Badge>
                  </Td>
                  <Td w="130px" minW="130px" maxW="130px">
                    <Menu>
                      <MenuButton
                        as={Button}
                        rightIcon={<MdKeyboardArrowDown />}
                        size="sm"
                        colorScheme="blue"
                        isFullWidth
                      >
                        Opções
                      </MenuButton>
                      <MenuList>
                        <MenuGroup title="Rifa">
                          <MenuItem onClick={() => navigate("/rifa/1293")}>
                            Visualizar Informações
                          </MenuItem>
                          <MenuItem onClick={() => setStatusModal(true)}>
                            Alterar Status
                          </MenuItem>
                          <MenuItem onClick={() => navigate("/vendas/1293")}>
                            Ver Vendas
                          </MenuItem>
                        </MenuGroup>
                        <MenuGroup title="Cupons">
                          <MenuItem onClick={() => setNewCoupon(true)}>
                            Criar Cupom
                          </MenuItem>
                          <MenuItem onClick={() => setCouponsModal(true)}>
                            Ver Cupons
                          </MenuItem>
                        </MenuGroup>
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
            <HStack>
              <Text
                d={["block", "block", "block", "block", "none"]}
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

      <Modal
        isOpen={couponsModal}
        onClose={() => setCouponsModal(false)}
        scrollBehavior="inside"
        size={"lg"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cupons</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th>Ativo?</Th>
                  <Th>Cupom</Th>
                  <Th isNumeric>Desconto</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>
                    <Switch size={"sm"} />
                  </Td>
                  <Td>PA0001</Td>
                  <Td isNumeric>20%</Td>
                </Tr>
              </Tbody>
            </Table>
          </ModalBody>

          <ModalFooter>
            <Button onClick={() => setCouponsModal(false)}>Fechar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={statusModal}
        onClose={() => setStatusModal(false)}
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Status da Rifa</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <RadioGroup>
              <Stack spacing={2}>
                <Radio colorScheme="blue" value="open">
                  À venda
                </Radio>
                <Radio colorScheme="red" value="cancel">
                  Cancelada
                </Radio>
                <Radio colorScheme="yellow" value="waiting">
                  Em Espera
                </Radio>
                <Radio colorScheme="gray" value="refused">
                  Bloqueada
                </Radio>
              </Stack>
            </RadioGroup>

            <FormControl mt={5}>
              <FormLabel>Justificativa</FormLabel>
              <Textarea resize={"none"} rows={4} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={() => setStatusModal(false)}>
              Fechar
            </Button>
            <Button colorScheme={"blue"}>Salvar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={newCoupon}
        onClose={() => setNewCoupon(false)}
        scrollBehavior="inside"
        size={"sm"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Criar Cupom</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Cupom</FormLabel>
              <Input placeholder="Cupom" />
            </FormControl>
            <FormControl mt={3}>
              <FormLabel>Valor do Desconto</FormLabel>
              <InputGroup>
                <Input placeholder="Valor do Desconto" />
                <InputRightAddon children="%" />
              </InputGroup>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={() => setNewCoupon(false)}>
              Fechar
            </Button>
            <Button colorScheme={"blue"}>Salvar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Fragment>
  );
}
