import React from 'react';
import {ColumnsType} from "antd/lib/table";
import {useGetAllUsersRequest} from "../../../shared/hooks/apiHooks/UsersApiRequestHooks";
import TableComp from "../../../components/table/TableComp";
import {getFormattedDate} from "../../../shared/utils/utils";
import {Tag} from "antd";

const columns:ColumnsType<any> = [
  {
    title: 'First Name',
    dataIndex: 'firstName',
    key: 'firstName',
  },
  {
    title: 'Last Name',
    dataIndex: 'lastName',
    key: 'lastName',
  },
  {
    title: 'Email Address',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Created At',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (value) => getFormattedDate(value)
  },
  {
    title: 'Verified?',
    dataIndex: 'isVerified',
    key: 'isVerified',
    render: (isVerified) => {
      return (<Tag
          title={`The email is ${!isVerified ? 'not ': ''}verified`}
          color={isVerified ? "success": "warning"}>
          {isVerified ? "Verified": "Unverified"}
        </Tag>
      )
    }
  },
];

const UsersPageComp = () => {
  const usersQuery = useGetAllUsersRequest();

  return (
    <div>
      <TableComp columns={columns} dataSource={(usersQuery.data?.list || [])} loading={usersQuery.isLoading} />
    </div>
  );
};

export default UsersPageComp;
