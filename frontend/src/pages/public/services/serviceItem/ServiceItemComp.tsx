import React from 'react';
import Meta from "antd/es/card/Meta";
import {Card, Image} from "antd";
import {useNavigate} from "react-router-dom";
import {SERVICE_DETAIL_ROUTE} from "../../../../shared/routesConstants";
import {SingleServiceResponseType} from "../../../../shared/interfaces/moduleTypes";
import {IMAGE_PLACEHOLDER_PATH, SERVER_LOCATION} from "../../../../configs/appConfigs";

type PropTypes = {
  service: SingleServiceResponseType,
  isLoading: boolean,
}

const ServiceItemComp = ({service, isLoading}: PropTypes) => {
  const navigate = useNavigate();

  const getValue = (key: keyof SingleServiceResponseType) => {
    if (isLoading) return "Loading...";
    return service[key];
  }

  const image = isLoading ? "" : `${SERVER_LOCATION}${getValue("images")[0]}`;

  return (
    <Card
      loading={isLoading}
      hoverable
      onClick={() => navigate(`${SERVICE_DETAIL_ROUTE}/${service.id}`)}
      cover={<Image
        style={{width: '100%', height: '270px'}}
        alt="Service"
        src={image}
        fallback={IMAGE_PLACEHOLDER_PATH}
      />}
    >
      <Meta title={getValue("title")}/>
    </Card>
  );
};

export default ServiceItemComp;
