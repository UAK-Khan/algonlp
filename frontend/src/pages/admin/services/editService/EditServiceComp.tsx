import React, {useState} from 'react';
import {Form, Input, message, Modal, Select, Switch} from 'antd';
import QuillEditorComp from "../../../../components/quillEditor/QuillEditorComp";
import {DefaultResponseType} from "../../../../shared/interfaces/ajaxTypes";
import {
  useAddServiceRequest,
  useGetServiceRequest,
  useUpdateServiceRequest
} from "../../../../shared/hooks/apiHooks/ServicesApiRequestHooks";
import {msgFillTheForm} from "../../../../shared/constants/messagesConstants";
import {useGetPackagesRequest} from "../../../../shared/hooks/apiHooks/PackagesApiRequestHooks";
import ImageUploadComp from "../../../../components/imageUpload/ImageUploadComp";
import {RcFile} from "antd/lib/upload/interface";
import {ServiceResponseBodyType} from "../../../../shared/interfaces/moduleTypes";
import {useDeleteFileRequest, useUploadFilesRequest} from "../../../../shared/hooks/filesApiRequestHook";

type PropTypes = {
  isOpen: boolean;
  onClose: () => void;
  editRowId?: string;
};

const EditServiceComp = ({ isOpen, onClose, editRowId }: PropTypes) => {
  const [form] = Form.useForm();
  const [selectedImages, setSelectedImages] = useState<RcFile[]>([]);

  const uploadFilesQuery = useUploadFilesRequest();
  const deleteFileQuery = useDeleteFileRequest((data) => message.success(data.message));

  const uploadImages = async (serviceId: string) => {
    const formData = new FormData();
    selectedImages.forEach((image) => formData.append("images", image));
    uploadFilesQuery.mutate({ entityId: serviceId, files: formData });
  }

  const onDataUpdated = async (data: DefaultResponseType) => {
    message.success(data.message);
    const serviceId = editRowId;
    if (serviceId) {
      await uploadImages(serviceId);
    }
    onClose();
  }

  const onDataAdded = async (data: DefaultResponseType<Partial<ServiceResponseBodyType["data"]>>) => {
    message.success(data.message);
    const serviceId = data.data.id;
    if (serviceId && selectedImages.length) {
      await uploadImages(serviceId);
    }
    onClose();
  }

  const pkgQuery = useGetPackagesRequest();

  const editServiceQuery = useGetServiceRequest((data) => form.setFieldsValue(data.data), editRowId);
  const updateServiceQuery = useUpdateServiceRequest(onDataUpdated, editRowId);
  const addServiceQuery = useAddServiceRequest(onDataAdded);

  const onSubmit = () => {
    form.validateFields().then((data) => {
      if (editRowId) updateServiceQuery.mutate(data);
      else addServiceQuery.mutate(data);
    }).catch(() => message.error(msgFillTheForm));
  };

  const isLoading = editServiceQuery.isLoading || updateServiceQuery.isLoading || addServiceQuery.isLoading || pkgQuery.isLoading;

  return (
    <>
      <Modal title="Save Service" visible={isOpen} onCancel={onClose} onOk={onSubmit} confirmLoading={isLoading}>
        <Form
          name="services-form"
          layout="vertical"
          form={form}
          initialValues={{ title: "", description: "", status: true, packages: [] }}
        >
          <Form.Item name="title" label="Service Title" rules={[{ required: true, message: "service title is required" }]}>
            <Input placeholder="Enter Service Title" />
          </Form.Item>
          <Form.Item name="description" label="Service Description">
            <QuillEditorComp placeholder="Enter Service Description" />
          </Form.Item>
          <Form.Item name="packages" label="Service Packages" rules={[{ required: true, message: 'Please select at least one package', type: 'array' }]} >
            <Select
              placeholder="Select packages for service"
              allowClear
              mode="multiple"
            >
              { (pkgQuery.data?.list || []).map((pkg) => (
                <Select.Option key={pkg.id} value={pkg.id}>{pkg.title}</Select.Option>
              )) }
            </Select>
          </Form.Item>
          <div>
            <ImageUploadComp
              images={editServiceQuery.data?.data.images}
              onImagesSelected={setSelectedImages}
              maxImagesCanSelect={3}
              onDeleteFile={(fileId) => deleteFileQuery.mutate(fileId)}
            />
          </div>
          <Form.Item name="status" label="Status" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditServiceComp;

