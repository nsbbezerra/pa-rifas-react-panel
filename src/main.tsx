import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ColorModeScript, ColorModeProvider } from "@chakra-ui/react";

ReactDOM.render(
  <React.StrictMode>
    <ColorModeProvider options={{ useSystemColorMode: true }}>
      <ColorModeScript initialColorMode="system" />
      <App />
    </ColorModeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
