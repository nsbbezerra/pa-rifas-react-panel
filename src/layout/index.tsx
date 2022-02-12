import { FC, Fragment } from "react";
import {
  Grid,
  Box,
  Flex,
  Image,
  useColorModeValue,
  Stack,
  HStack,
} from "@chakra-ui/react";
import Logo from "../assets/logo.svg";
import {
  AiOutlineFileMarkdown,
  AiOutlinePercentage,
  AiOutlineSave,
  AiOutlineShoppingCart,
  AiOutlineTool,
  AiOutlineUser,
} from "react-icons/ai";
import { MdKeyboardArrowRight } from "react-icons/md";
import Routing from "../routes/routes";
import { useNavigate } from "react-router-dom";

const Layout: FC = () => {
  const navigate = useNavigate();
  return (
    <Fragment>
      <Grid
        width={"100%"}
        height={"100%"}
        templateColumns={["1fr", "1fr", "200px 1fr", "200px 1fr", "200px 1fr"]}
      >
        <Flex
          w="200px"
          h={"100%"}
          direction="column"
          align={"center"}
          justify="flex-start"
          px={3}
          py={5}
          shadow="lg"
          bg={useColorModeValue("", "whiteAlpha.50")}
          borderRightWidth="1px"
          d={["none", "none", "flex", "flex", "flex"]}
        >
          <Image src={Logo} w="50%" />

          <Stack mt={10} w="100%">
            <Flex
              align={"center"}
              justify="space-between"
              fontSize={"lg"}
              cursor="pointer"
              _hover={{ bg: useColorModeValue("gray.100", "gray.800") }}
              px={3}
              py={2}
              fontWeight="semibold"
              rounded={"sm"}
              color={useColorModeValue("gray.700", "gray.100")}
              onClick={() => navigate("/clientes")}
            >
              <HStack>
                <AiOutlineUser />
                <span>Clientes</span>
              </HStack>
              <MdKeyboardArrowRight />
            </Flex>
            <Flex
              align={"center"}
              justify="space-between"
              fontSize={"lg"}
              cursor="pointer"
              _hover={{ bg: useColorModeValue("gray.100", "gray.800") }}
              px={3}
              py={2}
              fontWeight="semibold"
              rounded={"sm"}
              color={useColorModeValue("gray.700", "gray.100")}
            >
              <HStack>
                <AiOutlineFileMarkdown />
                <span>Pedidos</span>
              </HStack>
              <MdKeyboardArrowRight />
            </Flex>
            <Flex
              align={"center"}
              justify="space-between"
              fontSize={"lg"}
              cursor="pointer"
              _hover={{ bg: useColorModeValue("gray.100", "gray.800") }}
              px={3}
              py={2}
              fontWeight="semibold"
              rounded={"sm"}
              color={useColorModeValue("gray.700", "gray.100")}
            >
              <HStack>
                <AiOutlineSave />
                <span>Criar Rifa</span>
              </HStack>
              <MdKeyboardArrowRight />
            </Flex>
            <Flex
              align={"center"}
              justify="space-between"
              fontSize={"lg"}
              cursor="pointer"
              _hover={{ bg: useColorModeValue("gray.100", "gray.800") }}
              px={3}
              py={2}
              fontWeight="semibold"
              rounded={"sm"}
              color={useColorModeValue("gray.700", "gray.100")}
            >
              <HStack>
                <AiOutlineTool />
                <span>Rifas</span>
              </HStack>
              <MdKeyboardArrowRight />
            </Flex>
            <Flex
              align={"center"}
              justify="space-between"
              fontSize={"lg"}
              cursor="pointer"
              _hover={{ bg: useColorModeValue("gray.100", "gray.800") }}
              px={3}
              py={2}
              fontWeight="semibold"
              rounded={"sm"}
              color={useColorModeValue("gray.700", "gray.100")}
            >
              <HStack>
                <AiOutlinePercentage />
                <span>Cupons</span>
              </HStack>
              <MdKeyboardArrowRight />
            </Flex>
            <Flex
              align={"center"}
              justify="space-between"
              fontSize={"lg"}
              cursor="pointer"
              _hover={{ bg: useColorModeValue("gray.100", "gray.800") }}
              px={3}
              py={2}
              fontWeight="semibold"
              rounded={"sm"}
              color={useColorModeValue("gray.700", "gray.100")}
            >
              <HStack>
                <AiOutlineShoppingCart />
                <span>Compras</span>
              </HStack>
              <MdKeyboardArrowRight />
            </Flex>
          </Stack>
        </Flex>
        <Box
          bg={useColorModeValue("gray.50", "")}
          h="100%"
          maxH={"100%"}
          overflow="auto"
        >
          <Routing />
        </Box>
      </Grid>
    </Fragment>
  );
};

export default Layout;
