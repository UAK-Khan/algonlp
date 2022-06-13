import React, {useEffect, useState} from 'react';
import PageTitleComp from "../../../components/pageTitle/PageTitleComp";
import MapComp from "../../../components/map/MapComp";
import {Button, Card, Col, Form, Input, List, message, Row, Spin, Typography} from 'antd';
import {useForm} from "antd/es/form/Form";
import {PhoneOutlined, UserOutlined} from "@ant-design/icons";
import {Mail, MapPin, Phone} from 'react-feather';
import useMetaDataHook from "../../../shared/hooks/metaDataHook";
import {TMetaFn} from "../../../shared/interfaces/otherTypes";
import {ContactRequestBodyType} from "../../../shared/interfaces/moduleTypes";
import {useSaveContactRequest} from "../../../shared/hooks/apiHooks/ContactApiRequestHooks";

const data = (metaFn: TMetaFn) => ([
  {
    icon: <MapPin size={24} color="grey"/>,
    title: 'Location',
    description: metaFn("location")
  },
  {
    icon: <Mail size={24} color="grey"/>,
    title: 'Email',
    description: metaFn("email"),
  },
  {
    icon: <Phone size={24} color="grey"/>,
    title: 'Call',
    description: metaFn("phone"),
  },
]);

const ContactPageComp = () => {
  const [form] = useForm();
  const {metaLoading, getMetValueByKey} = useMetaDataHook();
  const [isMapLoading, setMapLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setMapLoading(false);
    }, 1000);
  });

  const {isLoading, mutate} = useSaveContactRequest((data) => {
    message.success(data.message);
    form.resetFields();
  });

  const onSubmit = (data: ContactRequestBodyType) => mutate(data);

  const map = <MapComp/>;

  return (
    <div className="c-container">
      <PageTitleComp title="Contact"/>
      <Card title="Our Location" bordered loading={isMapLoading}>
        {map}
      </Card>
      <br/>
      <Card title="Contact Us" bordered loading={metaLoading}>
        <Row gutter={24}>
          <Col xs={24} md={10}>
            <List
              itemLayout="horizontal"
              dataSource={data(getMetValueByKey)}
              renderItem={(item, idx) => (
                <List.Item key={idx}>
                  <List.Item.Meta
                    avatar={item.icon}
                    title={item.title}
                    description={<Typography.Text>{item.description}</Typography.Text>}
                  />
                </List.Item>
              )}
            />
          </Col>
          <Col xs={24} md={14}>
            <Spin spinning={isLoading}>
              <Form
                form={form}
                name="metadata-form"
                onFinish={onSubmit}
                autoComplete="off"
                initialValues={{}}
                layout="vertical"
              >
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item name="name" label="Name"
                               rules={[{required: true, message: "Please enter your full name"}]}>
                      <Input prefix={<UserOutlined/>} placeholder="Enter Your Name"/>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="email" label="Email Address" rules={[
                      {type: 'email', message: 'The email address is not valid'},
                      {required: true, message: "Please enter your email!"}
                    ]}>
                      <Input type="email" prefix={<UserOutlined/>} placeholder="Enter Your Email Address"/>
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item name="phone" label="Phone"
                               rules={[{required: true, message: "Please enter your phone number"}]}>
                      <Input type="tel" prefix={<PhoneOutlined/>} placeholder="Enter Your Phone Number"/>
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item name="message" label="Message"
                               rules={[{required: true, message: "Please enter your message"}]}>
                      <Input.TextArea rows={4} placeholder="Enter Your Message"/>
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item wrapperCol={{style: {width: "auto", textAlign: "center"}}}>
                  <Button type="primary" htmlType="submit" loading={isLoading}>
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Spin>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default ContactPageComp;
