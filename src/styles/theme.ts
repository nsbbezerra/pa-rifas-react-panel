import { extendTheme, theme } from "@chakra-ui/react";

const themeApp = extendTheme({
  ...theme,
  fonts: {
    body: "Roboto Condensed, sans-serif",
    heading: "Roboto Condensed, sans-serif",
    mono: "Roboto Condensed, sans-serif",
  },
  components: {
    Button: {
      baseStyle: { _focus: { boxShadow: "none" } },
    },
    CloseButton: {
      baseStyle: { _focus: { boxShadow: "none" } },
    },
    Tabs: {
      baseStyle: { tab: { _focus: { boxShadow: "none" } } },
    },
    Menu: {
      baseStyle: {
        list: {
          boxShadow: "lg",
        },
      },
    },
    Popover: {
      baseStyle: {
        content: { boxShadow: "lg" },
      },
    },
    Checkbox: {
      baseStyle: { control: { _focus: { boxShadow: "none" } } },
    },
    Switch: {
      baseStyle: {
        control: { _focus: { boxShadow: "none" } },
      },
    },
  },
});

export { themeApp };
