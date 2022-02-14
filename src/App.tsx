import { Box, ChakraProvider } from "@chakra-ui/react";
import { themeApp } from "./styles/theme";
import { BrowserRouter } from "react-router-dom";
import Layout from "./layout";
import DrawerContext from "./hooks/useDrawer";
import "react-datepicker/dist/react-datepicker.css";

function App() {
  return (
    <BrowserRouter>
      <DrawerContext>
        <ChakraProvider resetCSS theme={themeApp}>
          <Box w={"100vw"} h="100vh">
            <Layout />
          </Box>
        </ChakraProvider>
      </DrawerContext>
    </BrowserRouter>
  );
}

export default App;
