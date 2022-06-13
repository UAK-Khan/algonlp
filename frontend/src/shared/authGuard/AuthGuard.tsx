import {Navigate} from "react-router-dom";
import {useAppStateContext} from "../provider/AppStateProvider";
import {LOGIN_ROUTE} from "../routesConstants";

type PropTypes = {
  children: JSX.Element;
};

// todo: follow and add feature to redirect back user to where it was before when not logged in
//  https://ui.dev/react-router-protected-routes-authentication/
const AuthGuard = ({ children }: PropTypes) => {
  const { user } = useAppStateContext();

  return user
    ? children
    : <Navigate to={LOGIN_ROUTE} replace/>;
}

export default AuthGuard;
