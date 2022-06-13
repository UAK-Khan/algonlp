import React from 'react';
import PageTitleComp from "../../../components/pageTitle/PageTitleComp";
import ParagraphComp from "../../../components/paragraph/ParagraphComp";
import {Col, Row} from "antd";
import ServiceItemComp from "./serviceItem/ServiceItemComp";
import {useGetServicesRequest} from "../../../shared/hooks/apiHooks/ServicesApiRequestHooks";
import {SingleServiceResponseType} from "../../../shared/interfaces/moduleTypes";

const dummyServices = [{}, {}, {}] as SingleServiceResponseType[];

const ServicesPageComp = () => {
  const {isLoading, data} = useGetServicesRequest();

  const services: SingleServiceResponseType[] = data?.list || dummyServices;

  return (
    <div className="c-container">
      <PageTitleComp title="Our Services"/>
      <ParagraphComp>
        Hi, it's Abdullah, I am a skilled Data Scientist and have 2+ years of experience in (NLP) Natural Language
        Processing
      </ParagraphComp>
      <Row gutter={24}>
        {services.map((service) => (
          <Col xs={24} sm={12} md={8} key={service.id} style={{padding: 10}}>
            <ServiceItemComp service={service} isLoading={isLoading}/>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ServicesPageComp;
