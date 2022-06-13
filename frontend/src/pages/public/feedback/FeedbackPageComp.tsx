import React from 'react';
import PageTitleComp from "../../../components/pageTitle/PageTitleComp";
import {Button, Card, Col, Form, Input, List, message, Rate, Row, Spin, Typography} from "antd";
import {useForm} from "antd/es/form/Form";
import RatingComp from "../../../components/rating/RatingComp";
import {AliwangwangOutlined} from "@ant-design/icons";
import {FeedbackRequestBodyType} from "../../../shared/interfaces/moduleTypes";
import {
  useAddFeedbackRequest,
  useGetAllUserFeedbacksRequest
} from "../../../shared/hooks/apiHooks/FeedbacksApiRequestHooks";

import styles from "./feedback.module.css"
import {getFormattedDate} from "../../../shared/utils/utils";

const defaultRating = 5;

const FeedbackPageComp = () => {
  const [form] = useForm();

  const feedbacksQuery = useGetAllUserFeedbacksRequest();

  const {isLoading, mutate} = useAddFeedbackRequest((data) => {
    message.success(data.message);
    form.resetFields();
  });

  const onSubmit = (values: FeedbackRequestBodyType) => mutate(values);

  // todo: add pagination in UI
  const allFeedbacks = feedbacksQuery.data?.list || [];

  return (
    <div className="c-container">
      <PageTitleComp title="Feedback"/>
      <Card title="Rate Us?" bordered>
        <Spin spinning={isLoading}>
          <Form
            form={form}
            name="metadata-form"
            onFinish={onSubmit}
            autoComplete="off"
            initialValues={{rating: defaultRating}}
            layout="vertical"
          >
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item name="rating" label=""
                           rules={[{required: true, message: "Please enter your rating here"}]}>
                  <RatingComp defaultValue={defaultRating} onChange={(rating) => form.setFieldsValue({rating})}/>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="feedback" label="Message"
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
      </Card>
      <br/>
      <Card title="Customer Feedback Reviews" bordered bodyStyle={{borderLeft: '5px solid #1890ff'}}
            loading={feedbacksQuery.isLoading}>
        <List
          itemLayout="horizontal"
          dataSource={allFeedbacks}
          style={{maxWidth: '60%'}}
          renderItem={(item, idx) => (
            <List.Item key={idx}>
              <List.Item.Meta
                avatar={<AliwangwangOutlined className={styles.avatar}/>}
                title={<>
                  <div className={styles.createdAt}>{getFormattedDate(item.createdAt)}</div>
                  {`${item.firstName} ${item.lastName}`} &nbsp;
                  <Rate value={item.rating} disabled/>
                </>}
                description={<Typography.Text>{item.feedback}</Typography.Text>}
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default FeedbackPageComp;
