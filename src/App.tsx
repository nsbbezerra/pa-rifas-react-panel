import { Box, ChakraProvider } from "@chakra-ui/react";
import { themeApp } from "./styles/theme";
import { BrowserRouter } from "react-router-dom";
import Layout from "./layout";

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider resetCSS theme={themeApp}>
        <Box w={"100vw"} h="100vh">
          <Layout />
        </Box>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
