import React from 'react';
import {Col, Progress, Row} from "antd";
import {useGetSkillsRequest} from "../../../shared/hooks/apiHooks/SkillsApiRequestHooks";

const SkillsComp = () => {
  const { data } = useGetSkillsRequest();
  const skills = data?.list || [];
  return (
    <Row gutter={16}>
      { skills.map((skill) => (
        <Col xs={24} md={12} key={skill.id}>
          <div style={{display: "flex"}}>
            <h3 style={{flex: 1}}>{skill.skill}</h3>
            <p>{skill.score}%</p>
          </div>
          <Progress percent={skill.score || 0} showInfo={false} />
        </Col>
      ))}
    </Row>
  );
};

export default SkillsComp;
