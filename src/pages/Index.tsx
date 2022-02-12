import {
  Box,
  Container,
  Flex,
  Grid,
  Icon,
  Image,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Fragment } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { MdOutlineReceipt } from "react-icons/md";
import Header from "../components/Header";
import Logo from "../assets/logo.svg";

export default function Index() {
  return (
    <Fragment>
      <Header title="Dashboard" />

      <Container maxW={"6xl"}>
        <Grid
          mt={10}
          templateColumns={[
            "repeat(1, 1fr)",
            "repeat(2, 1fr)",
            "repeat(2, 1fr)",
            "repeat(2, 1fr)",
            "repeat(2, 1fr)",
          ]}
          gap={[5, 5, 10, 10, 10]}
        >
          <Box
            bg={useColorModeValue("white", "whiteAlpha.100")}
            rounded="md"
            shadow={"sm"}
            px={5}
            py={3}
            borderWidth="1px"
          >
            <Flex align={"center"} gap={5}>
              <Icon as={AiOutlineUser} fontSize="4xl" />
              <Stat>
                <StatLabel>Clientes Cadastrados</StatLabel>
                <StatNumber>1000</StatNumber>
              </Stat>
            </Flex>
          </Box>
          <Box
            bg={useColorModeValue("white", "whiteAlpha.100")}
            rounded="md"
            shadow={"sm"}
            px={5}
            py={3}
            borderWidth="1px"
          >
            <Flex align={"center"} gap={5}>
              <Icon as={MdOutlineReceipt} fontSize="4xl" />
              <Stat>
                <StatLabel>Rifas Ativas</StatLabel>
                <StatNumber>1000</StatNumber>
              </Stat>
            </Flex>
          </Box>
        </Grid>

        <Flex
          mt={[5, 5, 10, 10, 10]}
          bg={useColorModeValue("white", "whiteAlpha.100")}
          p={10}
          rounded="md"
          shadow={"sm"}
          borderWidth="1px"
          direction={"column"}
          justify="center"
          align={"center"}
        >
          <Image src={Logo} w="20vw" />

          <Text textAlign={"center"} fontWeight="semibold" mt={5}>
            Sistema desenvolvido por: NK Informática - (63) 99971-1716
          </Text>
        </Flex>
      </Container>
    </Fragment>
  );
}
