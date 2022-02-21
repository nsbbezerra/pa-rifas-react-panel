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
          <Image src={Logo} w="20vw" draggable={false} />

          <Text textAlign={"center"} fontWeight="semibold" mt={5}>
            Sistema desenvolvido por: NK Informática - (63) 99971-1716
          </Text>
        </Flex>
      </Container>
    </Fragment>
  );
}
