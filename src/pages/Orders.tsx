import {
  Box,
  Button,
  Container,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Image,
  Input,
  Select,
  Text,
  useColorModeValue,
  RadioGroup,
  Stack,
  Radio,
  HStack,
  useToast,
  Skeleton,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import Logo from "../assets/logo.svg";
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import InputMask from "react-input-mask";
import { mutate as mutateGlobal } from "swr";
import format from "date-fns/format";
import pt_br from "date-fns/locale/pt-BR";
import { api } from "../configs/axios";

type IOrders = {
  id: number;
  identify: string;
  created_at: Date;
  pay_mode_id: string;
  pay_mode_method: string;
  status: "free" | "reserved" | "paid_out";
  transaction_id: string;
  value: string;
  client_name: string;
};

type INumbers = {
  number: number;
  order_identify: string;
};

export default function Orders() {
  const toast = useToast();
  const { rifa } = useParams();
  const cancelRef = useRef(null);
  const [payment, setPayment] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("all");
  const [text, setText] = useState<string>("");
  const { data, error, mutate } = useFetch(
    `/findOrdersByRaffle/${search}/${text === "" ? "find" : text}/${rifa}`,
    10000
  );

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

  const [orders, setOrders] = useState<IOrders[]>([]);
  const [numbers, setNumbers] = useState<INumbers[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [identify, setIdentify] = useState<string>("");

  useEffect(() => {
    if (data) {
      setOrders(data.orders);
      setNumbers(data.numbers);
    }
  }, [data]);

  if (error) {
    let message = error.response.data.errorMessage || error.message;
    showToast(message, "error", "Erro");
  }

  function handleConfirm(id: string) {
    setIdentify(id);
    setPayment(true);
  }

  async function ConfirmPayment() {
    setLoading(true);
    try {
      const response = await api.put(`/confirmPayment/${identify}`);

      const updated = await data.orders.map((ord: IOrders) => {
        if (ord.identify === identify) {
          return {
            ...ord,
            status: "paid_out",
            pay_mode_id: "bank_transfer",
            pay_mode_method: "pix",
          };
        }
        return ord;
      });
      let info = { orders: updated, numbers: data.numbers };
      mutate(info, false);
      mutateGlobal(`/confirmPayment/${identify}`, {
        identify: identify,
        status: "paid_out",
        pay_mode_id: "bank_transfer",
        pay_mode_method: "pix",
      });
      setLoading(false);
      showToast(response.data.message, "success", "Sucesso");
      setPayment(false);
    } catch (error) {
      setLoading(false);
      let message =
        (error as Error).message || "Ocorreu um erro ao processar a requisição";
      showToast(message, "error", "Erro");
    }
  }

  return (
    <Fragment>
      <Header title="Vendas" />

      <Container mt={5} mb={5} maxW="6xl">
        <Box
          bg={useColorModeValue("white", "whiteAlpha.100")}
          rounded="md"
          shadow={"sm"}
          borderWidth="1px"
          mt={5}
          px={5}
          py={3}
        >
          <Grid
            templateColumns={["1fr", "1fr", "1fr 2fr", "1fr 3fr", "1fr 3fr"]}
            gap={[1, 1, 5, 5, 5]}
          >
            <FormControl>
              <FormLabel>Selecione uma opção</FormLabel>
              <Select
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              >
                <option value={"cpf"}>Buscar por CPF</option>
                <option value={"all"}>Buscar todas</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Digite para buscar</FormLabel>
              <Input
                as={InputMask}
                mask={"999.999.999-99"}
                placeholder="Digite para buscar"
                disabled={search === "all"}
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </FormControl>
          </Grid>
        </Box>
        <HStack mt={5} fontSize="sm" spacing={10}>
          <Flex align={"center"}>
            <Box
              bg="green.100"
              w="25px"
              h="25px"
              rounded="md"
              borderWidth={"1px"}
            />
            <Text fontWeight={"semibold"} ml={2}>
              Pago
            </Text>
          </Flex>
          <Flex align={"center"}>
            <Box
              bg="yellow.100"
              w="25px"
              h="25px"
              rounded="md"
              borderWidth={"1px"}
            />
            <Text fontWeight={"semibold"} ml={2}>
              Aguardando
            </Text>
          </Flex>
        </HStack>

        {orders.length === 0 ? (
          <Grid
            mt={5}
            templateColumns={[
              "repeat(1, 1fr)",
              "repeat(2, 1fr)",
              "repeat(2, 1fr)",
              "repeat(3, 1fr)",
              "repeat(4, 1fr)",
            ]}
            gap={5}
          >
            <Skeleton w="100%" h="240px" rounded={"md"} />
            <Skeleton w="100%" h="240px" rounded={"md"} />
            <Skeleton w="100%" h="240px" rounded={"md"} />
            <Skeleton w="100%" h="240px" rounded={"md"} />
          </Grid>
        ) : (
          <Grid
            mt={5}
            templateColumns={[
              "repeat(1, 1fr)",
              "repeat(2, 1fr)",
              "repeat(2, 1fr)",
              "repeat(3, 1fr)",
              "repeat(4, 1fr)",
            ]}
            gap={5}
          >
            {orders.map((ord) => (
              <Box
                rounded={"md"}
                shadow="sm"
                bg={ord.status === "reserved" ? "orange.100" : "green.100"}
                color="gray.800"
                pb={2}
                h="min-content"
                key={ord.id}
              >
                <Flex justify={"center"} align="center" p={2}>
                  <Image src={Logo} w="60px" />
                  <Flex
                    w="160px"
                    direction={"column"}
                    justify="center"
                    align={"center"}
                  >
                    <Text fontSize="xs" fontWeight={"bold"}>
                      PA RIFAS - RIFAS ONLINE
                    </Text>
                    <Text fontSize="xs">
                      DATA:{" "}
                      {format(
                        new Date(ord.created_at),
                        "dd/MM/yyyy 'às' HH:mm'h'",
                        {
                          locale: pt_br,
                        }
                      )}
                    </Text>
                    <Text fontSize="xs" fontWeight={"bold"}>
                      COMPRA Nº: {ord.id}
                    </Text>
                  </Flex>
                </Flex>
                <Box
                  w="100%"
                  borderBottomWidth={"1px"}
                  borderBottomStyle="dashed"
                  borderBottomColor={"gray.300"}
                />
                <Text textAlign={"center"} fontSize="xs" my={1}>
                  CLIENTE: <strong>{ord.client_name}</strong>
                </Text>
                <Box
                  w="100%"
                  borderBottomWidth={"1px"}
                  borderBottomStyle="dashed"
                  borderBottomColor={"gray.300"}
                />
                <Box px={2}>
                  <Text my={1} fontWeight="semibold" fontSize={"xs"}>
                    NÚMEROS RESERVADOS
                  </Text>
                  <Grid templateColumns={"repeat(4, 1fr)"} gap={2}>
                    {numbers
                      .filter((obj) => obj.order_identify === ord.identify)
                      .map((num) => (
                        <Flex
                          p={1}
                          bg={"gray.300"}
                          rounded="md"
                          fontWeight={"bold"}
                          justify="center"
                          align={"center"}
                          fontSize="sm"
                          key={num.number}
                        >
                          {num.number}
                        </Flex>
                      ))}
                  </Grid>
                </Box>
                <Box
                  w="100%"
                  borderBottomWidth={"1px"}
                  borderBottomStyle="dashed"
                  borderBottomColor={"gray.300"}
                  mt={2}
                />
                <Flex
                  justify={"space-between"}
                  align="center"
                  mt={1}
                  px={2}
                  fontSize="xs"
                >
                  <Text>TOTAL DA COMPRA</Text>
                  <Text fontWeight={"bold"}>R$ {ord.value}</Text>
                </Flex>
                {ord.status === "paid_out" && (
                  <>
                    <Flex
                      justify={"space-between"}
                      align="center"
                      px={2}
                      fontSize="xs"
                    >
                      <Text>PAGAMENTO</Text>
                      <Text fontWeight={"bold"}>{ord.pay_mode_method}</Text>
                    </Flex>
                    <Flex
                      justify={"space-between"}
                      align="center"
                      px={2}
                      fontSize="xs"
                    >
                      <Text>ID PAGAMENTO</Text>
                      <Text fontWeight={"bold"}>{ord.transaction_id}</Text>
                    </Flex>
                  </>
                )}
                {ord.status === "reserved" && (
                  <Button
                    colorScheme={"blue"}
                    size="sm"
                    ml={2}
                    mt={2}
                    onClick={() => handleConfirm(ord.identify)}
                  >
                    Confirmar Pagamento
                  </Button>
                )}
              </Box>
            ))}
          </Grid>
        )}
      </Container>

      <AlertDialog
        isOpen={payment}
        leastDestructiveRef={cancelRef}
        onClose={() => setPayment(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Confirmar Pagamento
            </AlertDialogHeader>

            <AlertDialogBody>
              Deseja confirmar o pagamento para esta compra? Fazendo isto você
              irá ativar os números selecionados reservando-os definitivamente.
              Deseja continuar?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setPayment(false)}>
                Não
              </Button>
              <Button
                colorScheme="blue"
                onClick={() => ConfirmPayment()}
                ml={3}
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
