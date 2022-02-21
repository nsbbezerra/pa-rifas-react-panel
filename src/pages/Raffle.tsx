import Header from "../components/Header";
import { forwardRef, Fragment, useEffect, useRef, useState } from "react";
import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  HStack,
  IconButton,
  Image,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  InputGroup,
  InputRightElement,
  useToast,
  Skeleton,
  Stack,
  Avatar,
} from "@chakra-ui/react";
import {
  AiOutlineCalendar,
  AiOutlineEdit,
  AiOutlineUser,
} from "react-icons/ai";
import DatePicker, { registerLocale } from "react-datepicker";
import pt_br from "date-fns/locale/pt-BR";
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import format from "date-fns/format";
import { api } from "../configs/axios";
import InputMask from "react-input-mask";
import axios, { AxiosError } from "axios";
import { configs } from "../configs";

registerLocale("pt_br", pt_br);

type ITrophies = {
  id: number;
  status: "waiting" | "drawn";
  title: string;
  description: string;
};

type IOrders = {
  id: number;
  pay_mode_id: string;
  pay_mode_method: string;
  status: "free" | "reserved" | "paid_out";
  value: string;
};

type IRaffle = {
  id: number;
  draw_date: Date;
  description: string;
  identify: string;
  name: string;
  raffle_value: string;
  thumbnail: string;
};

type IPaid = {
  count: string;
};

type IReserved = {
  count: string;
};

type IWinner = {
  client_name: string;
  client_phone: string;
  date_of_shuffle: string;
  number: string;
  number_of_shuffle: string;
};

