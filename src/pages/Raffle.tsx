import Header from "../components/Header";
import { Fragment } from "react";
import {
  Box,
  Container,
  Grid,
  Heading,
  IconButton,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { AiOutlineEdit } from "react-icons/ai";

export default function Raffle() {
  return (
    <Fragment>
      <Header title="Informações" />

      <Container mt={5} mb={5} maxW={"6xl"}>
        <Grid templateColumns={"300px 1fr"} gap={5}>
          <Image
            src="https://img.freepik.com/psd-gratuitas/super-rifa-renderizacao-em-3d_475327-317.jpg"
            rounded="md"
            shadow={"sm"}
          />
          <Box
            bg={useColorModeValue("white", "whiteAlpha.100")}
            rounded="md"
            shadow={"sm"}
            borderWidth="1px"
            p={3}
            h="min-content"
          >
            <Heading fontSize={"3xl"}>
              TÍTULO DA RIFA{" "}
              <IconButton
                aria-label="edit"
                icon={<AiOutlineEdit />}
                size="sm"
                colorScheme={"blue"}
                variant="outline"
              />
            </Heading>
            <Text mt={3}>
              A expressão Lorem ipsum em design gráfico e editoração é um texto
              padrão em latim utilizado na produção gráfica para preencher os
              espaços de texto em publicações para testar e ajustar aspectos
              visuais antes de utilizar conteúdo real.{" "}
              <IconButton
                aria-label="edit"
                icon={<AiOutlineEdit />}
                size="sm"
                colorScheme={"blue"}
                variant="outline"
              />
            </Text>
          </Box>
        </Grid>
      </Container>
    </Fragment>
  );
}
