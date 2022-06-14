import React from 'react';
import {Spin} from "antd";

type PropTypes = {
  children: JSX.Element;
  isLoading: boolean;
  tip?: string;
}

const LoaderComp = ({ children, isLoading, tip }: PropTypes) => {
  return (
    <Spin tip={tip} spinning={isLoading} size="large" style={{height: "100vh"}}>
      {children}
    </Spin>
  );
};

LoaderComp.defaultProps = {
  tip: "Loading..."
}

export default LoaderComp;
