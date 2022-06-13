import React from 'react';
import {Alert, Button, Col, Divider, Form, Input, Row} from 'antd';
import styles from "../Auth.module.css";
import {LockFilled, LockOutlined} from '@ant-design/icons';
import {Rule} from "rc-field-form/lib/interface";
import {Link} from "react-router-dom";
import {HOMEPAGE} from "../../../shared/routesConstants";
import {MIN_PASSWORD_LENGTH} from "../../../configs/appConfigs";
import {ChangePasswordRequestType} from "../../../shared/interfaces/moduleTypes";
import {useChangePasswordRequest} from "../../../shared/hooks/apiHooks/AuthApiRequestHooks";

const validateConfirmPassword:Rule = ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue('newPassword') === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('The two passwords that you entered do not match!'));
    },
});

const ChangePasswordComp = () => {
  const [form] = Form.useForm();
  const { mutate, isLoading, data, isSuccess } = useChangePasswordRequest(() => {
    form.resetFields();
  });

  const onSubmit = (data: ChangePasswordRequestType) => {
    mutate(data);
  }

  return (
    <div className={styles.bg} style={{background: "url(/images/gif/bg-login.gif)"}}>
      <Row typeof="flex" justify="center" align="middle" className={styles.componentWrapper}>
        <Col className={styles.wrapper} xs={18} md={10} lg={8}>
          <div className={styles.logoWrapper}>
            <LockFilled className={styles.logo} />
            <h2>Change Password</h2>
          </div>
          { isSuccess && data && (
            <Alert message="Password Changed" type="success" showIcon description={data.message} />
          ) }
          <Divider />
          <Form
            name="change-password-form"
            initialValues={{ }}
            onFinish={onSubmit}
            autoComplete="off"
            layout="vertical"
            form={form}
          >
            <Form.Item
              label="New Password"
              name="newPassword"
              rules={[ { required: true, message: `Password must be ${MIN_PASSWORD_LENGTH} characters long!`, min: MIN_PASSWORD_LENGTH },]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Enter Your New Password" />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Re-type Password"
              dependencies={['password']}
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                validateConfirmPassword
              ]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Please type your password again" />
            </Form.Item>

            <Form.Item className={styles.submitWrapper} wrapperCol={{ style: { width: "auto" }}}>
              <Button type="primary" htmlType="submit" loading={isLoading}>
                Submit
              </Button>
            </Form.Item>
          </Form>
          <div className="c-text-right">
            <Link to={HOMEPAGE}>Go back to Home Page</Link>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ChangePasswordComp;
