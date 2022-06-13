import React, {useEffect, useState} from 'react';
import {Upload} from "antd";
import ImgCrop from 'antd-img-crop';
import {RcFile, UploadFile} from "antd/lib/upload/interface";
import {EntityFilesType} from "../../shared/interfaces/moduleTypes";
import {SERVICE_IMG_DIR_PATH} from "../../configs/appConfigs";

type PropTypes = {
  onImagesSelected: (imageFiles: RcFile[]) => void,
  onDeleteFile: (fileId: string) => void,
  maxImagesCanSelect: number,
  images?: EntityFilesType[],
};

const ImageUploadComp = ({ maxImagesCanSelect, onImagesSelected, images, onDeleteFile }: PropTypes) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (images?.length) {
      const imagesPath:UploadFile[] = images.map((image) => ({
        uid: image.id, name: "", url: `${SERVICE_IMG_DIR_PATH}/${image.id}${image.filePath}`, status: 'success'
      }));
      setFileList(imagesPath);
    }
  }, [images]);

  const onChange = ({ fileList: newFileList }: { fileList: UploadFile[] }) => {
    setFileList(newFileList);
    const originalFiles = newFileList
      .map((file) => file.originFileObj).filter((file) => file) as RcFile[];
    if (originalFiles.length) onImagesSelected(originalFiles);
  };

  const onPreview = async (file: UploadFile<any>) => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as any);
        reader.onload = () => resolve(reader.result as any);
      });
    }
    const image = new Image();
    image.src = src as string;
    const imgWindow = window.open(src);
    if (imgWindow) imgWindow.document.write(image.outerHTML);
  };

  return (
    <ImgCrop rotate>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
        beforeUpload={() => false}
        onRemove={(file) => {
          if (file.uid && !file.originFileObj) return onDeleteFile(file.uid);
        }}
      >
        {fileList.length < maxImagesCanSelect && '+ Upload'}
      </Upload>
    </ImgCrop>
  );
};

export default ImageUploadComp;
