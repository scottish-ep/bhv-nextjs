import { format } from "date-fns";
import React, { useState } from "react";
import Button from "../../../components/Button/Button";
import Icon from "../../../components/Icon/Icon";
import Input from "../../../components/Input/Input";
import ModalConfirm from "../../../components/Modal/ModalConfirm/ModalConfirm";
import Select from "../../../components/Select/Select";
import TextArea from "../../../components/TextArea";
import DatePicker from "../../../components/DatePicker/DatePicker";
import TitlePage from "../../../components/TitlePage/Titlepage";
import Upload from "../../../components/Upload/Upload";
import { productTypeList, productAttributes } from "../../../const/constant";
import styles from "../../../styles/DetailProduct.module.css";
import type { CustomTagProps } from "rc-select/lib/BaseSelect";
import { Checkbox, Switch, Tag } from "antd";
import CheckboxList from "../../../components/CheckboxList/CheckboxList";
import classNames from "classnames";

interface ProductFormProps {
  detail?: any;
}

const ProductForms: React.FC<ProductFormProps> = ({ detail }) => {
  const [isShowModalConfirm, setIsShowModalConfirm] = useState(false);
  const [fileList, setFileList] = useState([]);

  const handleConfirmDelete = () => {
    console.log("delete");
    setIsShowModalConfirm(false);
  };

  const tagRender = (props: CustomTagProps) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color={value}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {label}
      </Tag>
    );
  };

  const tags = [
    {
      label: "Tất cả kho",
      value: "Tất cả kho",
    },
    {
      label: "Tổng kho Linh Dương",
      value: "Tổng kho Linh Dương",
    },
    {
      label: "Siêu thị tiện ích Linh Dương",
      value: "Siêu thị tiện ích Linh Dương",
    },
    {
      label: "LD Mart",
      value: "LD Mart",
    },
  ];

  const checkboxSettings: {
    label: string;
    value: string;
  }[] = [
    {
      label: "Tại quầy",
      value: "Tại quầy",
    },
    {
      label: "Online",
      value: "Online",
    },
    {
      label: "App",
      value: "App",
    },
  ];

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex justify-between mb-5">
        <TitlePage
          href="/warehouse/export-commands"
          title={detail ? "Chi tiết sản phẩm" : "Tạo sản phẩm"}
        />
        <div className="flex gap-x-2">
          <Button
            variant="danger-outlined"
            width={153}
            icon={<Icon icon="trash" size={24} color="#EF4444" />}
            onClick={() => setIsShowModalConfirm(true)}
          >
            Xoá sản phẩm
          </Button>
          <Button
            variant="secondary"
            width={148}
            style={{ fontWeight: "bold" }}
          >
            LƯU (F12)
          </Button>
        </div>
      </div>
      {/* Info */}
      <div className="flex gap-x-3">
        <div
          className="flex flex-col justify-between gap-[4px]"
          style={{ minWidth: 516 }}
        >
          <div className="w-full bg-white rounded p-3">
            <div className={styles.row}>
              <div className="text-medium font-medium">Mã sản phẩm *</div>
              <Input
                width={285}
                placeholder="Nhập mã sản phẩm"
                value={detail?.id}
              />
            </div>
            <div className={styles.row}>
              <div className="text-medium font-medium">Tên sản phẩm *</div>
              <Input
                width={285}
                placeholder="Nhập tên sản phẩm"
                value={detail?.name}
              />
            </div>
            <div className={styles.row}>
              <div className="text-medium font-medium">Danh mục *</div>
              <Select
                width={285}
                placeholder="Chọn danh mục sản phẩm"
                options={productTypeList}
              />
            </div>
            <div className={styles.row}>
              <div className="text-medium font-medium">Ngày sản xuất</div>
              <DatePicker
                width={285}
                placeholder="ngày/tháng/năm"
                // value={detail?.createdAt}
              />
            </div>
            <div className={styles.row}>
              <div className="text-medium font-medium">Ngày hết hạn</div>
              <DatePicker
                width={285}
                placeholder="ngày/tháng/năm"
                // value={detail?.expireDate}
              />
            </div>
            <div className={styles.row}>
              <div className="text-medium font-medium">Kho thao tác</div>
              <Select
                style={{ width: 285 }}
                mode="multiple"
                showArrow
                tagRender={tagRender}
                options={tags}
                maxTagCount="responsive"
              />
            </div>
            <div className={styles.row}>
              <div className="text-medium font-medium">Kênh bán</div>
              <div style={{ width: 285 }}>
                <CheckboxList options={checkboxSettings} />
                <div className="flex items-center gap-[5px] ml-[25px] mt-[15px]">
                  <Switch />
                  <span>Đồng giá trên tất cả kênh bán</span>
                </div>
              </div>
            </div>
            <div className="mb-[16px]">
              <div className="text-medium font-medium mb-[12px]">
                Hình ảnh sản phẩm
              </div>
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList}
                onChange={() => console.log("check")}
              />
            </div>
            <div className="mb-[16px]">
              <div className="text-medium font-medium mb-[12px]">
                Mô tả/Nội dung
              </div>
              <TextArea placeholder="Nhập nội dung" />
            </div>
          </div>
          <div className="w-full bg-white rounded p-3">
            <div className={styles.row}>
              <Switch />
              <span className="ml-[4px]">Tính tiền theo cân nặng</span>
            </div>
            <div className={styles.row}>
              <div>
                <Checkbox className="ml-[4px]">Thông báo khi hết hàng</Checkbox>
              </div>
              <Input width={285} placeholder="Số lượng: Nhập" />
            </div>
            <div className={styles.row}>
              <Checkbox>Bán âm (vẫn bán khi hết hàng)</Checkbox>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-[4px]">
          <div className="w-full flex gap-[16px] bg-white rounded p-3">
            <div className="w-1/2">
              <div className="mb-[16px]">
                <div className="text-medium font-medium mb-[4px]">
                  Thời điểm tạo
                </div>
                <div className="text-medium font-medium">
                  {detail?.createAt ? detail?.createAt : "20/09/2022"}
                </div>
              </div>
              <Input label="Nguồn hàng" placeholder="nhập" />
            </div>
            <div className="w-1/2">
              <TextArea label="Ghi chú" placeholder="Nhập nội dung" />
            </div>
          </div>
          <div className="p-[12px] bg-white rounded">
            <div className={styles.row}>
              <div className="text-[#384ADC] font-semibold">
                Danh sách thuộc tính
              </div>
              <div className="w-1/2 flex justify-end items-center">
                <div className="text-medium font-medium mr-[24px]">
                  Thêm thuộc tính
                </div>
                <Select
                  style={{ width: 175 }}
                  placeholder="Chọn"
                  options={productAttributes}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Filter */}
      <div className="flex gap-x-2 mt-4 mb-3">
        <Input
          width={306}
          prefix={<Icon icon="cart" color="#FF970D" size={24} />}
          placeholder="Nhập mã đơn hàng và enter"
        />
        <Input
          className="flex-1"
          prefix={<Icon icon="search" color="#FF970D" size={24} />}
          placeholder="Nhập mã sản phẩm / tên sản phẩm"
        />
        <Button
          variant="neural_200"
          width={196}
          icon={<Icon icon="barcode" size={24} />}
        >
          Quét mã vạch (F1)
        </Button>
      </div>
      <ModalConfirm
        titleBody="Xoá thông tin khách hàng?"
        content={
          <div className="text-center">
            Mọi dữ liệu của sản phẩm này <br />
            sẽ bị xoá khỏi hệ thống
          </div>
        }
        onOpen={handleConfirmDelete}
        onClose={() => setIsShowModalConfirm(false)}
        isVisible={isShowModalConfirm}
      />
    </div>
  );
};

export default ProductForms;
