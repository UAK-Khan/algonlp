import React from 'react';
import {AxiosError} from "axios";
import {DefaultResponseType} from "../interfaces/ajaxTypes";
import {msgWentWrong} from "../constants/messagesConstants";
import {message} from "antd";
import {MutationCache, QueryCache, QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import {AppStateProvider} from "./AppStateProvider";

const handleRequestError = (error: AxiosError<DefaultResponseType>) => {
  const errorMsg = error.response?.data.message || msgWentWrong;
  message.error(errorMsg)
}

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      handleRequestError(error as AxiosError<DefaultResponseType>);
    }
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      handleRequestError(error as AxiosError<DefaultResponseType>);
    }
  }),
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    }
  }
});

type PropTypes = {
  children: JSX.Element;
};

const DefaultProvider = ({ children }: PropTypes) => {
  return (
    <QueryClientProvider client={queryClient}>
      <>
        <AppStateProvider>
          {children}
        </AppStateProvider>
        <ReactQueryDevtools position="bottom-right" initialIsOpen={false} />
      </>
    </QueryClientProvider>
  );
};

export default DefaultProvider;
