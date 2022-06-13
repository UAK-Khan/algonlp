import React from 'react';
import {Button, Form, message} from "antd";
import QuillEditorComp from "../../../components/quillEditor/QuillEditorComp";
import {useGetAboutRequest, useUpdateAboutRequest} from "../../../shared/hooks/apiHooks/AboutApiRequestHooks";
import SkillsComp from "./skills/SkillsComp";

const AboutPageComp = () => {
  const [form] = Form.useForm();

  const aboutPkgQuery = useGetAboutRequest(
    (data) => form.setFieldsValue({ about: data.data?.about || "" }));
  const updatePkgQuery = useUpdateAboutRequest((data) => message.success(data.message));

  const isLoading = aboutPkgQuery.isLoading || updatePkgQuery.isLoading;

  return (
    <>
      <Form
        name="packages-form"
        layout="vertical"
        form={form}
        initialValues={{ }}
        onFinish={(values) => updatePkgQuery.mutate(values)}
      >
        <Form.Item label="About Description" name="about">
          <QuillEditorComp placeholder="Enter About Description" />
        </Form.Item>
        <Form.Item wrapperCol={{ style: {textAlign: "right", marginTop: "12px" }}}>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Save
          </Button>
        </Form.Item>
      </Form>
      <SkillsComp />
    </>
  );
};

export default AboutPageComp;
