import Select from '../../../components/Select/Select';
import Input from '../../../components/Input/Input';
import TextArea from '../../../components/TextArea';
import React, { useEffect, useState, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import Button from '../../../components/Button/Button';
import { StatusColorEnum, StatusEnum, StatusList } from '../../../types';
import DatePicker from '../../../components/DatePicker/DatePicker';
import Modal from '../../../components/Modal/Modal/Modal';
import { Table } from 'antd';
import Icon from '../../../components/Icon/Icon';
import { ColumnsType } from 'antd/es/table';
import { listDebtDetail } from '../../../const/constant';
import Upload from '../../../components/Upload/Upload';

const { Option } = Select;
let index = 0;
interface ModalEditFaultProps {
  isVisible: boolean;
  title?: string;
  iconClose?: ReactNode;
  onClose?: (event?: any) => void;
  onOpen?: (event?: any) => void;
  content?: string | ReactNode;
  titleBody?: string;
  time?: string;
  deal?: string;
  method?: string;
  status?: StatusEnum;
  id?: string;
}

const ModalEditFault = (props: ModalEditFaultProps) => {
  const {
    isVisible,
    title,
    iconClose = 'Đóng',
    onClose,
    onOpen,
    content,
    titleBody,
    time,
    deal,
    method,
    status,
    id,
  } = props;

  const [items, setItems] = useState(['Đi trễ', 'Quên ghi địa chỉ khách hàng']);
  const [name, setName] = useState('');

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const addItem = (e) => {
    e.preventDefault();
    setItems([...items, name || `New Item ${index++}`]);
    setName('');
  };

  const fault = [
    {
      label: 'Đi trễ',
      value: 'Đi trễ',
    },
    {
      label: 'Đi trễ',
      value: 'Đi trễ',
    },
  ];
  return (
    <Modal
      isCenterModal
      title={title}
      isVisible={isVisible}
      onClose={onClose}
      onOpen={onOpen}
      iconClose={iconClose}
      width={648}
      footer={false}
      className="p-[16px] modal-edit-fault rounded-lg"
    >
      <div>
        <div className="w-full flex flex-col bg-white rounded-lg p-[12px]">
          <div className="flex justify-between items-center mb-[12px] ">
            <p className="text-medium font-medium ">Tên lỗi</p>
            <Select
              width={385}
              dropdownRender={(menu) => (
                <>
                  {menu}
                  <Input
                    prefix={
                      <div onClick={addItem}>
                        <Icon icon="add-1" size={24} color="#384ADC" />
                      </div>
                    }
                    value={name}
                    onChange={onNameChange}
                    width={385}
                    placeholder="Thêm mới và nhấn Enter..."
                  />
                </>
              )}
            >
              {items.map(item => (
                <p key={item}>{item}</p>
              ))}
            </Select>
          </div>
          <div className="flex justify-between items-center mb-[12px]">
            <p className="text-medium font-medium ">Số lần vi phạm</p>
            <Input width={385} />
          </div>
          <div className="flex flex-col justify-start">
            <p className="text-medium font-medium mb-[8px]">Ghi chú</p>
            <TextArea
              className="bg-slate-100 !h-[104px]"
              placeholder="Nhập ghi chú"
            />
          </div>
        </div>
        <div className="w-full flex justify-between mt-[32px]">
          <Button
            width={285}
            height={44}
            text="HUỶ BỎ"
            variant="outlined"
            onClick={onClose}
          />
          <Button variant="secondary" text="LƯU" width={285} height={44} />
        </div>
      </div>
    </Modal>
  );
};

export default ModalEditFault;
