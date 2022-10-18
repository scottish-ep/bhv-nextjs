import Select from '../../../components/Select/Select';
import Input from '../../../components/Input/Input';
import Modal from '../../../components/Modal/Modal/Modal';
import Button from '../../../components/Button/Button';
import React, { useEffect, useState, ReactNode } from 'react';
interface ModalAddressProps {
  isVisible: boolean;
  isEdit: boolean;
  title?: string;
  iconClose?: ReactNode;
  onClose?: (event?: any) => void;
  onOpen?: (event?: any) => void;
  content?: string | ReactNode;
  titleBody?: string;
  time?: string;
  deal?: string;
  method?: string;
  id?: string;
}

const ModalAddress = (props: ModalAddressProps) => {
  const {
    isVisible,
    isEdit,
    title,
    iconClose = 'Đóng',
    onClose,
    onOpen,
    content,
    titleBody,
    time,
    deal,
    method,
    id,
  } = props;

  const data = {
    name: 'Tran Huyen',
    phone: '0987.987.456',
    province: [
      {
        label: 'TP. HCM',
        value: 'TP. HCM',
      },
      {
        label: 'Hue',
        value: 'Hue',
      },
    ],
    district: [
      {
        label: 'Tân Bình',
        value: 'Tân Bình',
      },
      {
        label: 'Quan 2',
        value: 'Quan 2',
      },
    ],
    ward: [
      {
        label: 'Phường 3',
        value: 'Phường 3',
      },
      {
        label: 'Phường 2',
        value: 'Phuong 2',
      },
    ],
    street: '123 Nguyễn Văn Trỗi',
    detail: 'Cổng nhà màu xanh',
  };

  return (
    <Modal
      isCenterModal
      title={title}
      isVisible={isVisible}
      onClose={onClose}
      onOpen={onOpen}
      iconClose={iconClose}
      width={794}
      footer={false}
      className="p-[16px] modal-address"
    >
      <div className="w-full p-[12px] flex flex-col bg-[#F5F5F6]">
        <div className="w-full flex justify-between">
          <div className="w-[365px] flex flex-col justify-start">
            <p className="font-medium text-medium my-[8px]">Họ và tên</p>
            {!isEdit ? (
              <Input width={340} placeholder="Nhập họ và tên" />
            ) : (
              <Input width={340} value={data.name} />
            )}
          </div>
          <div className="w-[365px] flex flex-col justify-start">
            <p className="font-medium text-medium my-[8px]">Số điện thoại</p>
            {!isEdit ? (
              <Input width={340} placeholder="Nhập SĐT" />
            ) : (
              <Input width={340} value={data.phone} />
            )}
          </div>
        </div>
        <div className="w-full flex justify-between">
          <div className="w-[365px] flex flex-col justify-start">
            <p className="font-medium text-medium my-[8px]">Tỉnh/Thành*</p>
            {!isEdit ? (
              <Select width={340} value="Chọn" options={data.province} />
            ) : (
              <Select
                width={340}
                value={data.province[0]}
                options={data.province}
              />
            )}
          </div>
          <div className="w-[365px] flex flex-col justify-start">
            <p className="font-medium text-medium my-[8px]">Quận/Huyện*</p>
            {!isEdit ? (
              <Select width={340} defaultValue="Chọn" options={data.district} />
            ) : (
              <Select
                width={340}
                defaultValue={data.district[0]}
                options={data.district}
              />
            )}
          </div>
        </div>
        <div className="w-full flex justify-between">
          <div className="w-[365px] flex flex-col justify-start">
            <p className="font-medium text-medium my-[8px]">Xã/Phường*</p>
            {!isEdit ? (
              <Select width={340} defaultValue="Chọn" options={data.ward} />
            ) : (
              <Select
                width={340}
                defaultValue={data.ward[0]}
                options={data.ward}
              />
            )}
          </div>
          <div className="w-[365px] flex flex-col justify-start">
            <p className="font-medium text-medium my-[8px]">Quận/Huyện*</p>
            {!isEdit ? (
              <Input width={340} placeholder="Nhập" />
            ) : (
              <Input
                width={340}
                value={data.street}
              />
            )}
          </div>
        </div>
        <div className='w-full flex flex-col'>
          <p className='text-medium font-medium mb-[8px]'>Hướng dẫn chi tiết</p>
          {!isEdit ? (<Input width={687} placeholder="Nhập"/>) : (<Input width={687} defaultValue={data.detail}/>) } 
        </div>
      </div>
    </Modal>
  );
};

export default ModalAddress;