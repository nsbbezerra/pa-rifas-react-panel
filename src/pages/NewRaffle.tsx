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
} from "@chakra-ui/react";
import { forwardRef, Fragment, useRef, useState } from "react";
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

registerLocale("pt_br", pt_br);

export default function NewRaffle() {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const inputRef = useRef(null);

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
                  <Input type={"file"} name="image" id="image" d="none" />
                </Flex>
              </FormLabel>
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
                  <Input placeholder="Título da Rifa" />
                </FormControl>
                <FormControl>
                  <FormLabel>Qtd Números</FormLabel>
                  <NumberInput>
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
                    <Input placeholder="Valor da Cota" />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <FormLabel>Data do Sorteio</FormLabel>
                  <DatePicker
                    selected={startDate}
                    onChange={(date: Date | null) => setStartDate(date)}
                    customInput={<CustomInput inputRef={inputRef} />}
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
                    <Input placeholder="Meta Mínima" />
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
                  <Input placeholder="Cliente" isReadOnly />
                </FormControl>
                <FormControl>
                  <FormLabel>CPF</FormLabel>
                  <Input placeholder="CPF" isReadOnly />
                </FormControl>
                <FormControl>
                  <FormLabel>Telefone</FormLabel>
                  <Input placeholder="Telefone" isReadOnly />
                </FormControl>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input placeholder="Email" isReadOnly />
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
            />
          </FormControl>
          <FormControl mt={3}>
            <FormLabel>Prêmios</FormLabel>
            <Grid
              templateColumns={["1fr", "1fr", "1fr 2fr", "1fr 3fr", "1fr 3fr"]}
              gap={5}
            >
              <Box>
                <Input placeholder="Insira um prêmio" />
                <Button isFullWidth mt={2}>
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
                <Grid
                  rounded="md"
                  borderWidth={"1px"}
                  h="min-content"
                  px={3}
                  py={3}
                  templateColumns="1fr 3fr 1fr"
                  w="100%"
                >
                  <Icon as={AiOutlineTrophy} />
                  <Text fontSize={"xs"}>
                    dhaskjdhask jdasidoasidha osidhaskdhas jdhkajsdhakjh
                  </Text>
                  <IconButton
                    aria-label="remove"
                    icon={<FaTrash />}
                    colorScheme="red"
                    size="xs"
                  />
                </Grid>
                <Grid
                  rounded="md"
                  borderWidth={"1px"}
                  h="min-content"
                  px={3}
                  py={3}
                  templateColumns="1fr 3fr 1fr"
                  w="100%"
                >
                  <Icon as={AiOutlineTrophy} />
                  <Text fontSize={"xs"}>
                    dhaskjdhask jdasidoasidha osidhaskdhas jdhkajsdhakjh
                  </Text>
                  <IconButton
                    aria-label="remove"
                    icon={<FaTrash />}
                    colorScheme="red"
                    size="xs"
                  />
                </Grid>
                <Grid
                  rounded="md"
                  borderWidth={"1px"}
                  h="min-content"
                  px={3}
                  py={3}
                  templateColumns="1fr 3fr 1fr"
                  w="100%"
                >
                  <Icon as={AiOutlineTrophy} />
                  <Text fontSize={"xs"}>
                    dhaskjdhask jdasidoasidha osidhaskdhas jdhkajsdhakjh
                  </Text>
                  <IconButton
                    aria-label="remove"
                    icon={<FaTrash />}
                    colorScheme="red"
                    size="xs"
                  />
                </Grid>
                <Grid
                  rounded="md"
                  borderWidth={"1px"}
                  h="min-content"
                  px={3}
                  py={3}
                  templateColumns="1fr 3fr 1fr"
                  w="100%"
                >
                  <Icon as={AiOutlineTrophy} />
                  <Text fontSize={"xs"}>
                    dhaskjdhask jdasidoasidha osidhaskdhas jdhkajsdhakjh
                  </Text>
                  <IconButton
                    aria-label="remove"
                    icon={<FaTrash />}
                    colorScheme="red"
                    size="xs"
                  />
                </Grid>
                <Grid
                  rounded="md"
                  borderWidth={"1px"}
                  h="min-content"
                  px={3}
                  py={3}
                  templateColumns="1fr 3fr 1fr"
                  w="100%"
                >
                  <Icon as={AiOutlineTrophy} />
                  <Text fontSize={"xs"}>
                    dhaskjdhask jdasidoasidha osidhaskdhas jdhkajsdhakjh
                  </Text>
                  <IconButton
                    aria-label="remove"
                    icon={<FaTrash />}
                    colorScheme="red"
                    size="xs"
                  />
                </Grid>
              </Grid>
            </Grid>
          </FormControl>
          <Divider my={5} />
          <Button colorScheme={"blue"} size="lg">
            Salvar
          </Button>
        </Box>
      </Container>
    </Fragment>
  );
}
