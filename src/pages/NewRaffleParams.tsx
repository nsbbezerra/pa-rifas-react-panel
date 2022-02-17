import {
  Box,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Icon,
  Input,
  Text,
  useColorModeValue,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  InputRightAddon,
  InputLeftElement,
  Textarea,
  Button,
  IconButton,
  Divider,
  useToast,
  Image,
  FormHelperText,
} from "@chakra-ui/react";
import {
  forwardRef,
  Fragment,
  useRef,
  useState,
  useEffect,
  useMemo,
} from "react";
import {
  AiOutlineCalendar,
  AiOutlineFileImage,
  AiOutlineTrophy,
} from "react-icons/ai";
import Header from "../components/Header";
import DatePicker, { registerLocale } from "react-datepicker";
import pt_br from "date-fns/locale/pt-BR";
import { FiTarget } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";
import { api } from "../configs/axios";
import { useParams, useNavigate } from "react-router-dom";

registerLocale("pt_br", pt_br);

type Raffle = {
  client_cpf: string;
  client_email: string;
  client_name: string;
  client_phone: string;
  description: string;
  draw_date: string;
  draw_time: string;
  goal: number;
  id: number;
  identify: string;
  name: string;
  qtd_numbers: number;
  raffle_value: string;
  status: "waiting" | "reproved" | "paid_out";
  trophies: string;
};

type Trophies = {
  title: string;
  description: string;
};

