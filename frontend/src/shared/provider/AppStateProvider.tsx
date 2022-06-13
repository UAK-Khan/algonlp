import {createContext, useContext} from "react";
import {LoginRequestType, UsersType} from "../interfaces/moduleTypes";
import LoaderComp from "../../components/loader/LoaderComp";
import useAuth from "../hooks/authHook";

type PropTypes = {
  children: JSX.Element;
};

export const AppStateContext = createContext<IAppStateContextType | undefined>(undefined);
AppStateContext.displayName = "App State Context";

export const useAppStateContext = (): IAppStateContextType => {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error("useAppStateContext must be within AppStateContext");
  }

  return context;
};

export type IAppStateContextType = {
  user?: UsersType;
  login: (data: LoginRequestType) => void;
  logout: () => void;
  isLoginLoading: boolean;
}

export const AppStateProvider = ({ children }: PropTypes) => {
  const { isLoading, user, login, logout, isLoginLoading } = useAuth();

  return (
    <AppStateContext.Provider value={{ user, login, logout, isLoginLoading  }}>
      <LoaderComp isLoading={isLoading}>
        { !isLoading ? children: <></> }
      </LoaderComp>
    </AppStateContext.Provider>
  )
}
