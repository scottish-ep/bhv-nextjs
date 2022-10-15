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

interface ModalSettingGroupProps {
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

const ModalSettingGroup = (props: ModalSettingGroupProps) => {
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

  const data = [
    {
      id: '1',
      name: 'Nhom 1',
    },
    {
      id: '2',
      name: 'Nhom 2',
    },
  ];

  const [itemList, setItemList] = useState([{id: '1', name: 'Nhom 1'}]);
  const [name, setName] = useState('');

  const onNameChange = (event) => {
    setName(event.target.value);
  };
  const handleAdd = (e) => {
    setItemList((current) => [...current, {id: toString(Math.random()), name: name}]);
  };
  const handleDelete = (id: string) => {
    setItemList((prevItemList) =>
      prevItemList.filter((product) => product.id !== id)
    );
  };
  return (
    <Modal
      isCenterModal
      title={title}
      isVisible={isVisible}
      onClose={onClose}
      onOpen={onOpen}
      iconClose={iconClose}
      width={504}
      footer={false}
      className="p-[16px] modal-setting-group rounded-lg"
    >
      <div>
        <div className="w-full flex flex-col rounded-lg bg-white p-[12px] mb-[32px]">
          {Array.isArray(itemList) &&
            itemList.map((item) => (
              <div className="flex justify-between items-center mb-[12px]">
                <Input width={380} defaultValue={item.name} />
                <div
                  onClick={() => handleDelete(item.id)}
                  className="cursor-pointer"
                >
                  <Icon icon="trash" size={24} />
                </div>
              </div>
            ))}
          <div className="w-full bg-slate-100"></div>
          <Input
            className="w-full"
            placeholder="Thêm mới và nhấn Enter.."
            value={name}
            onChange={onNameChange}
            
            prefix={
              <div onClick={ handleAdd} >
                <Icon icon="add-1" size={24} />
              </div>
            }
          />
        </div>
        <div className="w-full flex justify-between">
          <Button
            width={210}
            height={44}
            text="HUỶ BỎ"
            className="font-medium"
            variant="outlined"
            onClick={onClose}
          />
          <Button
            variant="secondary"
            text="LƯU (F12)"
            width={210}
            height={44}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ModalSettingGroup;
