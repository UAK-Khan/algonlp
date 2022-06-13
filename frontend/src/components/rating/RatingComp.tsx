import React from 'react';
import {FrownOutlined, MehOutlined, SmileOutlined} from "@ant-design/icons";
import {Rate} from "antd";
import styles from "./Rating.module.css";
import {RateProps} from "antd/lib/rate";

const customIcons: any = {
  1: <FrownOutlined/>,
  2: <FrownOutlined/>,
  3: <MehOutlined/>,
  4: <SmileOutlined/>,
  5: <SmileOutlined/>,
};

const RatingComp = (props: RateProps) => {
  return (
    <div className={styles.rating}>
      <Rate character={({index}: any) => customIcons[index + 1]} {...props} />
    </div>
  );
};

export default RatingComp;
