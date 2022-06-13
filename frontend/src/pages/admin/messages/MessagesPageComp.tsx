import React from 'react';
import {ColumnsType} from "antd/lib/table";
import {useGetAllUserMessagesRequest} from "../../../shared/hooks/apiHooks/MessagesApiRequestHooks";
import TableComp from "../../../components/table/TableComp";
import {getFormattedDate} from "../../../shared/utils/utils";

const columns:ColumnsType<any> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Email Address',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'Message',
    dataIndex: 'message',
    key: 'message',
  },
  {
    title: 'Sent Date',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (value) => getFormattedDate(value)
  },
];

const MessagesPageComp = () => {
  const userMessagesQuery = useGetAllUserMessagesRequest();

  return (
    <div>
      <TableComp columns={columns} dataSource={(userMessagesQuery.data?.list || [])} loading={userMessagesQuery.isLoading} />
    </div>
  );
};

export default MessagesPageComp;
