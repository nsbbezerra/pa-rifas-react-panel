import {
  Box,
  Container,
  Flex,
  FormControl,
  FormLabel,
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
  Skeleton,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { Fragment, useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { MdKeyboardArrowRight } from "react-icons/md";
import Header from "../components/Header";
import InputMask from "react-input-mask";
import { useFetch } from "../hooks/useFetch";
import { configs } from "../configs";

type Clients = {
  name: string;
  cpf: string;
  email: string;
  phone: string;
};

type Count = {
  count: string;
};

export default function Clients() {
  const toast = useToast();
  const [cpf, setCpf] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [pages, setPages] = useState<number>(0);

  const { data, error } = useFetch(
    `/findAllClients/${page}/${cpf === "" ? "all" : cpf}`,
    10000
  );

  const [clients, setClients] = useState<Clients[]>([]);

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
      setClients(data.clients);
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

  return (
    <Fragment>
      <Header title="Clientes" />

      <Container maxW={"6xl"} mb={5}>
        <Box
          bg={useColorModeValue("white", "whiteAlpha.100")}
          rounded="md"
          shadow={"sm"}
          borderWidth="1px"
          mt={5}
          px={5}
          py={3}
        >
          <FormControl>
            <FormLabel>Digite um CPF para buscar</FormLabel>
            <Input
              as={InputMask}
              mask="999.999.999-99"
              placeholder="Digite um CPF para buscar"
              onChange={(e) => setCpf(e.target.value)}
            />
          </FormControl>
        </Box>

        <Box
          mt={5}
          bg={useColorModeValue("white", "whiteAlpha.100")}
          rounded="md"
          shadow={"sm"}
          borderWidth="1px"
        >
          {clients.length === 0 ? (
            <Stack mt={5} px={5}>
              <Skeleton w="100%" h={7} />
              <Skeleton w="100%" h={7} />
              <Skeleton w="100%" h={7} />
              <Skeleton w="100%" h={7} />
              <Skeleton w="100%" h={7} />
            </Stack>
          ) : (
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
                    <Th w="150px" minW="150px">
                      email
                    </Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {clients.map((cli) => (
                    <Tr key={cli.cpf}>
                      <Td minW="xs">{cli.name}</Td>
                      <Td w="150px" minW="150px">
                        {cli.cpf}
                      </Td>
                      <Td w="150px" minW="150px">
                        {cli.phone}
                      </Td>
                      <Td w="150px" minW="150px">
                        {cli.email}
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
                d={["block", "block", "block", "none", "none"]}
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
    </Fragment>
  );
}
