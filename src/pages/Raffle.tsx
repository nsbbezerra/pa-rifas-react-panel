import Header from "../components/Header";
import { forwardRef, Fragment, useRef, useState } from "react";
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
} from "@chakra-ui/react";
import { AiOutlineCalendar, AiOutlineEdit } from "react-icons/ai";
import DatePicker, { registerLocale } from "react-datepicker";
import pt_br from "date-fns/locale/pt-BR";

registerLocale("pt_br", pt_br);

export default function Raffle() {
  const inputRef = useRef(null);
  const [information, setInformation] = useState<boolean>(false);
  const [trophy, setTrophy] = useState<boolean>(false);
  const [drawn, setDrawn] = useState<boolean>(false);
  const [winner, setWinner] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date | null>(new Date());

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
      <Header title="Informações" />

      <Container mt={5} mb={5} maxW={"6xl"}>
        <Grid
          templateColumns={["1fr", "1fr", "1fr", "270px 1fr", "270px 1fr"]}
          gap={5}
          justifyItems="center"
        >
          <Image
            src="https://img.freepik.com/psd-gratuitas/super-rifa-renderizacao-em-3d_475327-317.jpg"
            rounded="md"
            shadow={"sm"}
            maxW="full"
          />
          <Box>
            <Box
              bg={useColorModeValue("white", "whiteAlpha.100")}
              rounded="md"
              shadow={"sm"}
              borderWidth="1px"
              p={3}
              h="min-content"
            >
              <Heading fontSize={"3xl"}>TÍTULO DA RIFA</Heading>
              <Text mt={3}>
                A expressão Lorem ipsum em design gráfico e editoração é um
                texto padrão em latim utilizado na produção gráfica para
                preencher os espaços de texto em publicações para testar e
                ajustar aspectos visuais antes de utilizar conteúdo real.
              </Text>

              <Button
                colorScheme={"blue"}
                size="sm"
                mt={3}
                onClick={() => setInformation(true)}
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
                  <StatNumber>100</StatNumber>
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
                  <StatNumber>100</StatNumber>
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
                  <StatNumber>R$ 1,50</StatNumber>
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
          align={["flex-start", "center", "center", "center", "center"]}
          direction={["column", "row", "row", "row", "row"]}
        >
          <Stat>
            <StatLabel>Data do Sorteio</StatLabel>
            <StatNumber>10/10/1000 às 19:00h</StatNumber>
          </Stat>
          <Flex align={"end"}>
            <FormControl>
              <FormLabel mb={0}>Nova Data</FormLabel>
              <DatePicker
                selected={startDate}
                onChange={(date: Date | null) => setStartDate(date)}
                customInput={<CustomInput ref={inputRef} />}
                locale="pt_br"
                dateFormat="dd/MM/yyyy 'às' hh:mm aa"
                timeFormat="p"
                showTimeInput
                timeInputLabel="Horário:"
                showPopperArrow={false}
              />
            </FormControl>
            <Button colorScheme={"blue"} ml={2}>
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
              <StatNumber>R$ 10,00</StatNumber>
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
              <StatNumber>R$ 10,00</StatNumber>
              <StatHelpText>Descontado R$ 53,30</StatHelpText>
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
              <StatNumber>R$ 10,00</StatNumber>
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
              <StatNumber>R$ 10,00</StatNumber>
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
          <Box
            bg={useColorModeValue("white", "whiteAlpha.100")}
            rounded="md"
            shadow={"sm"}
            borderWidth="1px"
            h="fit-content"
          >
            <Text p={2} fontWeight="semibold">
              1 pix de 3000 mil reais weqweqw{" "}
              <IconButton
                aria-label="edit"
                variant={"outline"}
                icon={<AiOutlineEdit />}
                size="sm"
                colorScheme={"blue"}
                onClick={() => setTrophy(true)}
              />
            </Text>
            <Box
              w="100%"
              borderBottomWidth={"1px"}
              borderBottomStyle="dashed"
            />
            <HStack p={2}>
              <Badge p={1} colorScheme="yellow">
                aguardando
              </Badge>
              <Button
                isFullWidth
                colorScheme={"blue"}
                size="sm"
                onClick={() => setDrawn(true)}
              >
                Sortear
              </Button>
            </HStack>
          </Box>
        </Grid>
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
              <Input placeholder="Título da Rifa" />
            </FormControl>
            <FormControl mt={3}>
              <FormLabel>Descrição da Rifa</FormLabel>
              <Textarea rows={5} resize="none" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={() => setInformation(false)}>
              Fechar
            </Button>
            <Button colorScheme={"blue"}>Salvar</Button>
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
              <Input placeholder="Número sorteado" />
            </FormControl>
            <FormControl mt={3}>
              <FormLabel>Data do Sorteio</FormLabel>
              <Input placeholder="Data do Sorteio" />
            </FormControl>
            <FormControl mt={3}>
              <FormLabel>Número do Concurso</FormLabel>
              <Input placeholder="Número do Concurso" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={() => setDrawn(false)}>
              Fechar
            </Button>
            <Button colorScheme={"blue"}>Sortear</Button>
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
              <Input placeholder="Descrição do Prêmio" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={() => setTrophy(false)}>
              Fechar
            </Button>
            <Button colorScheme={"blue"}>Salvar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Fragment>
  );
}
