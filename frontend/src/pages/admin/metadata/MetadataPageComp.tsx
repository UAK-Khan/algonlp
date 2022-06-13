import {Button, Form, Input, message, Space, Spin} from 'antd';
import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';
import styles from "./Metadata.module.css";
import {MetaDataRequestBodyType} from "../../../shared/interfaces/moduleTypes";
import {useForm} from "antd/es/form/Form";
import {
  useGetAllMetaDataRequest,
  useUpdateMetaDataRequest
} from "../../../shared/hooks/apiHooks/MetaDataApiRequestHooks";

const MetadataPageComp = () => {
  const [form] = useForm();
  const { data: allMetaData, isLoading, isFetching } = useGetAllMetaDataRequest((data) => {
    form.setFieldsValue({ metaData: data?.list });
  });
  const updateMetaDataQuery = useUpdateMetaDataRequest((data) => message.success(data.message));

  const onSubmit = (values: { metaData: MetaDataRequestBodyType[] }) => {
    updateMetaDataQuery.mutate(values.metaData);
  };

  const canDelete =  (idx: number) => {
    if (allMetaData?.list) {
      return !allMetaData?.list[idx]?.preventDelete;
    }
  }

  const loading = isFetching && isLoading;

  return (
    <Spin spinning={loading}>
      <Form
        form={form}
        name="metadata-form" onFinish={onSubmit} autoComplete="off" initialValues={{ metaData: [] }}>
        <Form.List name="metaData">
          {(fields, { add, remove }) => (
            <>
              <div className={styles.fieldsWrapper}>
              {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name, 'key']}
                      fieldKey={[fieldKey || 0, 'key']}
                      rules={[{ required: true, message: 'Missing metadata name' }]}
                    >
                      <Input placeholder="Enter Key" disabled={!canDelete(fieldKey || 0)} />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'value']}
                      fieldKey={[fieldKey || 0, 'value']}
                    >
                      <Input placeholder="Enter Value" />
                    </Form.Item>
                    { canDelete(fieldKey || 0) && <MinusCircleOutlined onClick={() => remove(name)} /> }
                  </Space>
              ))}
              </div>
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Add field
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item wrapperCol={{ style: {textAlign: "right"}}}>
          <Button type="primary" htmlType="submit" loading={updateMetaDataQuery.isLoading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default MetadataPageComp;
