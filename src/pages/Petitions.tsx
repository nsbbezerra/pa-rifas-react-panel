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
  Icon,
  Badge,
  Skeleton,
  useToast,
} from "@chakra-ui/react";
import { Fragment, useRef, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import Header from "../components/Header";
import { useFetch } from "../hooks/useFetch";
import { useEffect } from "react";
import { configs } from "../configs/index";
import { api } from "../configs/axios";
import { mutate as mutateGlobal } from "swr";
import { useNavigate } from "react-router-dom";

type IPetitions = {
  id: number;
  client_name: string;
  client_phone: string;
  qtd_numbers: number;
  identify: string;
  total_to_pay: string;
  status: "waiting" | "reproved" | "paid_out";
};

export default function Petitions() {
  const toast = useToast();
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [pages, setPages] = useState<number>(1);
  const { data, error, mutate } = useFetch(
    `/findPetitionPaginate/${page}`,
    10000
  );
  const [payment, setPayment] = useState<boolean>(false);
  const [alert, setAlert] = useState<boolean>(false);
  const [petitions, setPetitions] = useState<IPetitions[]>([]);
  const [statusPay, setStatusPay] = useState<string>("");
  const [identify, setIdentify] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const cancelRef = useRef(null);

  function showToast(
    message: string,
    status: "error" | "info" | "warning" | "success" | undefined,
    title: string
  ) {
    toast({
      title: title,
      description: message,
      status: status,
      position: "top",
      duration: 8000,
      isClosable: true,
    });
  }

  if (error) {
    let message = error.response.data.message || error.message;
    showToast(message, "error", "Erro");
  }

  useEffect(() => {
    if (data) {
      setPetitions(data.petitions);
      handlePagination(data.count.count);
    }
  }, [data]);

  function handlePagination(num: string) {
    const divisor = parseFloat(num) / configs.pagination;
    if (divisor > Math.trunc(divisor) && divisor < divisor + 1) {
      setPages(Math.trunc(divisor) + 1);
    } else {
      setPages(Math.trunc(divisor));
    }
  }

  function handleStatus(id: string, status: string) {
    setIdentify(id);
    setStatusPay(status);
    setPayment(true);
  }

  async function UpdateStatus() {
    setLoading(true);
    try {
      const response = await api.put(`/updatePetitionStatus/${identify}`, {
        status: statusPay,
      });
      const updated = await data.petitions.map((pet: IPetitions) => {
        if (pet.identify === identify) {
          return { ...pet, status: statusPay };
        }
        return pet;
      });
      let info = { petitions: updated, count: data.count };
      mutate(info, false);
      mutateGlobal(`/updatePetitionStatus/${identify}`, {
        identify: identify,
        status: statusPay,
      });
      setPayment(false);
      showToast(response.data.message, "success", "Sucesso");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      let message =
        (error as Error).message || "Ocorreu um erro ao processar a requisição";
      showToast(message, "error", "Erro");
    }
  }

  function handleDelPetition(id: string) {
    setIdentify(id);
    setAlert(true);
  }

  async function DelPetition() {
    setLoading(true);
    try {
      const response = await api.delete(`/delPetition/${identify}`);
      const updated = await data.petitions.filter(
        (obj: IPetitions) => obj.identify !== identify
      );
      setPetitions(updated);
      setLoading(false);
      showToast(response.data.message, "success", "Sucesso");
      setAlert(true);
    } catch (error) {
      setLoading(false);
      let message =
        (error as Error).message || "Ocorreu um erro ao processar a requisição";
      showToast(message, "error", "Erro");
    }
  }

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
          overflow="hidden"
        >
          {petitions.length === 0 ? (
            <Stack mt={5} px={5}>
              <Skeleton w="100%" h={7} />
              <Skeleton w="100%" h={7} />
              <Skeleton w="100%" h={7} />
              <Skeleton w="100%" h={7} />
              <Skeleton w="100%" h={7} />
            </Stack>
          ) : (
            <Box overflowX="auto">
              <Table size={"sm"} w="100%" mt={3}>
                <Thead>
                  <Tr>
                    <Th w="3%">Nº</Th>
                    <Th>cliente</Th>
                    <Th w="15%">telefone</Th>
                    <Th w="7%" isNumeric>
                      números
                    </Th>
                    <Th w="10%" isNumeric>
                      valor
                    </Th>
                    <Th w="10%">Pagamento</Th>
                    <Th w="10%">Ações</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {petitions.map((pet) => (
                    <Tr key={pet.id}>
                      <Td w="3%">{pet.id}</Td>
                      <Td minW={"xs"}>{pet.client_name}</Td>
                      <Td w="15%" minW={"44"}>
                        {pet.client_phone}
                      </Td>
                      <Td w="7%" isNumeric>
                        {pet.qtd_numbers}
                      </Td>
                      <Td w="10%" minW={"32"} isNumeric>
                        R$ {pet.total_to_pay}
                      </Td>
                      <Td w="10%" color={"gray.800"}>
                        {(pet.status === "waiting" && (
                          <Badge p={1} colorScheme="yellow">
                            Aguardando
                          </Badge>
                        )) ||
                          (pet.status === "reproved" && (
                            <Badge p={1} colorScheme="red">
                              Recusado
                            </Badge>
                          )) ||
                          (pet.status === "paid_out" && (
                            <Badge p={1} colorScheme="green">
                              Pago
                            </Badge>
                          ))}
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
                            <MenuItem
                              onClick={() =>
                                navigate(`/novarifa/${pet.identify}`)
                              }
                            >
                              Gerar Rifa
                            </MenuItem>
                            <MenuItem
                              onClick={() =>
                                handleStatus(pet.identify, pet.status)
                              }
                            >
                              Pagamento
                            </MenuItem>
                            <MenuDivider />
                            <MenuItem
                              onClick={() => handleDelPetition(pet.identify)}
                            >
                              Excluir
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          )}

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
                onClick={() => setPage(page - 1)}
                isDisabled={page <= 1}
              />
              <Flex>
                {page} / {pages}
              </Flex>
              <IconButton
                aria-label="previous"
                icon={<AiOutlineArrowRight />}
                size="sm"
                variant={"outline"}
                onClick={() => setPage(page + 1)}
                isDisabled={page >= pages}
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
            <RadioGroup
              defaultValue={statusPay}
              onChange={(e) => setStatusPay(e)}
            >
              <Stack spacing={2}>
                <Radio colorScheme="red" value="reproved">
                  Cancelado
                </Radio>
                <Radio colorScheme="yellow" value="waiting">
                  Aguardando
                </Radio>
                <Radio colorScheme="green" value="paid_out">
                  Aprovado
                </Radio>
              </Stack>
            </RadioGroup>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={() => setPayment(false)}>
              Fechar
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => UpdateStatus()}
              isLoading={loading}
            >
              Salvar
            </Button>
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
              <Button
                colorScheme="blue"
                ml={3}
                onClick={() => DelPetition()}
                isLoading={loading}
              >
                Sim
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Fragment>
  );
}
