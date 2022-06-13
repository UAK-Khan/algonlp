import React, {useEffect} from 'react';
import {Button, Form, Input, InputNumber, message, Modal, Space} from "antd";
import QuillEditorComp from "../../../../components/quillEditor/QuillEditorComp";
import {
  useAddPackageRequest,
  useGetPackageRequest,
  useUpdatePackageRequest
} from "../../../../shared/hooks/apiHooks/PackagesApiRequestHooks";
import {DefaultResponseType} from "../../../../shared/interfaces/ajaxTypes";
import {msgFillTheForm} from "../../../../shared/constants/messagesConstants";
import styles from "../../about/About.module.css";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";

type PropTypes = {
  isOpen: boolean;
  onClose: () => void;
  editRowId?: string
};

const EditPackageComp = ({isOpen, onClose, editRowId}: PropTypes) => {

  const [form] = Form.useForm();

  useEffect(() => {
    if (isOpen) form.resetFields();
  }, [form, isOpen]);

  const onDataUpdated = (data: DefaultResponseType) => {
    message.success(data.message);
    onClose();
  }

  const editPkgQuery = useGetPackageRequest((data) => form.setFieldsValue(data.data), editRowId);
  const updatePkgQuery = useUpdatePackageRequest(onDataUpdated, editRowId);
  const addPkgQuery = useAddPackageRequest(onDataUpdated);

  const onSubmit = () => {
    form.validateFields().then((data) => {
      if (editRowId) updatePkgQuery.mutate(data);
      else addPkgQuery.mutate(data);
    }).catch(() => message.error(msgFillTheForm));
  };

  const isLoading = editPkgQuery.isLoading || updatePkgQuery.isLoading || addPkgQuery.isLoading;

  return (
    <Modal title="Save Package" visible={isOpen} onCancel={onClose} onOk={onSubmit} confirmLoading={isLoading} cancelButtonProps={{
      disabled: isLoading,
    }}>
      <Form
        name="packages-form"
        layout="vertical"
        form={form}
        initialValues={{ serviceTitle: "" }}
        onFinish={(data) => console.log(data)}
      >
        <Form.Item label="Package Name" name="name" rules={[{required: true, message: "package name is required"}]}>
          <Input placeholder="Enter Package Name"/>
        </Form.Item>
        <Form.Item label="Package Title" name="title" rules={[{required: true, message: "package title is required"}]}>
          <Input placeholder="Enter Package Title"/>
        </Form.Item>
        <Form.Item label="Package Price" name="price" rules={[{required: true, message: "package price is required"}]}>
          <InputNumber placeholder="Enter Package Price" style={{width: '100%'}}/>
        </Form.Item>
        <div style={{display: "flex", flexDirection: "row"}}>
          <Form.Item label="Day Delivery" name="dayDelivery"
                     rules={[{required: true, message: "day delivery is required"}]} style={{marginRight: "8px"}}>
            <InputNumber placeholder="Enter Days of Service Deliver" style={{width: '100%'}}/>
          </Form.Item>
          <Form.Item label="Revisions" name="revisions" rules={[{required: true, message: "revisions is required"}]}>
            <InputNumber placeholder="Enter Service Revisions" style={{width: '100%'}}/>
          </Form.Item>
        </div>
        <Form.Item label="Package Description" name="description">
          <QuillEditorComp placeholder="Enter Package Description"/>
        </Form.Item>
        <Form.List name="servicesIncludes">
          {(fields, {add, remove}) => (
            <>
              <div className={styles.fieldsWrapper}>
                {fields.map(({key, name, fieldKey, ...restField}) => (
                  <Space key={key} style={{display: 'flex', marginBottom: 8}} align="baseline">
                    <Form.Item
                      {...restField}
                      name={name}
                      fieldKey={fieldKey}
                      rules={[{required: true, message: 'Missing service includes'}]}
                    >
                      <Input placeholder="Enter Text"/>
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)}/>
                  </Space>
                ))}
              </div>
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}>
                  Add field
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
};

export default EditPackageComp;
