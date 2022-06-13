import React from 'react';
import {Button, Card, Form, Input, InputNumber, message, Space} from "antd";
import styles from "../About.module.css";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import {useGetSkillsRequest, useUpdateSkillsRequest} from "../../../../shared/hooks/apiHooks/SkillsApiRequestHooks";
import {msgFillTheForm} from "../../../../shared/constants/messagesConstants";
import {SkillsRequestBodyType} from "../../../../shared/interfaces/moduleTypes";

const SkillsComp = () => {
  const [form] = Form.useForm();

  const skillsQuery = useGetSkillsRequest(
    (data) => form.setFieldsValue({ skills: data?.list || [] }));

  const updateSkillsQuery = useUpdateSkillsRequest((data) => message.success(data.message));

  const isLoading = skillsQuery.isLoading;

  const onSubmit = () => {
    form.validateFields().then((data: {skills: SkillsRequestBodyType[]}) => {
      updateSkillsQuery.mutate(data.skills);
    }).catch(() => message.error(msgFillTheForm));
  };

  return (
    <Form
      name="skills-form"
      layout="vertical"
      form={form}
      initialValues={{ skill: [] }}
      onFinish={onSubmit}
    >
      <Card title="Your Skills">
        <Form.List name="skills">
          {(fields, { add, remove }) => (
            <>
              <div className={styles.fieldsWrapper}>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name, 'skill']}
                      fieldKey={[fieldKey || 0, 'skill']}
                      rules={[{ required: true, message: 'Missing skill name' }]}
                    >
                      <Input placeholder="Enter Skill" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'score']}
                      fieldKey={[fieldKey || 0, 'score']}
                      rules={[{ required: true, message: 'Missing skill score' }]}
                    >
                      <InputNumber placeholder="Enter Score" className={styles.numberInput} />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
              </div>
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Add field
                </Button>
              </Form.Item>
              <Form.Item wrapperCol={{ style: {textAlign: "right", marginTop: "12px" }}}>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                  Save
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Card>
    </Form>
  );
};

export default SkillsComp;
