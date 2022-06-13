import React from 'react';
import {ColumnsType} from "antd/lib/table";
import {useGetAllUserFeedbacksRequest} from "../../../shared/hooks/apiHooks/FeedbacksApiRequestHooks";
import TableComp from "../../../components/table/TableComp";
import {Rate} from "antd";
import {getFormattedDate} from "../../../shared/utils/utils";

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
    title: 'Rating',
    dataIndex: 'rating',
    key: 'rating',
    render: (value) => <Rate value={value} disabled/>
  },
  {
    title: 'Created At',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (value) => getFormattedDate(value)
  },
];

const FeedbacksPageComp = () => {
  const feedbacksQuery = useGetAllUserFeedbacksRequest();

  return (
    <div>
      <TableComp
        columns={columns}
        dataSource={(feedbacksQuery.data?.list || [])}
        loading={feedbacksQuery.isLoading}
        expandable={{
          expandedRowRender: record => (
            <>
              <h5><b>Feedback:</b></h5>
              <p style={{
                margin: 0,
                border: "1px solid #d1d1d1",
                padding: "6px",
                borderRadius: "6px"
              }}>{record.feedback}</p>
            </>
          )
        }}
      />
    </div>
  );
};

export default FeedbacksPageComp;

