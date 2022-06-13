import React from 'react';
import {Select, Tag, Typography} from "antd";
import styles from "./ModalsListComp.module.css";
import Typed from "react-typed";
import {modalsData} from "../../../../shared/data/data";

type PropTypes = {
  selectedModal: typeof modalsData[number],
  onChangeModal: (modal: typeof modalsData[number]) => void,
};

const ModalsListComp = ({onChangeModal, selectedModal}: PropTypes) => {
  const text = <>Search for: {<Typed strings={modalsData as unknown as string[]} typeSpeed={80} loop/>}</>;

  return (
    <div className={styles.modalWrapper}>
      <Typography.Title level={4}>
        <span>Select the modal of your choice</span>
      </Typography.Title>
      <Tag color="cyan">{text}</Tag>
      <Select
        className={styles.selectEl}
        showSearch
        value={selectedModal}
        placeholder={text}
        optionFilterProp="children"
        onChange={(e) => onChangeModal(e as typeof modalsData[number])}
        filterOption={(input, option) => {
          const optionValue = option?.value?.toLowerCase();
          if (optionValue) return optionValue.indexOf(input.toLowerCase()) !== -1;
          return false;
        }}
      >
        {modalsData.map((modal) => (
          <Select.Option value={modal}>{modal}</Select.Option>
        ))}
      </Select>
    </div>
  );
};

export default ModalsListComp;
