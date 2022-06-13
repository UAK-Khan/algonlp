import React from 'react';
import {Table} from "antd";
import {TableProps} from "antd/lib/table/Table";

type PropTypes = Omit<TableProps<any>, "rowKey"|"pagination">;

const TableComp = (props: PropTypes) => {
  return (
    <Table {...props} rowKey="id" pagination={{pageSize: 10}} scroll={{x: 400}} />
  );
};

export default TableComp;
