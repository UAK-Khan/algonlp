import {Button, List, Space, Tag, Typography} from 'antd';
import styles from "./servicePackage.module.css";
import React from 'react';
import ParagraphComp from "../../../../components/paragraph/ParagraphComp";
import {CheckCircleOutlined, ClockCircleOutlined, HistoryOutlined, WechatOutlined} from '@ant-design/icons';
import {PackageResponseType} from "../../../../shared/interfaces/moduleTypes";
import {CONTACT_ROUTE} from "../../../../shared/routesConstants";
import {useNavigate} from "react-router-dom";
import useMetaDataHook from "../../../../shared/hooks/metaDataHook";

type PropTypes = {
  servicePackage: PackageResponseType["data"]
}
const ServicePackageComp = ({servicePackage}: PropTypes) => {
  const navigate = useNavigate();
  const {getMetValueByKey} = useMetaDataHook();
  const {description, price, title, dayDelivery, revisions, servicesIncludes} = servicePackage;
  return (
    <div>
      <div className={styles.headWrapper}>
        <Typography.Title level={3}>{title}</Typography.Title>
        <Typography.Title level={3}>{getMetValueByKey("moneySymbol")}{price}</Typography.Title>
      </div>
      <ParagraphComp className={styles.basicDesc} ellipsis={{expandable: true, rows: 8, tooltip: true,}}>
        <div dangerouslySetInnerHTML={{__html: description}}/>
      </ParagraphComp>
      <Space>
        <Tag icon={<ClockCircleOutlined/>} color="green">{dayDelivery} Day Delivery</Tag>
        <Tag icon={<HistoryOutlined/>} color="volcano">{revisions} Revisions</Tag>
      </Space>
      <div className={styles.list}>
        <List
          itemLayout="horizontal"
          dataSource={servicesIncludes}
          size="small"
          bordered
          renderItem={(item, idx) => (
            <List.Item key={idx}>
              <List.Item.Meta
                avatar={<CheckCircleOutlined style={{fontSize: '1.5rem'}}/>}
                title={item}
              />
            </List.Item>
          )}
        />
      </div>
      <br/>
      <Button type="primary" size="large" icon={<WechatOutlined/>} style={{width: '100%'}}
              onClick={() => navigate(CONTACT_ROUTE)}>
        Let's Discuss
      </Button>
    </div>
  );
};

export default ServicePackageComp;
