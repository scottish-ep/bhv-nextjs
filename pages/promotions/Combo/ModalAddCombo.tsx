import { InputNumber, Radio, Switch, Tag } from "antd";
import React, { useEffect, useState } from "react";
import Button from "../../../components/Button/Button";
import DatePicker from "../../../components/DateRangePicker/DateRangePicker";
import Icon from "../../../components/Icon/Icon";
import Input from "../../../components/Input/Input";
import Modal from "../../../components/Modal/Modal/Modal";
import Select from "../../../components/Select/Select";
import { ICombo, IProductOfCombo } from "../promotion.type";
import type { CustomTagProps } from "rc-select/lib/BaseSelect";
import { searchTypeList, warehouses } from "../../../const/constant";
import ProductTable from "./ProductTable";

interface ModalAddComboProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  rowSelected?: ICombo;
  onRemove: () => void;
}

const ModalAddCombo: React.FC<ModalAddComboProps> = (props) => {
  const { isVisible, title, onClose, rowSelected, onRemove } = props;
  const [productList, setProductList] = useState<IProductOfCombo[]>([]);

  useEffect(() => {
    setProductList(rowSelected?.productList || []);
  }, [rowSelected]);

  const Footer = () => (
    <div className="flex justify-between flex-wrap">
      <div>
        {rowSelected && (
          <Button
            variant="danger-outlined"
            width={166}
            icon={<Icon icon="trash" size={24} />}
            onClick={onRemove}
          >
            Xoá combo
          </Button>
        )}
      </div>
      <div className="flex gap-x-2 flex-wrap">
        <Button variant="outlined" width={267} onClick={onClose}>
          HUỶ BỎ
        </Button>
        <Button variant="secondary" width={267} onClick={onClose}>
          LƯU COMBO
        </Button>
      </div>
    </div>
  );

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

  return (
    <Modal
      isCenterModal
      title={title}
      isVisible={isVisible}
      onClose={onClose}
      iconClose="Đóng"
      footer={<Footer />}
      width={1098}
    >
      <div className="flex flex-col gap-y-3">
        <div className="flex gap-x-6 items-center">
          <span className="w-[200px]">Tên combo*</span>
          <Input
            width={397}
            placeholder="Nhập tên combo"
            defaultValue={rowSelected?.name}
          />
        </div>
        <div className="flex gap-x-6 items-center">
          <div className="flex gap-x-2 items-center w-[200px]">
            <Switch
              className="button-switch"
              defaultChecked={rowSelected?.apply || true}
            />
            <span>Thời gian áp dụng</span>
          </div>
          <DatePicker
            width={397}
            placeholder={["Ngày/tháng/năm - ", "Ngày tháng/năm"]}
          />
        </div>
        <div className="flex gap-x-6 items-center">
          <span className="w-[200px]">Chọn kho</span>

          <Select
            mode="multiple"
            showArrow
            tagRender={tagRender}
            defaultValue={["Tất cả kho"]}
            width={397}
            options={warehouses}
          />
        </div>
        <div className="flex gap-x-6 items-center h-[45px]">
          <span className="w-[200px]">Chọn kênh áp dụng</span>
          <Radio.Group defaultValue="here">
            <Radio value="here">Tại quầy</Radio>
            <Radio value="online">Online</Radio>
            <Radio value="both">Cả hai</Radio>
          </Radio.Group>
        </div>
        <div className="flex gap-x-3">
          <Select
            placeholder="Chọn sản phẩm/mẫu mã"
            width={163}
            defaultValue="product"
            options={searchTypeList}
          />
          <Input
            className="flex-1"
            prefix={<Icon icon="search" color="#FF970D" size={24} />}
            placeholder="Nhập mã sản phẩm / tên sản phẩm"
          />
        </div>
        <ProductTable
          productList={productList}
          setProductList={setProductList}
        />
        <div className="flex gap-x-6 items-center">
          <span className="w-[200px]">Giá combo*</span>
          <InputNumber
            value={rowSelected?.price}
            className="text-center w-[397px]"
            placeholder="Nhập giá combo"
            addonAfter="đ"
          />
        </div>
      </div>
    </Modal>
  );
};

export default ModalAddCombo;
