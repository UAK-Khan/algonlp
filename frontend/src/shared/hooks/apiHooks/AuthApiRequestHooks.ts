import axios from "axios";
import {
  ChangePasswordRequestType,
  ForgotPasswordRequestType,
  LoginRequestType,
  RegisterUserRequestType,
  ResetPasswordRequestType,
  UsersType, VerifyAccountRequestType
} from "../../interfaces/moduleTypes";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {DefaultResponseType} from "../../interfaces/ajaxTypes";

export const AUTH_ROUTE = "/auth";

export const useRegisterUserRequest = (onSuccess?: (data: DefaultResponseType) => void) => {
  return useMutation((data: RegisterUserRequestType) => {
    return axios.post<DefaultResponseType>(`${AUTH_ROUTE}/register`, data).then((data) => data.data);
  }, { onSuccess });
}

export const useLoginUserRequest = (onSuccess?: (data: DefaultResponseType<{redirect: string}>) => void) => {
  return useMutation((data: LoginRequestType) => {
    return axios.post(`${AUTH_ROUTE}/login`, data).then((data) => data.data);
  }, { onSuccess });
}

export const useForgotPasswordRequest = (onSuccess?: (data: DefaultResponseType) => void) => {
  return useMutation((data: ForgotPasswordRequestType) => {
    return axios.post<DefaultResponseType>(`${AUTH_ROUTE}/forgot-password`, data).then((data) => data.data);
  }, { onSuccess });
}

export const useResetPasswordRequest = (onSuccess?: (data: DefaultResponseType) => void) => {
  return useMutation((data: ResetPasswordRequestType) => {
    return axios.post<DefaultResponseType>(`${AUTH_ROUTE}/reset-password`, data).then((data) => data.data);
  }, { onSuccess });
}
export const useChangePasswordRequest = (onSuccess?: (data: DefaultResponseType) => void) => {
  return useMutation((data: ChangePasswordRequestType) => {
    return axios.put<DefaultResponseType>(`${AUTH_ROUTE}/change-password`, data).then((data) => data.data);
  }, { onSuccess });
}

export const useLogoutUserRequest = (onSuccess?: (data: DefaultResponseType) => void) => {
  const queryClient = useQueryClient();
  const query = `${AUTH_ROUTE}/logout`;
  return useQuery(query, () => {
    return axios.get(query).then((data) => {
      queryClient.removeQueries(`${AUTH_ROUTE}/session`);
      return data.data
    });
  }, { enabled: false, onSuccess });
}

export const useUserSessionRequest = (onSuccess?: (data: DefaultResponseType<UsersType>) => void) => {
  const query = `${AUTH_ROUTE}/session`;
  return useQuery<DefaultResponseType<UsersType>>(query, () => {
    // validateStatus = false, will prevent error to be thrown if error occurred, we don't want to
    // show error msg for this request
    return axios.get(query, { validateStatus: () => true }).then((data) => data.data)
  }, { onSuccess, retry: false });
}

export const useVerifyAccountRequest = (onSuccess?: (data: DefaultResponseType) => void) => {
  return useMutation((reqData: VerifyAccountRequestType) => {
    return axios.get<DefaultResponseType>(`${AUTH_ROUTE}/verify-account/${reqData.userId}/${reqData.verificationCode}`)
      .then((data) => data.data);
  }, { onSuccess });
}
