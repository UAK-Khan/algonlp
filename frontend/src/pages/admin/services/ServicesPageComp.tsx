import React, {useMemo, useState} from 'react';
import {Button, message, Space, Switch} from 'antd';
import {CheckOutlined, CloseOutlined, PlusOutlined} from '@ant-design/icons';
import {ColumnsType} from "antd/lib/table";
import EditServiceComp from "./editService/EditServiceComp";
import {useDeleteServiceRequest, useGetServicesRequest} from "../../../shared/hooks/apiHooks/ServicesApiRequestHooks";
import TableActionButtonsComp from "../../../components/table/tableActionButtons/TableActionButtonsComp";
import TableComp from "../../../components/table/TableComp";
import {getFormattedDate} from "../../../shared/utils/utils";

// TODO: add status column

const columnsDef: ColumnsType<any> = [
  {
    title: 'Service Name',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (value) => (
      <Switch
        checkedChildren={<CheckOutlined/>}
        unCheckedChildren={<CloseOutlined/>}
        checked={value}
        disabled
      />
    )
  },
  {
    title: 'Created At',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (value) => getFormattedDate(value)
  },
];

const ServicesPageComp = () => {
  const [editRowId, setEditRowId] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const servicesQuery = useGetServicesRequest();
  const delServiceQuery = useDeleteServiceRequest();

  const data = servicesQuery?.data?.list || [];

  const columns = useMemo(() => ([
    ...columnsDef,
    {
      title: 'Action',
      key: 'action',
      render: (row) => <TableActionButtonsComp
        onEdit={() => {
          setEditRowId(row.id);
          setIsModalVisible(true);
        }}
        onConfirmDelete={() => new Promise(resolve => {
          delServiceQuery.mutate(row.id, {
            onSuccess: () => {
              resolve();
              message.success(delServiceQuery.data?.data?.message);
            }
          });
        })}
      />,
    }
  ]), [delServiceQuery])

  const onClose = () => {
    setIsModalVisible(false);
    setEditRowId(undefined);
  }

  const loading = servicesQuery.isLoading;

  return (
    <div>
      <Space>
        <Button type="primary" icon={<PlusOutlined/>} onClick={() => setIsModalVisible(true)}>Add Service</Button>
      </Space>
      <TableComp
        columns={columns}
        dataSource={data}
        loading={loading}
      />

      {isModalVisible && (
        <EditServiceComp editRowId={editRowId} isOpen={isModalVisible} onClose={onClose}/>
      )}
    </div>
  );
};

export default ServicesPageComp;
