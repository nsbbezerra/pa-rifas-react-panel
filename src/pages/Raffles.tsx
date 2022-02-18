import Header from "../components/Header";
import { Fragment, useState, useEffect } from "react";
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
  useToast,
  Skeleton,
  Spinner,
} from "@chakra-ui/react";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { configs } from "../configs/index";
import format from "date-fns/format";
import pt_br from "date-fns/locale/pt-BR";
import { mutate as mutateGlobal } from "swr";
import { api } from "../configs/axios";

type IRaffles = {
  id: number;
  client_name: string;
  draw_date: Date;
  identify: string;
  name: string;
  raffle_value: string;
  status: "open" | "cancel" | "drawn" | "waiting" | "refused";
  thumbnail: string;
};

type ICoupons = {
  id: number;
  identify: string;
  status: "open" | "used" | "free";
  coupon_hash: string;
  coupon_value: string;
};

export default function Raffles() {
  const toast = useToast();
  const [page, setPage] = useState<number>(1);
  const [pages, setPages] = useState<number>(1);
  const [text, setText] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const { data, error, mutate } = useFetch(
    `/findRafflesPagination/${page}/${text}/${search === "" ? "find" : search}`,
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

  const [couponsModal, setCouponsModal] = useState<boolean>(false);
  const [statusModal, setStatusModal] = useState<boolean>(false);
  const [newCoupon, setNewCoupon] = useState<boolean>(false);
  const navigate = useNavigate();

  const [raffles, setRaffles] = useState<IRaffles[]>([]);
  const [status, setStatus] = useState<string>("");
  const [justify, setJustify] = useState<string>("");
  const [identify, setIdentify] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [hash, setHash] = useState<string>("");
  const [discount, setDiscount] = useState<string>("");
  const [coupons, setCoupons] = useState<ICoupons[]>([]);

  useEffect(() => {
    if (data) {
      setRaffles(data.raffles);
      handlePagination(data.count.count);
    }
  }, [data]);

  if (error) {
    let message = error.response.data.message || error.message;
    showToast(message, "error", "Erro");
  }

  function handlePagination(num: string) {
    const divisor = parseFloat(num) / configs.pagination;
    if (divisor > Math.trunc(divisor) && divisor < divisor + 1) {
      setPages(Math.trunc(divisor) + 1);
    } else {
      setPages(Math.trunc(divisor));
    }
  }

  function handleStatus(mode: string, id: string) {
    setIdentify(id);
    setStatus(mode);
    setStatusModal(true);
  }

  async function UpdateStatus() {
    if (status === "") {
      showToast("Selecione um status", "warning", "Atenção");
      return false;
    }
    if (justify === "") {
      showToast("Insira uma justificativa", "warning", "Atenção");
      return false;
    }
    setLoading(true);
    try {
      const response = await api.put(`/changeRaffleStatus/${identify}`, {
        status: status,
        justify: justify,
      });

      const updated = await data.raffles.map((raf: IRaffles) => {
        if (raf.identify === identify) {
          return { ...raf, status: status };
        }
        return raf;
      });

      let info = { raffles: updated, count: data.count };
      mutate(info, false);
      mutateGlobal(`/changeRaffleStatus/${identify}`, {
        identify: identify,
        status: status,
      });
      showToast(response.data.message, "success", "Sucesso");
      setJustify("");
      setStatusModal(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      let message =
        (error as Error).message || "Ocorreu um erro ao processar a requisição";
      showToast(message, "error", "Erro");
    }
  }

  function handleCoupon(id: string) {
    setIdentify(id);
    setNewCoupon(true);
  }

  async function CreateCoupon() {
    if (hash === "") {
      showToast("Insira um Cupom", "warning", "Atenção");
      return false;
    }
    if (discount === "") {
      showToast("Insira um valor para o desconto", "warning", "Atenção");
      return false;
    }
    setLoading(true);

    try {
      const response = await api.post("/createCoupon", {
        coupon_hash: hash,
        coupon_value: discount,
        raffle: identify,
      });
      showToast(response.data.message, "success", "Sucesso");
      setNewCoupon(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      let message =
        (error as Error).message || "Ocorreu um erro ao processar a requisição";
      showToast(message, "error", "Erro");
    }
  }

  async function findCoupon(identify_raffle: string) {
    setCouponsModal(true);
    setLoading(true);

    try {
      const response = await api.get(`/findCoupons/${identify_raffle}`);
      setCoupons(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      let message =
        (error as Error).message || "Ocorreu um erro ao processar a requisição";
      showToast(message, "error", "Erro");
    }
  }

  async function activeCoupon(check: boolean, id: string) {
    setLoading(true);
    let active;
    if (check === false) {
      active = "used";
    } else {
      active = "open";
    }
    try {
      const response = await api.put(`/activeCoupon/${id}`, {
        active,
      });
      showToast(response.data.message, "success", "Sucesso");
      setCouponsModal(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      let message =
        (error as Error).message || "Ocorreu um erro ao processar a requisição";
      showToast(message, "error", "Erro");
    }
  }

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
              <Select value={text} onChange={(e) => setText(e.target.value)}>
                <option value="id">Buscar por número</option>
                <option value="all">Buscar todas</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Digite para buscar</FormLabel>
              <Input
                placeholder="Digite para buscar"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                isDisabled={text === "all"}
              />
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
          {raffles.length === 0 ? (
            <Stack mt={5} px={5}>
              <Skeleton w="100%" h={7} />
              <Skeleton w="100%" h={7} />
              <Skeleton w="100%" h={7} />
              <Skeleton w="100%" h={7} />
              <Skeleton w="100%" h={7} />
            </Stack>
          ) : (
            <Box overflowX={"scroll"}>
              <Table size={"sm"} mt={3}>
                <Thead>
                  <Tr>
                    <Th w={"50px"} minW="50px"></Th>
                    <Th w={"50px"} minW="50px">
                      Nº
                    </Th>
                    <Th w="310px" minW="310px">
                      Título
                    </Th>
                    <Th w="90px" minW="90px" isNumeric>
                      Valor
                    </Th>
                    <Th w="210px" minW="210px">
                      Cliente
                    </Th>
                    <Th w="170px">Sorteio</Th>
                    <Th>Status</Th>
                    <Th w="130px">Ações</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {raffles.map((raf) => (
                    <Tr key={raf.id}>
                      <Td w={"50px"} minW="50px">
                        <Avatar src={raf.thumbnail} size={"sm"} />
                      </Td>
                      <Td w={"50px"} minW="50px">
                        {raf.id}
                      </Td>
                      <Td w="310px" minW="310px" isTruncated maxW="310px">
                        {raf.name}
                      </Td>
                      <Td w="90px" minW="90px" isNumeric>
                        R$ {raf.raffle_value}
                      </Td>
                      <Td w="210px" minW="210px" maxW={"210px"} isTruncated>
                        {raf.client_name}
                      </Td>
                      <Td w="170px">
                        {format(
                          new Date(raf.draw_date),
                          "dd/MM/yyyy 'às' HH:mm'h'",
                          {
                            locale: pt_br,
                          }
                        )}
                      </Td>
                      <Td>
                        {(raf.status === "cancel" && (
                          <Badge p={1} colorScheme="red">
                            Cancelada
                          </Badge>
                        )) ||
                          (raf.status === "drawn" && (
                            <Badge p={1} colorScheme="green">
                              Finalizada
                            </Badge>
                          )) ||
                          (raf.status === "open" && (
                            <Badge p={1} colorScheme="blue">
                              À Venda
                            </Badge>
                          )) ||
                          (raf.status === "refused" && (
                            <Badge p={1} colorScheme="gray">
                              Bloqueada
                            </Badge>
                          )) ||
                          (raf.status === "waiting" && (
                            <Badge p={1} colorScheme="yellow">
                              Aguardando
                            </Badge>
                          ))}
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
                              <MenuItem
                                onClick={() =>
                                  navigate(`/rifa/${raf.identify}`)
                                }
                              >
                                Visualizar Informações
                              </MenuItem>
                              <MenuItem
                                onClick={() =>
                                  handleStatus(raf.status, raf.identify)
                                }
                              >
                                Alterar Status
                              </MenuItem>
                              <MenuItem
                                onClick={() =>
                                  navigate(`/vendas/${raf.identify}`)
                                }
                              >
                                Ver Vendas
                              </MenuItem>
                            </MenuGroup>
                            <MenuDivider />
                            <MenuGroup title="Cupons">
                              <MenuItem
                                onClick={() => handleCoupon(raf.identify)}
                              >
                                Criar Cupom
                              </MenuItem>
                              <MenuItem
                                onClick={() => findCoupon(raf.identify)}
                              >
                                Ver Cupons
                              </MenuItem>
                            </MenuGroup>
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
            {loading ? (
              <Flex justify={"center"} align="center" p={10}>
                <Spinner size={"xl"} />
              </Flex>
            ) : (
              <Table size="sm">
                <Thead>
                  <Tr>
                    <Th>Ativo?</Th>
                    <Th>Cupom</Th>
                    <Th isNumeric>Desconto</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {coupons.map((cp) => (
                    <Tr key={cp.id}>
                      <Td>
                        <Switch
                          size={"sm"}
                          isChecked={cp.status === "open"}
                          onChange={(e) =>
                            activeCoupon(e.target.checked, cp.identify)
                          }
                        />
                      </Td>
                      <Td>{cp.coupon_hash}</Td>
                      <Td isNumeric>{Number(cp.coupon_value)}%</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            )}
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
            <RadioGroup value={status} onChange={(e) => setStatus(e)}>
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
              <Textarea
                resize={"none"}
                rows={4}
                value={justify}
                onChange={(e) => setJustify(e.target.value.toUpperCase())}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={() => setStatusModal(false)}>
              Fechar
            </Button>
            <Button
              colorScheme={"blue"}
              isLoading={loading}
              onClick={() => UpdateStatus()}
            >
              Salvar
            </Button>
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
              <Input
                placeholder="Cupom"
                value={hash}
                onChange={(e) => setHash(e.target.value.toUpperCase())}
              />
            </FormControl>
            <FormControl mt={3}>
              <FormLabel>Valor do Desconto</FormLabel>
              <InputGroup>
                <Input
                  placeholder="Valor do Desconto"
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                />
                <InputRightAddon children="%" />
              </InputGroup>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={() => setNewCoupon(false)}>
              Fechar
            </Button>
            <Button
              colorScheme={"blue"}
              isLoading={loading}
              onClick={() => CreateCoupon()}
            >
              Salvar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Fragment>
  );
}
