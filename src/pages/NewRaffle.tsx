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
import InputMask from "react-input-mask";

registerLocale("pt_br", pt_br);

type Trophies = {
  title: string;
  description: string;
};

export default function NewRaffle() {
  const navigate = useNavigate();
  const toast = useToast();
  const inputRef = useRef(null);
  const { rifa } = useParams();

  const [name, setName] = useState<string>("");
  const [qtd_numbers, setQtd_numbers] = useState<number>(0);
  const [raffle_value, setRaffle_value] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [goal, setGoal] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [trophies, setTrophies] = useState<Trophies[]>([]);
  const [thumbnail, setThumbnail] = useState<any>(undefined);
  const [trophyName, setTrophyName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [client_name, setClient_name] = useState<string>("");
  const [client_cpf, setClient_cpf] = useState<string>("");
  const [client_email, setClient_email] = useState<string>("");
  const [client_phone, setClient_phone] = useState<string>("");

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
      showToast("Insira um pr??mio", "warning", "Aten????o");
      return false;
    }
    const result = trophies.find((obj) => obj.title === trophyName);
    if (result) {
      showToast("Este pr??mio j?? foi adicionado", "warning", "Aten????o");
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
      showToast("Insira uma imagem para a rifa", "warning", "Aten????o");
      return false;
    }
    if (name === "") {
      showToast("Insira um nome", "warning", "Aten????o");
      return false;
    }
    if (isNaN(qtd_numbers)) {
      showToast(
        "Insira uma quantidade de n??meros correta",
        "warning",
        "Aten????o"
      );
      return false;
    }
    if (raffle_value === "") {
      showToast("Insira um valor para a rifa", "warning", "Aten????o");
      return false;
    }
    if (startDate === new Date()) {
      showToast("Insira uma data diferente de hoje", "warning", "Aten????o");
      return false;
    }
    if (client_name === "") {
      showToast("Insira um nome do Cliente", "warning", "Aten????o");
      return false;
    }
    if (client_cpf === "") {
      showToast("Insira um CPF do Cliente", "warning", "Aten????o");
      return false;
    }
    if (client_phone === "") {
      showToast("Insira um Telefone do Cliente", "warning", "Aten????o");
      return false;
    }
    if (client_email === "") {
      showToast("Insira um Email do Cliente", "warning", "Aten????o");
      return false;
    }
    if (description === "") {
      showToast("Insira uma descri????o", "warning", "Aten????o");
      return false;
    }
    if (trophies.length === 0) {
      showToast("Insira pelo menos um pr??mio", "warning", "Aten????o");
      return false;
    }

    setLoading(true);

    let data = new FormData();
    data.append("name", name);
    data.append("qtd_numbers", qtd_numbers.toString());
    data.append("draw_date", startDate?.toString() || "");
    data.append("description", description);
    data.append("raffle_value", raffle_value);
    data.append("trophys", JSON.stringify(trophies));
    data.append("goal", goal.toString());
    data.append("thumbnail", thumbnail);
    data.append("client_name", client_name);
    data.append("client_cpf", client_cpf);
    data.append("client_email", client_email);
    data.append("client_phone", client_phone);

    try {
      const response = await api.post(`/raffleFromNew`, data);
      setLoading(false);
      showToast(response.data.message, "success", "Sucesso");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      setLoading(false);
      let message =
        (error as Error).message || "Ocorreu um erro ao processar a requisi????o";
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
                  <FormLabel>T??tulo da Rifa</FormLabel>
                  <Input
                    placeholder="T??tulo da Rifa"
                    value={name}
                    onChange={(e) => setName(e.target.value.toUpperCase())}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Qtd N??meros</FormLabel>
                  <NumberInput
                    value={qtd_numbers}
                    onChange={(e) => setQtd_numbers(parseInt(e))}
                  >
                    <NumberInputField placeholder="Qtd N??meros" />
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
                    dateFormat="dd/MM/yyyy '??s' hh:mm aa"
                    timeFormat="p"
                    showTimeInput
                    timeInputLabel="Hor??rio:"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Meta M??nima</FormLabel>
                  <InputGroup>
                    <InputLeftElement>
                      <Icon as={FiTarget} />
                    </InputLeftElement>
                    <Input
                      placeholder="Meta M??nima"
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
                    value={client_name}
                    onChange={(e) =>
                      setClient_name(e.target.value.toUpperCase())
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>CPF</FormLabel>
                  <Input
                    placeholder="CPF"
                    as={InputMask}
                    mask={"999.999.999-99"}
                    value={client_cpf}
                    onChange={(e) =>
                      setClient_cpf(e.target.value.toUpperCase())
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Telefone</FormLabel>
                  <Input
                    placeholder="Telefone"
                    as={InputMask}
                    mask="(99) 99999-9999"
                    value={client_phone}
                    onChange={(e) =>
                      setClient_phone(e.target.value.toUpperCase())
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input
                    placeholder="Email"
                    value={client_email}
                    onChange={(e) =>
                      setClient_email(e.target.value.toLowerCase())
                    }
                  />
                </FormControl>
              </Grid>
            </Flex>
          </Grid>
          <FormControl mt={3}>
            <FormLabel>Descri????o da Rifa</FormLabel>
            <Textarea
              placeholder="Descri????o da Rifa"
              resize={"none"}
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value.toUpperCase())}
            />
          </FormControl>
          <FormControl mt={3}>
            <FormLabel>Pr??mios</FormLabel>
            <Grid
              templateColumns={["1fr", "1fr", "1fr 2fr", "1fr 3fr", "1fr 3fr"]}
              gap={5}
            >
              <Box>
                <Input
                  placeholder="Insira um pr??mio"
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
