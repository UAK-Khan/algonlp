import React from 'react';
import {Button, Popconfirm, Space} from "antd";

type PropTypes = {
  onEdit: () => void;
  onConfirmDelete: () => Promise<void>;
};

const TableActionButtonsComp = ({ onConfirmDelete, onEdit }: PropTypes) => {
  return (
    <Space size="middle">
      <Button type="link" onClick={onEdit}>Edit</Button>
      <Popconfirm
        title="You sure ? deleting the item would not recover!"
        onConfirm={onConfirmDelete}
      >
        <Button type="link">Delete</Button>
      </Popconfirm>
    </Space>
  );
};

export default TableActionButtonsComp;
