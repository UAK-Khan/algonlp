import React from 'react';
import {Spin} from "antd";

type PropTypes = {
  children: JSX.Element;
  isLoading: boolean;
}

const LoaderComp = ({ children, isLoading }: PropTypes) => {
  return (
    <Spin tip="Loading..." spinning={isLoading} size="large" style={{height: "100vh"}}>
      {children}
    </Spin>
  );
};

export default LoaderComp;
