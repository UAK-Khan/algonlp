import React from 'react';
import {ColumnsType} from "antd/lib/table";
import TableComp from "../../../components/table/TableComp";
import {useGetAllContactsRequest} from "../../../shared/hooks/apiHooks/ContactApiRequestHooks";
import {getFormattedDate} from "../../../shared/utils/utils";

const columns: ColumnsType<any> = [
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
    title: 'Created At',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (value) => getFormattedDate(value)
  },
];

const ContactsPageComp = () => {
  const {isLoading, data} = useGetAllContactsRequest();

  return (
    <div>
      <TableComp
        columns={columns}
        dataSource={(data || [])}
        loading={isLoading}
        expandable={{
          expandedRowRender: record => (
            <>
              <h5><b>Message:</b></h5>
              <p style={{
                margin: 0,
                border: "1px solid #d1d1d1",
                padding: "6px",
                borderRadius: "6px"
              }}>{record.message}</p>
            </>
          )
        }}
      />
    </div>
  );
};

export default ContactsPageComp;

