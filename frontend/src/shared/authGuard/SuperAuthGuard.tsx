import { Navigate } from "react-router-dom";
import {useAppStateContext} from "../provider/AppStateProvider";
import {HOMEPAGE} from "../routesConstants";

type PropTypes = {
  children: JSX.Element;
};

const SuperAuthGuard = ({ children }: PropTypes) => {
  const { user } = useAppStateContext();

  return user && user.type === "admin"
    ? children
    : <Navigate to={HOMEPAGE} replace />;
}

export default SuperAuthGuard;