export default function Raffle() {
  const toast = useToast();
  const inputRef = useRef(null);
  const { rifa } = useParams();
  const { data, error } = useFetch(`/findRaffleInformationApp/${rifa}`, 5000);
  const [information, setInformation] = useState<boolean>(false);
  const [trophy, setTrophy] = useState<boolean>(false);
  const [drawn, setDrawn] = useState<boolean>(false);
  const [winner, setWinner] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  const [raffle, setRaffle] = useState<IRaffle>();
  const [orders, setOrders] = useState<IOrders[]>([]);
  const [trophies, setTrophies] = useState<ITrophies[]>([]);
  const [paid, setPaid] = useState<IPaid>();
  const [reserved, setReserved] = useState<IReserved>();

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [identify, setIdentify] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [trophyName, setTrophyName] = useState<string>("");
  const [idTrophy, setIdTrophy] = useState<number>(0);

  const [numberDrawn, setNumberDrawn] = useState<string>("");
  const [dateDrawn, setDateDrawn] = useState<string>("");
  const [concurso, setConcurso] = useState<string>("");

  const [clientWinner, setClientWinner] = useState<IWinner>();
  const [taxes, setTaxes] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

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
    console.log(data);
    if (data) {
      setRaffle(data.raffle);
      setOrders(data.orders);
      setTrophies(data.trophies);
      setPaid(data.paid);
      setReserved(data.reserved);
    }
  }, [data]);

  const CustomInput = forwardRef((props: any, ref) => {
    return (
      <InputGroup>
        <Input {...props} ref={ref} />
        <InputRightElement
          pointerEvents="none"
          children={<AiOutlineCalendar />}
        />
      </InputGroup>
    );
  });

  function handleInfo(id: string, title: string, desc: string) {
    setIdentify(id);
    setName(title);
    setDescription(desc);
    setInformation(true);
  }

  async function UpdateInfo() {
    setLoading(true);

    try {
      const response = await api.put(`/updateRaffleInfo/${identify}`, {
        name,
        description,
      });
      showToast(
        `${response.data.message}, aguarde alguns instantes para a alteração ter efeito`,
        "success",
        "Sucesso"
      );
      setInformation(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      let message =
        (error as Error).message || "Ocorreu um erro ao processar a requisição";
      showToast(message, "error", "Erro");
    }
  }

  async function UpdateDate() {
    setLoading(true);

    try {
      const response = await api.put(
        `/updateRaffleDate/${raffle?.identify || ""}`,
        {
          draw_date: startDate,
        }
      );
      showToast(
        `${response.data.message}, aguarde alguns instantes para a alteração ter efeito`,
        "success",
        "Sucesso"
      );
      setLoading(false);
    } catch (error) {
      setLoading(false);
      let message =
        (error as Error).message || "Ocorreu um erro ao processar a requisição";
      showToast(message, "error", "Erro");
    }
  }

  async function UpdateTrophy() {
    setLoading(true);

    try {
      const response = await api.put(`/updateRaffleTrophy/${idTrophy}`, {
        title: trophyName,
      });
      showToast(
        `${response.data.message}, aguarde alguns instantes para a alteração ter efeito`,
        "success",
        "Sucesso"
      );
      setTrophy(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      let message =
        (error as Error).message || "Ocorreu um erro ao processar a requisição";
      showToast(message, "error", "Erro");
    }
  }

  function handleTrophy(id: number, title: string) {
    setIdTrophy(id);
    setTrophyName(title);
    setTrophy(true);
  }

  function handleDrawn(id: number) {
    setIdTrophy(id);
    setDrawn(true);
  }

  async function Drawn() {
    if (numberDrawn === "") {
      showToast("Insira um número para o sorteio", "warning", "Atenção");
      return false;
    }
    if (dateDrawn === "") {
      showToast("Insira uma data para o sorteio", "warning", "Atenção");
      return false;
    }
    if (concurso === "") {
      showToast("Insira o concurso do sorteio", "warning", "Atenção");
      return false;
    }
    setLoading(true);

    try {
      const response = await api.post("/setDrawn", {
        trophy: idTrophy,
        number_drawn: numberDrawn,
        date: dateDrawn,
        concurso: concurso,
        raffle: raffle?.id || "",
      });
      showToast(
        `${response.data.message}, aguarde alguns instantes para visualizar as alterações`,
        "success",
        "Sucesso"
      );
      setLoading(false);
      setTrophy(false);
    } catch (error) {
      setLoading(false);
      let message;
      if (axios.isAxiosError(error) && error.message) {
        message = error?.response?.data.message;
      }
      showToast(message || "", "error", "Erro");
    }
  }

  async function handleWinner(id: number) {
    setLoading(true);

    try {
      const response = await api.get(`/findWinner/${id}`);
      setClientWinner(response.data.trophies);
      setWinner(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      let message =
        (error as Error).message || "Ocorreu um erro ao processar a requisição";
      showToast(message, "error", "Erro");
    }
  }

  useEffect(() => {
    const pix = orders.filter((obj) => obj.pay_mode_method === "pix");
    const card = orders.filter((obj) => obj.pay_mode_id === "credit_card");
    let somaPix = pix.reduce(function (total, numero) {
      return total + parseFloat(numero.value);
    }, 0);
    let somaCard = card.reduce(function (total, numero) {
      return total + parseFloat(numero.value);
    }, 0);
    let somaOrders = orders.reduce(function (total, numero) {
      return total + parseFloat(numero.value);
    }, 0);
    let pix_tax = somaPix * (configs.taxes.pix / 100);
    let card_tax = somaCard * (configs.taxes.credit / 100);
    let sum = pix_tax + card_tax;
    setTotal(parseFloat(somaOrders.toFixed(2)));
    setTaxes(parseFloat(sum.toFixed(2)));
  }, [orders]);

  return (
    <Fragment>
      <Header title="Informações" />

      <Container mt={5} mb={5} maxW={"6xl"}>
        {JSON.stringify(raffle) === "{}" ? (
          <Grid
            templateColumns={["1fr", "1fr", "1fr", "270px 1fr", "270px 1fr"]}
            gap={5}
            justifyItems="center"
          >
            <Box>
              <Skeleton w="270px" h="270px" rounded="md" />
            </Box>
            <Box w="100%">
              <Stack>
                <Skeleton w="100%" h="30px" />
                <Skeleton w="100%" h="30px" />
                <Skeleton w="100%" h="30px" />
                <Skeleton w="100%" h="30px" />
                <Skeleton w="100%" h="30px" />
                <Skeleton w="100%" h="30px" />
                <Skeleton w="100%" h="30px" />
              </Stack>
            </Box>
          </Grid>
        ) : (
          <>
            <Grid
              templateColumns={["1fr", "1fr", "1fr", "270px 1fr", "270px 1fr"]}
              gap={5}
              justifyItems="center"
            >
              <Image
                src={raffle?.thumbnail}
                rounded="md"
                shadow={"sm"}
                maxW="full"
              />
              <Box w="100%">
                <Box
                  bg={useColorModeValue("white", "whiteAlpha.100")}
                  rounded="md"
                  shadow={"sm"}
                  borderWidth="1px"
                  p={3}
                  h="min-content"
                >
                  <Heading fontSize={"3xl"}>{raffle?.name}</Heading>
                  <Text mt={3}>{raffle?.description}</Text>

                  <Button
                    colorScheme={"blue"}
                    size="sm"
                    mt={3}
                    onClick={() =>
                      handleInfo(
                        raffle?.identify || "",
                        raffle?.name || "",
                        raffle?.description || ""
                      )
                    }
                  >
                    Alterar
                  </Button>
                </Box>

                <Grid
                  templateColumns={[
                    "repeat(1, 1fr)",
                    "repeat(3, 1fr)",
                    "repeat(3, 1fr)",
                    "repeat(3, 1fr)",
                    "repeat(3, 1fr)",
                  ]}
                  gap={5}
                  mt={5}
                >
                  <Box
                    bg={useColorModeValue("white", "whiteAlpha.100")}
                    rounded="md"
                    shadow={"sm"}
                    borderWidth="1px"
                    p={3}
                    h="min-content"
                  >
                    <Stat>
                      <StatLabel>Números Pagos</StatLabel>
                      <StatNumber>{paid?.count}</StatNumber>
                    </Stat>
                  </Box>
                  <Box
                    bg={useColorModeValue("white", "whiteAlpha.100")}
                    rounded="md"
                    shadow={"sm"}
                    borderWidth="1px"
                    p={3}
                    h="min-content"
                  >
                    <Stat>
                      <StatLabel>Números Reservados</StatLabel>
                      <StatNumber>{reserved?.count}</StatNumber>
                    </Stat>
                  </Box>
                  <Box
                    bg={useColorModeValue("white", "whiteAlpha.100")}
                    rounded="md"
                    shadow={"sm"}
                    borderWidth="1px"
                    p={3}
                    h="min-content"
                  >
                    <Stat>
                      <StatLabel>Valor da Cota</StatLabel>
                      <StatNumber>R$ {raffle?.raffle_value}</StatNumber>
                    </Stat>
                  </Box>
                </Grid>
              </Box>
            </Grid>

            <Flex
              bg={useColorModeValue("white", "whiteAlpha.100")}
              rounded="md"
              shadow={"sm"}
              borderWidth="1px"
              p={3}
              mt={5}
              h="min-content"
              justify={"space-between"}
              align={[
                "flex-start",
                "flex-start",
                "flex-start",
                "center",
                "center",
              ]}
              direction={["column", "column", "column", "row", "row"]}
              gap={[3, 3, 3, 0, 0]}
            >
              <Stat>
                <StatLabel>Data do Sorteio</StatLabel>
                <StatNumber>
                  {format(
                    new Date(raffle?.draw_date || new Date()),
                    "dd/MM/yyyy 'às' HH:mm'h'",
                    {
                      locale: pt_br,
                    }
                  )}
                </StatNumber>
              </Stat>
              <Flex align={"end"} w="100%" maxW={"403px"}>
                <FormControl>
                  <FormLabel mb={0}>Nova Data</FormLabel>
                  <DatePicker
                    selected={startDate}
                    onChange={(date: Date | null) => setStartDate(date)}
                    customInput={<CustomInput ref={inputRef} />}
                    locale="pt_br"
                    dateFormat="dd/MM/yyyy 'às' hh:mm aa"
                    showTimeSelect
                    timeInputLabel="Horário:"
                    showPopperArrow={false}
                  />
                </FormControl>
                <Button
                  colorScheme={"blue"}
                  ml={2}
                  isLoading={loading}
                  onClick={() => UpdateDate()}
                >
                  Alterar
                </Button>
              </Flex>
            </Flex>

            <Grid
              mt={5}
              templateColumns={[
                "repeat(1, 1fr)",
                "repeat(2, 1fr)",
                "repeat(2, 1fr)",
                "repeat(4, 1fr)",
                "repeat(4, 1fr)",
              ]}
              gap={5}
            >
              <Box
                bg={useColorModeValue("white", "whiteAlpha.100")}
                rounded="md"
                shadow={"sm"}
                borderWidth="1px"
                px={3}
                pt={3}
              >
                <Stat>
                  <StatLabel>Taxas de Pagamento</StatLabel>
                  <StatNumber>R$ {taxes}</StatNumber>
                  <StatHelpText>Cartões e PIX</StatHelpText>
                </Stat>
              </Box>
              <Box
                bg={useColorModeValue("white", "whiteAlpha.100")}
                rounded="md"
                shadow={"sm"}
                borderWidth="1px"
                px={3}
                pt={3}
              >
                <Stat>
                  <StatLabel>Total Arrecadado</StatLabel>
                  <StatNumber>R$ {total - taxes}</StatNumber>
                  <StatHelpText>Descontado R$ {taxes}</StatHelpText>
                </Stat>
              </Box>
              <Box
                bg={useColorModeValue("white", "whiteAlpha.100")}
                rounded="md"
                shadow={"sm"}
                borderWidth="1px"
                px={3}
                pt={3}
              >
                <Stat>
                  <StatLabel>Total Bloqueado</StatLabel>
                  <StatNumber>R$ {total - taxes}</StatNumber>
                  <StatHelpText>Liberado após o sorteio</StatHelpText>
                </Stat>
              </Box>
              <Box
                bg={useColorModeValue("white", "whiteAlpha.100")}
                rounded="md"
                shadow={"sm"}
                borderWidth="1px"
                px={3}
                pt={3}
              >
                <Stat>
                  <StatLabel>Total Liberado</StatLabel>
                  <StatNumber>R$ {total - taxes}</StatNumber>
                  <StatHelpText>Liberado após o sorteio</StatHelpText>
                </Stat>
              </Box>
            </Grid>

            <Heading fontSize={"3xl"} mt={5}>
              Prêmios
            </Heading>

            <Grid
              templateColumns={[
                "repeat(1, 1fr)",
                "repeat(2, 1fr)",
                "repeat(2, 1fr)",
                "repeat(3, 1fr)",
                "repeat(5, 1fr)",
              ]}
              gap={5}
              mt={5}
            >
              {trophies.map((tro) => (
                <Box
                  bg={useColorModeValue("white", "whiteAlpha.100")}
                  rounded="md"
                  shadow={"sm"}
                  borderWidth="1px"
                  h="fit-content"
                  key={tro.id}
                >
                  <Text p={2} fontWeight="semibold">
                    {tro.title}{" "}
                    <IconButton
                      aria-label="edit"
                      variant={"outline"}
                      icon={<AiOutlineEdit />}
                      size="sm"
                      colorScheme={"blue"}
                      onClick={() => handleTrophy(tro.id, tro.title)}
                    />
                  </Text>
                  <Box
                    w="100%"
                    borderBottomWidth={"1px"}
                    borderBottomStyle="dashed"
                  />
                  <HStack p={2}>
                    {(tro.status === "waiting" && (
                      <Badge p={1} colorScheme="yellow">
                        aguardando
                      </Badge>
                    )) ||
                      (tro.status === "drawn" && (
                        <Badge p={1} colorScheme="green">
                          sorteado
                        </Badge>
                      ))}
                    {tro.status === "waiting" ? (
                      <Button
                        isFullWidth
                        colorScheme={"blue"}
                        size="sm"
                        onClick={() => handleDrawn(tro.id)}
                      >
                        Sortear
                      </Button>
                    ) : (
                      <Button
                        isFullWidth
                        colorScheme={"green"}
                        size="sm"
                        onClick={() => handleWinner(tro.id)}
                        isLoading={loading}
                      >
                        Ganhador
                      </Button>
                    )}
                  </HStack>
                </Box>
              ))}
            </Grid>
          </>
        )}
      </Container>

      <Modal
        isOpen={information}
        onClose={() => setInformation(false)}
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Alterar Informações</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Título da Rifa</FormLabel>
              <Input
                placeholder="Título da Rifa"
                value={name}
                onChange={(e) => setName(e.target.value.toUpperCase())}
              />
            </FormControl>
            <FormControl mt={3}>
              <FormLabel>Descrição da Rifa</FormLabel>
              <Textarea
                rows={5}
                resize="none"
                value={description}
                onChange={(e) => setDescription(e.target.value.toUpperCase())}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={() => setInformation(false)}>
              Fechar
            </Button>
            <Button
              colorScheme={"blue"}
              isLoading={loading}
              onClick={() => UpdateInfo()}
            >
              Salvar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={drawn}
        onClose={() => setDrawn(false)}
        scrollBehavior="inside"
        size="sm"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sorteio</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Número Sorteado</FormLabel>
              <Input
                placeholder="Número sorteado"
                type="number"
                value={numberDrawn}
                onChange={(e) => setNumberDrawn(e.target.value)}
              />
            </FormControl>
            <FormControl mt={3}>
              <FormLabel>Data do Sorteio</FormLabel>
              <Input
                placeholder="Data do Sorteio"
                as={InputMask}
                mask="99/99/9999"
                value={dateDrawn}
                onChange={(e) => setDateDrawn(e.target.value)}
              />
            </FormControl>
            <FormControl mt={3}>
              <FormLabel>Número do Concurso</FormLabel>
              <Input
                placeholder="Número do Concurso"
                type={"number"}
                value={concurso}
                onChange={(e) => setConcurso(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={() => setDrawn(false)}>
              Fechar
            </Button>
            <Button
              colorScheme={"blue"}
              isLoading={loading}
              onClick={() => Drawn()}
            >
              Sortear
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={trophy}
        onClose={() => setTrophy(false)}
        scrollBehavior="inside"
        size="sm"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Alterar Prêmio</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Descrição do Prêmio</FormLabel>
              <Input
                placeholder="Descrição do Prêmio"
                value={trophyName}
                onChange={(e) => setTrophyName(e.target.value.toUpperCase())}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={() => setTrophy(false)}>
              Fechar
            </Button>
            <Button
              colorScheme={"blue"}
              isLoading={loading}
              onClick={() => UpdateTrophy()}
            >
              Salvar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={winner}
        onClose={() => setWinner(false)}
        scrollBehavior="inside"
        size="sm"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Ganhador</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex justify={"center"} align="center" direction={"column"}>
              <Avatar
                bg={useColorModeValue("white", "whiteAlpha.100")}
                icon={<AiOutlineUser />}
                size="xl"
                color={useColorModeValue("gray.800", "gray.100")}
              />

              <Heading fontSize={"lg"} mt={5}>
                {clientWinner?.client_name}
              </Heading>
              <Text>{clientWinner?.client_phone}</Text>
              <Text mt={5}>
                Data do Sorteio:{" "}
                <strong>{clientWinner?.date_of_shuffle}</strong>
              </Text>
              <Text>
                Número do Concurso:{" "}
                <strong>{clientWinner?.number_of_shuffle}</strong>
              </Text>
              <Text>Número Sorteado:</Text>
              <Heading fontSize={"3xl"} mt={3}>
                {clientWinner?.number}
              </Heading>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button onClick={() => setWinner(false)}>Fechar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Fragment>
  );
}
