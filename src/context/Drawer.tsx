import { createContext, Dispatch, SetStateAction, useState, FC } from "react";

type IsOpen = {
  open: boolean;
};

type PropsDrawerContext = {
  state: IsOpen;
  setState: Dispatch<SetStateAction<IsOpen>>;
};

const DEFAULT_VALUE = {
  state: {
    open: false,
  },
  setState: () => {},
};

const DrawerContext = createContext<PropsDrawerContext>(DEFAULT_VALUE);

const DrawerContextProvider: FC = ({ children }) => {
  const [state, setState] = useState(DEFAULT_VALUE.state);
  return (
    <DrawerContext.Provider value={{ state, setState }}>
      {children}
    </DrawerContext.Provider>
  );
};

export { DrawerContextProvider };
export default DrawerContext;
