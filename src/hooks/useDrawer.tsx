import { FC } from "react";
import { DrawerContextProvider } from "../context/Drawer";

const DrawerContext: FC = ({ children }) => {
  return <DrawerContextProvider>{children}</DrawerContextProvider>;
};

export default DrawerContext;
