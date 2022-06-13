import React, {CSSProperties} from 'react';
import {Typography} from 'antd';
import {ParagraphProps} from "antd/es/typography/Paragraph";

const {Paragraph} = Typography;

type PropTypes = ParagraphProps & {
  style?: CSSProperties,
}

const ParagraphComp = ({style, ...other}: PropTypes) => {
  return (
    <Paragraph {...other} style={{textAlign: "center", ...(style || {})}}/>
  );
};

export default ParagraphComp;
