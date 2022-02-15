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
} from "@chakra-ui/react";
import { Fragment, useState } from "react";
import Header from "../components/Header";
import Logo from "../assets/logo.svg";

export default function Orders() {
  const [payment, setPayment] = useState<boolean>(false);

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
              <Select>
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
          <Box
            rounded={"md"}
            shadow="sm"
            bg={"green.100"}
            color="gray.800"
            pb={2}
            h="min-content"
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
                <Text fontSize="xs">DATA: 15/02/2000 às 09:46H</Text>
                <Text fontSize="xs" fontWeight={"bold"}>
                  COMPRA Nº: 425
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
              CLIENTE: <strong>NATANAEL DOS SANTOS BEZERRA</strong>
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
                <Flex
                  p={1}
                  bg={"gray.300"}
                  rounded="md"
                  fontWeight={"bold"}
                  justify="center"
                  align={"center"}
                  fontSize="sm"
                >
                  649
                </Flex>
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
              <Text fontWeight={"bold"}>R$ 1,50</Text>
            </Flex>
            <Flex justify={"space-between"} align="center" px={2} fontSize="xs">
              <Text>PAGAMENTO</Text>
              <Text fontWeight={"bold"}>R$ 1,50</Text>
            </Flex>
            <Flex justify={"space-between"} align="center" px={2} fontSize="xs">
              <Text>ID PAGAMENTO</Text>
              <Text fontWeight={"bold"}>13901293719283</Text>
            </Flex>
          </Box>
          <Box
            rounded={"md"}
            shadow="sm"
            bg={"yellow.100"}
            color="gray.800"
            pb={2}
            h="min-content"
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
                <Text fontSize="xs">DATA: 15/02/2000 às 09:46H</Text>
                <Text fontSize="xs" fontWeight={"bold"}>
                  COMPRA Nº: 425
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
              CLIENTE: <strong>NATANAEL DOS SANTOS BEZERRA</strong>
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
                <Flex
                  p={1}
                  bg={"gray.300"}
                  rounded="md"
                  fontWeight={"bold"}
                  justify="center"
                  align={"center"}
                  fontSize="sm"
                >
                  649
                </Flex>
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
              <Text fontWeight={"bold"}>R$ 1,50</Text>
            </Flex>
            <Button
              size={"sm"}
              colorScheme="blue"
              ml={2}
              mt={2}
              onClick={() => setPayment(true)}
            >
              Confirmar Pagamento
            </Button>
          </Box>
          <Box
            rounded={"md"}
            shadow="sm"
            bg={"green.100"}
            color="gray.800"
            pb={2}
            h="min-content"
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
                <Text fontSize="xs">DATA: 15/02/2000 às 09:46H</Text>
                <Text fontSize="xs" fontWeight={"bold"}>
                  COMPRA Nº: 425
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
              CLIENTE: <strong>NATANAEL DOS SANTOS BEZERRA</strong>
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
                <Flex
                  p={1}
                  bg={"gray.300"}
                  rounded="md"
                  fontWeight={"bold"}
                  justify="center"
                  align={"center"}
                  fontSize="sm"
                >
                  649
                </Flex>
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
              <Text fontWeight={"bold"}>R$ 1,50</Text>
            </Flex>
            <Flex justify={"space-between"} align="center" px={2} fontSize="xs">
              <Text>PAGAMENTO</Text>
              <Text fontWeight={"bold"}>R$ 1,50</Text>
            </Flex>
            <Flex justify={"space-between"} align="center" px={2} fontSize="xs">
              <Text>ID PAGAMENTO</Text>
              <Text fontWeight={"bold"}>13901293719283</Text>
            </Flex>
          </Box>
          <Box
            rounded={"md"}
            shadow="sm"
            bg={"yellow.100"}
            color="gray.800"
            pb={2}
            h="min-content"
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
                <Text fontSize="xs">DATA: 15/02/2000 às 09:46H</Text>
                <Text fontSize="xs" fontWeight={"bold"}>
                  COMPRA Nº: 425
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
              CLIENTE: <strong>NATANAEL DOS SANTOS BEZERRA</strong>
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
                <Flex
                  p={1}
                  bg={"gray.300"}
                  rounded="md"
                  fontWeight={"bold"}
                  justify="center"
                  align={"center"}
                  fontSize="sm"
                >
                  649
                </Flex>
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
              <Text fontWeight={"bold"}>R$ 1,50</Text>
            </Flex>
            <Button size={"sm"} colorScheme="blue" ml={2} mt={2}>
              Confirmar Pagamento
            </Button>
          </Box>
        </Grid>
      </Container>

      <Modal
        isOpen={payment}
        onClose={() => setPayment(false)}
        scrollBehavior="inside"
        size="sm"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmar Pagamento</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <RadioGroup>
              <Stack spacing={2}>
                <Radio colorScheme="yellow" value="waiting">
                  Aguardando
                </Radio>
                <Radio colorScheme="green" value="paid_out">
                  Pago
                </Radio>
              </Stack>
            </RadioGroup>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={() => setPayment(false)}>
              Fechar
            </Button>
            <Button colorScheme={"blue"}>Salvar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Fragment>
  );
}
