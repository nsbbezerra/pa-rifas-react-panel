import {
  Box,
  Flex,
  HStack,
  IconButton,
  Image,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import Logo from "../assets/logo.svg";

interface IProps {
  title: string;
}

export default function Header({ title }: IProps) {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  return (
    <Box
      h={"60px"}
      bg={useColorModeValue("white", "whiteAlpha.50")}
      zIndex={1000}
      borderBottomWidth="1px"
    >
      <Flex
        align={"center"}
        justify={"space-between"}
        h="100%"
        px={[5, 5, 10, 10, 10]}
        pos="sticky"
        mt={0}
      >
        <HStack>
          <Image
            src={Logo}
            h="45px"
            display={["block", "block", "none", "none", "none"]}
          />
          <Text fontWeight={"semibold"} fontSize="lg">
            {title}
          </Text>
        </HStack>

        <HStack>
          <IconButton
            aria-label="home"
            icon={<AiFillHome />}
            onClick={() => navigate("/")}
          />
          <IconButton
            aria-label="theme"
            icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
            onClick={toggleColorMode}
          />
        </HStack>
      </Flex>
    </Box>
  );
}
