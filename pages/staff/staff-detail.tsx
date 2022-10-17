import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Switch, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import get from 'lodash/get';
import { format } from 'date-fns';
import Image from 'next/image';
import { Checkbox } from 'antd';
import Tabs from '../../components/Tabs';
import TitlePage from '../../components/TitlePage/Titlepage';
import { Radio } from 'antd';
import { Popover } from 'antd';
import Select from '../../components/Select/Select';
import Button from '../../components/Button/Button';
import Icon from '../../components/Icon/Icon';
import Input from '../../components/Input/Input';
import DatePicker from '../../components/DatePicker/DatePicker';
import DropdownStatus from '../../components/DropdownStatus';
import { StatusColorEnum, StatusEnum, StatusList } from '../../types';
import ModalSettingGroup from './Modal/modal-setting-group';
import ModalEditFault from './Modal/modal-edit-fault';
import ModalSettingFault from './Modal/modal-setting-fault';
import classNames from 'classnames';
import type { ITartgetManageProps, IFaultDetailProps } from './staff.type';
import styles from '../../styles/ListProduct.module.css';
import { IStaffListProps } from './staff.type';
import { productTypeList, groupStaff } from '../../const/constant';

const StaffDetail = () => {
  const [isShowEditFault, setIsShowEditFault] = useState(false);

  const columns: ColumnsType<ITartgetManageProps> = [
    {
      title: 'Tháng',
      width: 117,
      dataIndex: 'month',
      align: 'center',
      render: (_, record) => {
        return <p className="text-medium font-medium">{record.month}</p>;
      },
    },
    {
      title: 'Chỉ tiêu đơn hàng / KPI',
      width: 301,
      align: 'center',
      dataIndex: 'kpiorder',
      render: (_, record) => {
        return (
          <div className="flex flex-col w-full justify-center items-center">
            <div className="w-[61%] flex items-center justify-between">
              <div className="w-[135px] h-[6px] rounded-lg relative bg-slate-200">
                <div
                  className="h-[6px] rounded-lg absolute bg-sky-500"
                  style={{
                    width: `${
                      Math.round((record.order / record.kpiorder) * 1000) / 10
                    }%`,
                  }}
                ></div>
              </div>
              <div className="text-medium font-medium text-[#0EA5E9]">
                {Math.round((record.order / record.kpiorder) * 1000) / 10}%
              </div>
            </div>
            <div className="w-[28%] flex justify-around text-[#909098]">
              <span className="font-medium text-[#FF970D]">{record.order}</span>
              <span className="text-medium font-medium text-[#F0F0F1]">/</span>
              <span className="font-medium text-[#909098]">
                {record.kpiorder}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      title: 'Chỉ tiêu doanh thu / KPI',
      width: 301,
      align: 'center',
      dataIndex: 'kpiprofit',
      render: (_, record) => {
        return (
          <div className="flex flex-col w-full justify-center items-center">
            <div className="w-[61%] flex items-center justify-between">
              <div className="w-[135px] h-[6px] rounded-lg relative bg-slate-200">
                <div
                  className="h-[6px] rounded-lg absolute bg-green-500"
                  style={{
                    width: `${
                      Math.round((record.profit / record.kpiprofit) * 1000) / 10
                    }%`,
                  }}
                ></div>
              </div>
              <div className="text-medium font-medium text-[#10B981]">
                {Math.round((record.profit / record.kpiprofit) * 1000) / 10}%
              </div>
            </div>
            <div className="w-[50%] flex justify-around text-[#909098]">
              <span className="font-medium text-[#FF970D]">
                {record.profit}
              </span>
              <span className="text-medium font-medium text-[#F0F0F1]">/</span>
              <span className="font-medium text-[#909098]">
                {record.kpiprofit}
              </span>
            </div>
          </div>
        );
      },
    },
  ];

  const data = [
    {
      month: '9/2022',
      order: 150,
      profit: 13500000,
      kpiorder: 270,
      kpiprofit: 30000000,
    },
    {
      month: '9/2022',
      order: 150,
      profit: 13500000,
      kpiorder: 270,
      kpiprofit: 30000000,
    },
  ];

  const detail = {
    name: 'Nguyễn Văn A',
    phone: '0363.216.213',
    email: 'nguyenvana@gmail.com',
    birthday: '1/1/1',
    role: 'Nhân viên bán hàng',
    group: 'Sale cấp 1',
    store: 'Sale cấp 1',
  };

  const data2 = [
    {
      id: '1',
      name: 'Nhập thiếu địa chỉ khách hàng',
      fault: 1,
      update: '03/10/2022 09:25',
    },
    {
      id: '2',
      name: 'Nhập thiếu địa chỉ khách hàng',
      fault: 3,
      update: '03/10/2022 09:25',
    },
  ];
  const [itemList, setItemList] = useState([...data2]);
  const handleDelete = (id: string) => {
    setItemList((prevItemList) =>
      prevItemList.filter((product) => product.id !== id)
    );
  };
  const columns2: ColumnsType<IFaultDetailProps> = [
    {
      title: 'Tên lỗi',
      width: 336,
      dataIndex: 'name',
      align: 'left',
      render: (_, record) => {
        return <p className="font-medium  text-medium">{record.name}</p>;
      },
    },
    {
      title: 'Số lần vi phạm',
      width: 120,
      dataIndex: 'fault',
      align: 'center',
      render: (_, record) => {
        return <p className="font-medium  text-medium">{record.fault}</p>;
      },
    },
    {
      title: 'Cập nhật cuối',
      width: 150,
      dataIndex: 'update',
      align: 'center',
      render: (_, record) => {
        return <p className="font-normal text-medium">03/10/2022 09:25</p>;
      },
    },
    {
      title: 'Thao tác',
      width: 100,
      render: (_, record) => {
        return (
          <div className="flex justify-between w-[60px]">
            <div
              className="cursor-pointer"
              onClick={() => setIsShowEditFault(true)}
            >
              <Icon icon="edit-2" size={24} />
            </div>
            <div
              className="cursor-pointer"
              onClick={() => {
                handleDelete(record.id);
                console.log(record.id);
              }}
            >
              <Icon icon="trash" size={24} />
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="w-full p-[12px] bg-gray-100 rounded-lg staff-detail">
      <TitlePage
        title="Quản lý chỉ tiêu"
        href="/user-goal"
        className="mb-[12px] "
      />
      <div className="flex justify-between mb-[12px] mt-[12px] ">
        <div className="flex flex-col bg-white rounded-lg p-[12px] w-[516px]">
          <div className="flex justify-between mb-[12px] mb-[24px]">
            <div className="w-[72px] relative">
              <Image src={require('../../assets/staff.svg')} layout="fill" />
            </div>
            <div className="w-[240px] flex justify-between mb-[12px]">
              <Button
                variant="danger-outlined"
                width={116}
                icon={<Icon icon="trash" size={24} color="#EF4444" />}
                text="Xoá TK"
              />
              <Button variant="secondary" width={116} text="LƯU (F12)" />
            </div>
          </div>
          <div className="flex justify-between mb-[12px] items-center">
            <p className="text-medium font-medium">Họ và tên</p>
            <Input width={285} value={detail.name} />
          </div>
          <div className="flex justify-between mb-[12px] items-center">
            <p className="text-medium font-medium">Số điện thoại</p>
            <Input width={285} value={detail.phone} />
          </div>
          <div className="flex justify-between mb-[12px] items-center">
            <p className="text-medium font-medium">Email</p>
            <Input width={285} value={detail.email} />
          </div>
          <div className="flex justify-between mb-[12px] items-center">
            <p className="text-medium font-medium">Giới tính</p>
            <Radio.Group className="w-[286px]">
              <div className="mr-[95px]">
                <Radio value="Nam">Nam</Radio>
              </div>
              <Radio value="Nữ">Nữ</Radio>
            </Radio.Group>
          </div>
          <div className="flex justify-between mb-[12px] items-center">
            <p className="text-medium font-medium">Sinh nhật</p>
            <Input
              width={285}
              placeholder="ngày/tháng/năm"
            />
          </div>
          <div className="w-full my-[24px] bg-slate-200 h-[1px]"></div>
          <div className="flex justify-between mb-[12px] items-center items-center mb-[12px] items-center">
            <p className="text-medium font-medium">Chức vụ</p>
            <Select width={285} value={detail.role} />
          </div>
          <div className="flex justify-between mb-[12px] items-center items-center mb-[12px] items-center">
            <p className="text-medium font-medium">Nhóm</p>
            <Select width={285} value={detail.group} />
          </div>
          <div className="flex justify-between mb-[12px] items-center items-center mb-[12px] items-center">
            <p className="text-medium font-medium">Trực thuộc</p>
            <Select width={285} value={detail.store} />
          </div>
          <div className="flex justify-start items-center mb-[12px] items-center">
            <p className="mr-[85px] text-medium font-medium text-[#EF4444]">
              Chặn nhân viên này
            </p>
            <Switch />
          </div>
        </div>
        <div className="flex flex-col w-[790px]">
          <div className="bg-white rounded-lg p-[12px]">
            <p className="text-medium font-medium">Chỉ tiêu </p>
            <Table columns={columns} dataSource={data} />
          </div>
          <div className="flex justify-start my-[8px]">
            <p className="text-medoium font-medium mr-[5px]">Tổng đơn hàng</p>
            <p className="text-medoium font-medium text-[#384ADC] mr-[5px]">
              1500
            </p>
            <p>|</p>
            <p className="text-medoium font-medium mx-[5px]">Tổng doanh thu:</p>
            <p className="text-medoium font-medium text-[#384ADC] mr-[5px]">
              160.500.000 đ
            </p>
          </div>
          <div className="bg-white flex flex-col p-[12px]">
            <div className="w-full">
              <div className="flex justify-between w-full mb-[12px] items-center">
                <p className="text-medium font-medium">Chi tiết lỗi</p>
                <Button
                  variant="outlined"
                  width={114}
                  height={45}
                  icon={<Icon icon="add-1" size={24} />}
                  text="Thêm lỗi"
                  onClick={() => setIsShowEditFault(true)}
                />
              </div>
              <Table
                columns={columns2}
                dataSource={itemList.length ? [...itemList] : []}
              />
              <ModalEditFault
                title="Thêm lỗi"
                isVisible={isShowEditFault}
                onClose={() => setIsShowEditFault(false)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default StaffDetail;
