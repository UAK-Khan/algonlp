import {useLoginUserRequest, useLogoutUserRequest, useUserSessionRequest} from "./apiHooks/AuthApiRequestHooks";
import {HOMEPAGE, LOGIN_ROUTE} from "../routesConstants";
import {useCallback} from "react";
import {message} from "antd";
import {LoginRequestType} from "../interfaces/moduleTypes";

const useAuth = () => {
  const auth = useUserSessionRequest();

  const isLoading = auth.isLoading;

  const { refetch } = useLogoutUserRequest(() => {
    window.location.replace(LOGIN_ROUTE);
  })

  const { mutate: onLogin, isLoading: isLoginLoading } = useLoginUserRequest((data) => {
    message.success(data.message);
    if (data?.data.redirect) {
      window.location.replace(data?.data.redirect);
    } else {
      window.location.replace(HOMEPAGE);
    }
  });

  const login = useCallback((data: LoginRequestType) => {
    onLogin(data);
  }, [onLogin]);

  const logout = useCallback(() => {
    refetch();
  }, [refetch])

  return {
    user: auth.data?.data,
    login,
    logout,
    isLoading,
    isLoginLoading,
  }
}

export default useAuth;