export default function NewRaffleParams() {
  const navigate = useNavigate();
  const toast = useToast();
  const inputRef = useRef(null);
  const { rifa } = useParams();
  const [raffle, setRaffle] = useState<Raffle>();

  const [name, setName] = useState<string>("");
  const [qtd_numbers, setQtd_numbers] = useState<number>(0);
  const [raffle_value, setRaffle_value] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [goal, setGoal] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [trophies, setTrophies] = useState<Trophies[]>([]);
  const [trophy, setTrophy] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<any>(undefined);
  const [trophyName, setTrophyName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : undefined;
  }, [thumbnail]);

  function removeThumbnail() {
    URL.revokeObjectURL(thumbnail);
    setThumbnail(undefined);
  }

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

  useEffect(() => {
    async function findPetition() {
      try {
        const response = await api.get(`/getPetitionInformation/${rifa}`);
        const info: Raffle = response.data;
        const date = info.draw_date;
        const timestamps = date.split("/");
        const time = info.draw_time;
        const timesplit = time.split(":");
        setStartDate(
          new Date(
            Number(timestamps[2]),
            Number(timestamps[1]) - 1,
            Number(timestamps[0]),
            Number(timesplit[0]),
            Number(timesplit[1])
          )
        );
        setName(info.name);
        setQtd_numbers(info.qtd_numbers);
        setRaffle_value(info.qtd_numbers.toString());
        setGoal(info.goal);
        setDescription(info.description);
        setTrophy(info.trophies);
        setRaffle(response.data);
      } catch (error) {
        let message =
          (error as Error).message ||
          "Ocorreu um erro ao processar a requisição";
        showToast(message, "error", "Erro");
      }
    }
    findPetition();
  }, []);

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

  function handleThumbnail(file: FileList | null) {
    if (file) {
      setThumbnail(file[0]);
    }
  }

  function handleTrophy() {
    if (trophyName === "") {
      showToast("Insira um prêmio", "warning", "Atenção");
      return false;
    }
    const result = trophies.find((obj) => obj.title === trophyName);
    if (result) {
      showToast("Este prêmio já foi adicionado", "warning", "Atenção");
    } else {
      setTrophies([
        ...trophies,
        { title: trophyName, description: trophyName },
      ]);
    }
    setTrophyName("");
  }

  function delTrophy(title: string) {
    const result = trophies.filter((obj) => obj.title !== title);
    setTrophies(result);
  }

  async function storeRaffle() {
    if (!thumbnail || thumbnail === undefined) {
      showToast("Insira uma imagem para a rifa", "warning", "Atenção");
      return false;
    }
    if (name === "") {
      showToast("Insira um nome", "warning", "Atenção");
      return false;
    }
    if (isNaN(qtd_numbers)) {
      showToast(
        "Insira uma quantidade de números correta",
        "warning",
        "Atenção"
      );
      return false;
    }
    if (raffle_value === "") {
      showToast("Insira um valor para a rifa", "warning", "Atenção");
      return false;
    }
    if (startDate === new Date()) {
      showToast("Insira uma data diferente de hoje", "warning", "Atenção");
      return false;
    }
    if (description === "") {
      showToast("Insira uma descrição", "warning", "Atenção");
      return false;
    }
    if (trophies.length === 0) {
      showToast("Insira pelo menos um prêmio", "warning", "Atenção");
      return false;
    }

    setLoading(true);

    let data = new FormData();
    data.append("name", name);
    data.append("qtd_numbers", qtd_numbers.toString());
    data.append("draw_date", startDate?.toString() || "");
    data.append("client_cpf", raffle?.client_cpf || "");
    data.append("description", description);
    data.append("raffle_value", raffle_value);
    data.append("trophys", JSON.stringify(trophies));
    data.append("goal", goal.toString());
    data.append("thumbnail", thumbnail);

    try {
      const response = await api.post(`/raffle/${rifa}`, data);
      setLoading(false);
      showToast(response.data.message, "success", "Sucesso");
      setTimeout(() => {
        navigate("/pedidos");
      }, 3000);
    } catch (error) {
      setLoading(false);
      let message =
        (error as Error).message || "Ocorreu um erro ao processar a requisição";
      showToast(message, "error", "Erro");
    }
  }

  return (
    <Fragment>
      <Header title="Criar Rifa" />

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
          <Grid
            templateColumns={["1fr", "1fr", "1fr", "210px 1fr", "210px 1fr"]}
            gap={5}
          >
            <FormControl w="210px">
              {thumbnail ? (
                <Flex
                  w="210px"
                  h="210px"
                  justify={"center"}
                  align="center"
                  direction={"column"}
                >
                  <Image
                    src={preview}
                    w="210px"
                    rounded="md"
                    shadow="sm"
                    h="210px"
                    objectFit={"cover"}
                  />
                  <IconButton
                    aria-label="thumbnail"
                    icon={<FaTrash />}
                    mt={-12}
                    colorScheme="red"
                    onClick={removeThumbnail}
                  />
                </Flex>
              ) : (
                <FormLabel htmlFor="image">
                  Insira uma imagem
                  <Flex
                    w="210px"
                    h="210px"
                    rounded={"md"}
                    borderWidth="1px"
                    borderStyle={"dashed"}
                    direction="column"
                    justify={"center"}
                    align="center"
                    cursor={"pointer"}
                    _hover={{ borderWidth: "2px" }}
                    mt={2}
                  >
                    <Icon as={AiOutlineFileImage} fontSize="3xl" />
                    <Text textAlign={"center"} fontSize="xs" mt={2}>
                      Insira uma imagem
                    </Text>
                    <Input
                      type={"file"}
                      name="image"
                      id="image"
                      d="none"
                      onChange={(e) => handleThumbnail(e.target.files)}
                    />
                  </Flex>
                </FormLabel>
              )}
            </FormControl>
            <Flex gap={3} direction="column">
              <Grid
                templateColumns={[
                  "1fr",
                  "2fr 1fr",
                  "3fr 1fr",
                  "3fr 1fr",
                  "3fr 1fr",
                ]}
                gap={5}
              >
                <FormControl>
                  <FormLabel>Título da Rifa</FormLabel>
                  <Input
                    placeholder="Título da Rifa"
                    value={name}
                    onChange={(e) => setName(e.target.value.toUpperCase())}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Qtd Números</FormLabel>
                  <NumberInput
                    value={qtd_numbers}
                    onChange={(e) => setQtd_numbers(parseInt(e))}
                  >
                    <NumberInputField placeholder="Qtd Números" />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
              </Grid>
              <Grid
                templateColumns={[
                  "repeat(1, 1fr)",
                  "repeat(1, 1fr)",
                  "repeat(3, 1fr)",
                  "repeat(3, 1fr)",
                  "repeat(3, 1fr)",
                ]}
                gap={5}
              >
                <FormControl>
                  <FormLabel>Valor da Cota</FormLabel>
                  <InputGroup>
                    <InputLeftAddon children="R$" />
                    <Input
                      placeholder="Valor da Cota"
                      value={raffle_value}
                      onChange={(e) => setRaffle_value(e.target.value)}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <FormLabel>Data do Sorteio</FormLabel>
                  <DatePicker
                    selected={startDate}
                    onChange={(date: Date | null) => setStartDate(date)}
                    customInput={<CustomInput ref={inputRef} />}
                    locale="pt_br"
                    dateFormat="dd/MM/yyyy 'às' hh:mm aa"
                    timeFormat="p"
                    showTimeInput
                    timeInputLabel="Horário:"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Meta Mínima</FormLabel>
                  <InputGroup>
                    <InputLeftElement>
                      <Icon as={FiTarget} />
                    </InputLeftElement>
                    <Input
                      placeholder="Meta Mínima"
                      value={goal}
                      type="number"
                      onChange={(e) => setGoal(parseInt(e.target.value))}
                    />
                    <InputRightAddon children="%" />
                  </InputGroup>
                </FormControl>
              </Grid>
              <Grid
                templateColumns={[
                  "repeat(1, 1fr)",
                  "repeat(2, 1fr)",
                  "repeat(2, 1fr)",
                  "repeat(2, 1fr)",
                  "repeat(4, 1fr)",
                ]}
                gap={5}
              >
                <FormControl>
                  <FormLabel>Cliente</FormLabel>
                  <Input
                    placeholder="Cliente"
                    isReadOnly
                    value={raffle?.client_name}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>CPF</FormLabel>
                  <Input
                    placeholder="CPF"
                    isReadOnly
                    value={raffle?.client_cpf}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Telefone</FormLabel>
                  <Input
                    placeholder="Telefone"
                    isReadOnly
                    value={raffle?.client_phone}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input
                    placeholder="Email"
                    isReadOnly
                    value={raffle?.client_email}
                  />
                </FormControl>
              </Grid>
            </Flex>
          </Grid>
          <FormControl mt={3}>
            <FormLabel>Descrição da Rifa</FormLabel>
            <Textarea
              placeholder="Descrição da Rifa"
              resize={"none"}
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value.toUpperCase())}
            />
          </FormControl>
          <FormControl mt={3}>
            <FormLabel>Prêmios</FormLabel>
            <Grid
              templateColumns={["1fr", "1fr", "1fr 2fr", "1fr 3fr", "1fr 3fr"]}
              gap={5}
            >
              <Box>
                <Input
                  placeholder="Insira um prêmio"
                  value={trophyName}
                  onChange={(e) => setTrophyName(e.target.value.toUpperCase())}
                />
                <Button isFullWidth mt={2} onClick={() => handleTrophy()}>
                  Adicionar
                </Button>
              </Box>
              <Grid
                templateColumns={[
                  "repeat(1, 1fr)",
                  "repeat(2, 1fr)",
                  "repeat(2, 1fr)",
                  "repeat(3, 1fr)",
                  "repeat(3, 1fr)",
                ]}
                gap={5}
              >
                {trophies.map((tro) => (
                  <Grid
                    rounded="md"
                    borderWidth={"1px"}
                    h="min-content"
                    px={3}
                    py={3}
                    templateColumns="1fr 3fr 1fr"
                    w="100%"
                    key={tro.title}
                  >
                    <Icon as={AiOutlineTrophy} fontSize="2xl" />
                    <Text fontSize={"sm"}>{tro.title}</Text>
                    <IconButton
                      aria-label="remove"
                      icon={<FaTrash />}
                      colorScheme="red"
                      size="sm"
                      w="min-content"
                      justifySelf={"flex-end"}
                      onClick={() => delTrophy(tro.title)}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <FormHelperText
              color={useColorModeValue("blue.500", "blue.200")}
              mt={5}
            >
              * {trophy}
            </FormHelperText>
          </FormControl>
          <Divider my={5} />
          <Button
            colorScheme={"blue"}
            size="lg"
            isLoading={loading}
            onClick={() => storeRaffle()}
          >
            Salvar
          </Button>
        </Box>
      </Container>
    </Fragment>
  );
}
