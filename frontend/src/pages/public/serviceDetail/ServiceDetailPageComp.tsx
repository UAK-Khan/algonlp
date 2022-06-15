import React from 'react';
import PageTitleComp from "../../../components/pageTitle/PageTitleComp";
import {Card, Carousel, Col, Image, Row, Tabs, Typography} from "antd";
import ServicePackageComp from "./servicePackage/ServicePackageComp";
import {PackageResponseType, ServiceResponseBodyType} from "../../../shared/interfaces/moduleTypes";
import {useGetServiceRequest} from "../../../shared/hooks/apiHooks/ServicesApiRequestHooks";
import {useParams} from "react-router-dom";
import {IMAGE_PLACEHOLDER_PATH, SERVER_LOCATION} from "../../../configs/appConfigs";
import {useGetPackageRequestByIds} from "../../../shared/hooks/apiHooks/PackagesApiRequestHooks";
import styles from "./serviceDetail.module.css"

const ServiceDetailPageComp = () => {
  const params = useParams<{ serviceId: string }>();

  const {isLoading, data} = useGetServiceRequest(() => {
  }, params.serviceId)

  const serviceDetail = data?.data;

  const respPackages = useGetPackageRequestByIds(() => {
  }, serviceDetail?.packages)
  const packages = respPackages?.map((pkg: any) => pkg?.data?.data?.data);
  const isPkgLoading = !!respPackages?.find((pkg) => pkg?.isLoading);

  const getValue = (key: keyof ServiceResponseBodyType["data"]) => {
    if (!serviceDetail) return "";
    return serviceDetail[key];
  }

  const images: string[] = ((getValue("imagesLinks") || []) as string[])
    .map((image) => `${SERVER_LOCATION}${image}`);

  return (
    <div className="c-container">
      <PageTitleComp title="Service Details"/>
      <br/>
      <Card loading={isLoading}>
        <Row gutter={24}>
          <Col xs={24} md={12} lg={16}>
            <Typography.Title level={1}>
              {getValue("title")}
            </Typography.Title>
            <Carousel effect="fade" autoplay autoplaySpeed={4000} className={styles.carousel}>
              {images.map((image) => (
                <div key={image}>
                  <Image src={image} fallback={IMAGE_PLACEHOLDER_PATH}/>
                </div>
              ))}
            </Carousel>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Card loading={isPkgLoading}>
              <Tabs defaultActiveKey="0" centered>
                {!isPkgLoading && packages?.map((pkg: PackageResponseType["data"], idx) => (
                  <Tabs.TabPane tab={pkg.name} key={idx.toString()}>
                    <ServicePackageComp servicePackage={pkg}/>
                  </Tabs.TabPane>
                ))}
              </Tabs>
            </Card>
          </Col>
        </Row>
      </Card>
      <br/>
      <Card title="Service Description" bordered loading={isLoading}>
        <div dangerouslySetInnerHTML={{__html: getValue("description") as string}}/>
      </Card>
    </div>
  );
};

export default ServiceDetailPageComp;
