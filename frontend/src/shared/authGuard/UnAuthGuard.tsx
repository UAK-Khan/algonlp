import { Navigate } from "react-router-dom";
import {useAppStateContext} from "../provider/AppStateProvider";
import {HOMEPAGE} from "../routesConstants";

type PropTypes = {
  children: JSX.Element;
};

const UnAuthGuard = ({ children }: PropTypes) => {
  const { user } = useAppStateContext();

  return !user
    ? children
    : <Navigate to={HOMEPAGE} replace />;
}

export default UnAuthGuard;
