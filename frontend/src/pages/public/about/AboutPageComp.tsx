import React from 'react';
import {useGetAboutRequest} from "../../../shared/hooks/apiHooks/AboutApiRequestHooks";
import SkillsComp from "../skills/SkillsComp";
import LoaderComp from "../../../components/loader/LoaderComp";
import {useGetSkillsRequest} from "../../../shared/hooks/apiHooks/SkillsApiRequestHooks";
import PageTitleComp from "../../../components/pageTitle/PageTitleComp";
import {Card, Col, Image, Row, Tag} from "antd";

const AboutPageComp = () => {
  const {isLoading, data} = useGetAboutRequest();
  // preloading skills in cache so can display loader only once.
  const {isLoading: skillsLoading} = useGetSkillsRequest()
  const about = data?.data?.about || "";

  return (
    <div className="c-container">
      <PageTitleComp title="About Us"/>
      <LoaderComp isLoading={isLoading || skillsLoading}>
        {!isLoading ? <>
          <Card>
            <Row>
              <Col xs={5}>
                <Image
                  style={{width: "100%", height: "auto", borderRadius: "100%"}}
                  src="/images/user/avatar.jpg"
                />
              </Col>
              <Col xs={19}>
                <div style={{padding: '0 15px'}}>
                  <Tag color="magenta">Data Analyst</Tag>
                  <Tag color="magenta">Python</Tag>
                  <Tag color="magenta">Machine Learning</Tag>
                </div>
                <div className="ql-editor" dangerouslySetInnerHTML={{__html: about}}/>
              </Col>
            </Row>
          </Card>
          <br/>
          <Card title="Skills">
            <SkillsComp/>
          </Card>
        </>: <></>}
      </LoaderComp>
    </div>
  );
};

export default AboutPageComp;
