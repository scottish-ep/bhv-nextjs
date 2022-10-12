import React, { useState } from "react";
import { ReactNode } from "react";
import styles from "./TitlePage.module.css";
import Icon from "../Icon/Icon";
import type { UploadFile } from "antd/es/upload/interface";
import type { RcFile, UploadProps as UploadAntdProps } from "antd/es/upload";
import { Upload as UploadAntd } from "antd";
import { PlusOutlined } from "@ant-design/icons";

interface UploadProps extends UploadAntdProps {
  className?: string;
  children?: ReactNode;
  images?: any[];
  onChange?: (value?: any) => void;
}

const Upload = (props: UploadProps) => {
  const { className, children, images, onChange, ...res } = props;
  const [fileList, setFileList] = useState(images);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    onChange;
  };

  return (
    <UploadAntd className={className} onChange={handleChange} {...props}>
      {uploadButton}
    </UploadAntd>
  );
};

export default Upload;
