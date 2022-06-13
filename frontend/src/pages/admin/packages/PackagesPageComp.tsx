import React, {useMemo, useState} from 'react';
import {Button, Space} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import {ColumnsType} from "antd/lib/table";
import EditPackageComp from "./editPackage/EditPackageComp";
import TableActionButtonsComp from "../../../components/table/tableActionButtons/TableActionButtonsComp";
import {useDeletePackageApi, useGetPackagesRequest} from "../../../shared/hooks/apiHooks/PackagesApiRequestHooks";
import TableComp from "../../../components/table/TableComp";
import {getFormattedDate} from "../../../shared/utils/utils";

const columnsDef: ColumnsType<any> = [
  {
    title: 'Package Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Package Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Created At',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (value) => getFormattedDate(value)
  },
];

const PackagesPageComp = () => {
  const [editRowId, setEditRowId] = useState();
  const { data: allPackages, isLoading, isFetching } = useGetPackagesRequest();
  const { mutate: deletePackage } = useDeletePackageApi();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const loading = isFetching && isLoading;
  const packages = allPackages?.list || [];

  const onClose = () => {
    setIsModalVisible(false);
    setEditRowId(undefined);
  }

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
        onConfirmDelete={() => new Promise((resolve, reject) => {
          deletePackage(row.id, {onSuccess: () => resolve(), onError: () => reject()});
        })}
      />,
    }
  ]), [deletePackage])

  return (
    <div>
      <Space>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>Add Package</Button>
      </Space>
      <TableComp columns={columns} dataSource={packages} loading={loading} />
      { isModalVisible && <EditPackageComp isOpen={isModalVisible} onClose={onClose} editRowId={editRowId} /> }
    </div>
  );
};

export default PackagesPageComp;
