import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {message} from "antd";
import {useVerifyAccountRequest} from "../../../shared/hooks/apiHooks/AuthApiRequestHooks";
import { Button, Result } from 'antd';
import LoaderComp from "../../../components/loader/LoaderComp";

const VerifyAccountComp = () => {
  const { userId, verificationCode } = useParams<{userId: string, verificationCode: string }>();

  const { mutate, data, isLoading, isSuccess } = useVerifyAccountRequest((data) => {});

  useEffect(() => {
    if (userId && verificationCode) {
      mutate({ userId, verificationCode });
    } else {
      message.error("Invalid link");
    }
  }, [userId, verificationCode]);

  return (
    <div>
      {
        isLoading ? (
          <LoaderComp tip="Verifying your account, Please wait..." children={<></>} isLoading />
        ): (
          <Result
            status={isSuccess ? "success": "error"}
            title={data?.message || "Invalid link"}
            extra={[
              <Button type="primary" key="console" href={`/`}>
                Go To The Website
              </Button>
            ]}
          />
        )
      }
    </div>
  );
};

export default VerifyAccountComp;
