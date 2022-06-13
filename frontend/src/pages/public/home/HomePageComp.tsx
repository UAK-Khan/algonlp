import React, {useState} from 'react';
import {Button, Card, Modal, Tag} from "antd";
import TextArea from "antd/es/input/TextArea";
import ModalsListComp from "./modalsList/ModalsListComp";
import styles from "./HomePageComp.module.css";
import {CheckOutlined, CopyOutlined, ThunderboltOutlined} from '@ant-design/icons';
// @ts-ignore
import * as deepai from "deepai";
import {modalsData} from "../../../shared/data/data";
import {CONTACT_ROUTE} from "../../../shared/routesConstants";
import {useNavigate} from "react-router-dom";

deepai.setApiKey('dbbe9ef9-c35a-4f9d-9627-309a9b3dbb8c');

const HomePageComp = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [textCopied, setTextCopied] = useState(false);
  const [selectedModal, setModalSelected] = useState<typeof modalsData[number]>("Text Generator");

  const onSubmitText = async () => {
    if (searchText.length) {
      setLoading(true);
      // should be requested from backend
      const resp = await deepai.callStandardApi("text-generator", {text: searchText});
      setLoading(false);
      setDescription(resp?.output || "");
    }
  }

  const onSelectAllText = (event: any) => event.target.select();

  const onCopyText = () => {
    try {
      navigator.clipboard.writeText(description);
      setTextCopied(true);
    } catch (e) {
      setTextCopied(false);
    }
  }

  const copyEl = textCopied ? <><CheckOutlined/> Copied</> : <><CopyOutlined/> Copy</>

  const onChangeModal = (modal: typeof modalsData[number]) => {
    if (modal !== "Text Generator") {
      Modal.info({
        title: 'Premium Tool',
        content: 'This Tool is premium and can be used after purchasing',
        okText: "Contact Us",
        onOk: () => navigate(CONTACT_ROUTE),
        onCancel: () => false,
        okCancel: true
      });
    } else {
      setModalSelected(modal)
    }
  }

  return (
    <div className="c-container">
      <ModalsListComp onChangeModal={onChangeModal} selectedModal={selectedModal}/>
      <Card title="Write any text in text-box or select any builtin text from Prompt List.">
        <Tag color="magenta">{selectedModal}</Tag>
        <TextArea
          placeholder="Generate anything with out super smart modals"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          autoSize={{minRows: 6, maxRows: 20}}
        />
        <div className={styles.button}>
          <Button
            type="primary"
            loading={isLoading}
            icon={<ThunderboltOutlined/>}
            onClick={onSubmitText}
            disabled={!searchText?.length}
            title={!searchText?.length ? "Enter text to search in the field above" : ""}
          >
            Run Modal
          </Button>
        </div>

        <Modal
          title={selectedModal}
          visible={!!description?.length}
          onOk={onCopyText}
          okText={copyEl}
          okButtonProps={{style: {backgroundColor: textCopied ? "green" : ""}}}
          onCancel={() => setDescription("")}
        >
          <TextArea
            defaultValue={description}
            onFocus={onSelectAllText}
            autoSize
            bordered={false}
            style={{overflow: "hidden"}}
          />
        </Modal>
      </Card>
    </div>
  );
};

export default HomePageComp;
