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
import Select from '../../components/Select/Select';
import Button from '../../components/Button/Button';
import Icon from '../../components/Icon/Icon';
import Input from '../../components/Input/Input';
import DatePicker from '../../components/DatePicker/DatePicker';
import DropdownStatus from '../../components/DropdownStatus';
import ModalSettingTarget from './Modal/modal-setting-target';
import { StatusColorEnum, StatusEnum, StatusList } from '../../types';
import defaultAvatar from "../../assets/default-avatar.svg"
import classNames from 'classnames';

import styles from '../../styles/ListProduct.module.css';

import { ITartgetManageProps } from './staff.type';
import { productTypeList, groupStaff } from '../../const/constant';

const TargetManagement = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  // const [pagination, setPagination] = useState({
  //   order: 150    pageSize: 10,
  // });

  const [isShowModalSettingTarget, setIsShowModalSettingTarget] =
    useState(false);

  useEffect(() => {
    const element = document.getElementById('loading__animation');
    if (element) {
      element.remove();
    }
  }, []);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const [pagination, setPagination] = useState({
    total: 0,
    pageSize: 10,
  });
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const columns: ColumnsType<ITartgetManageProps> = [
    {
      title: '',
      width: 50,
      key: 'id',
      fixed: 'left',
      align: 'center',
      render: (_, record) => {
        return <Checkbox className="ml-[4px]" />;
      },
    },
    {
      title: 'T??n nh??n vi??n / ID',
      width: 184,
      dataIndex: 'id',
      key: 'name',
      fixed: 'left',
      align: 'left',
      render: (_, record) => (
        <div className="w-full flex justify-start">
          <div className="w-[36px] relative mr-[8px]">
            <Image src={record.img || defaultAvatar} layout="fill" />
          </div>
          <div className="flex flex-col justify-start">
            <p className="text-medium font-medium text-[#384ADC]">
              {record.name}
            </p>
            <p className="text-medium font-medium text-[#5F5E6B]">
              {record.id}
            </p>
          </div>
        </div>
      ),
    },
    {
      title: 'Ch???c v???',
      width: 130,
      dataIndex: 'role',
      key: 'name',
      align: 'center',
      render: (_, record) => (
        <div>
          <span className="font-medium text-medium">{record.role}</span>
        </div>
      ),
    },
    {
      title: 'T???ng s??? l?????ng ????n h??ng',
      width: 132,
      dataIndex: 'order',
      key: 'order',
      sorter: (a, b) => a.orderSum - b.orderSum,
      align: 'center',
      render: (_, record) => (
        <span className="font-medium text-[#1D1C2D]">{record.order}</span>
      ),
    },
    {
      title: 'Doanh thu',
      width: 150,
      dataIndex: 'profit',
      sorter: (a, b) => a.orderProfit - b.orderProfit,
      key: 'profit',
      align: 'center',
      render: (_, record) => (
        <span className="font-medium text-[#1D1C2D]">{record.profit} ??</span>
      ),
    },
    {
      title: 'KPI ????n h??ng',
      width: 315,
      sorter: (a, b) => a.orderKpiOrder - b.orderKpiOrder,
      dataIndex: 'kpiorder',
      key: 'kpiorder',
      align: 'center',
      render: (_, record) => (
        <div className="flex flex-col w-full justify-center items-center">
          <div className="w-[55%] flex items-center justify-between">
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
      ),
    },
    {
      title: 'KPI doanh thu',
      width: 315,
      dataIndex: 'kpiprofit',
      sorter: (a, b) => a.orderKpiProfit - b.orderKpiProfit,
      key: 'kpiprofit',
      align: 'center',
      render: (_, record) => (
        <div className="flex flex-col w-full justify-center items-center">
          <div className="w-[55%] flex items-center justify-between">
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
            <span className="font-medium text-[#FF970D]">{record.profit}</span>
            <span className="text-medium font-medium text-[#F0F0F1]">/</span>
            <span className="font-medium text-[#909098]">
              {record.kpiprofit}
            </span>
          </div>
        </div>
      ),
    },
  ];

  const data = Array(50)
  .fill({
    show: true,
    id: 'NV0001',
    name: 'Y???n Nhi',
    img: require('../../assets/staff.svg'),
    role: 'Sale c???p 1',
    order: 150,
    profit: 13500000,
    kpiorder: 270,
    kpiprofit: 30000000,
  })
  .map((item, index) => ({ ...item, id: `KH${index + 1}` }));

  const warehouseData = [
    {
      label: 'T???ng kho Linh D????ng',
      value: 'T???ng kho Linh D????ng',
      totalPrice: '21.000.000 ??',
    },
    {
      label: 'C???a h??ng LD Mart',
      value: 'C???a h??ng LD Mart',
      totalPrice: '21.000.000 ??',
    },
    {
      label: 'Si??u th??? ti???n ??ch LD',
      value: 'Si??u th??? ti???n ??ch LD',
      totalPrice: '21.000.000 ??',
    },
  ];

  return (
    <div className="w-full target-management">
      <div className="flex items-center justify-between mb-[12px] flex-wrap">
        <div className="flex flex-col justify-start">
          <TitlePage title="Chi ti???t ch??? ti??u" href="/user-goal" />
          <div className="flex mt-[8px]">
            <p className="text-medium font-medium mr-[5px]">
              Qu???n l?? nh??n vi??n
            </p>
            <p>/</p>
            <p className="text-medium font-medium text-[#384ADC] ml-[5px]">
              Qu???n l?? ch??? ti??u
            </p>
          </div>
        </div>
        <div className="flex gap-[8px] flex-wrap">
          <div className="flex items-center">
            <div className="mr-[12px]">Ch???n kho</div>
            <Select
              defaultValue={warehouseData[0]}
              options={warehouseData}
              style={{ width: 248 }}
            />
          </div>
          <Button
            variant="outlined"
            width={109}
            icon={<Icon icon="export" size={24} />}
          >
            Xu???t file
          </Button>
          <Button
            variant="outlined"
            width={158}
            color="white"
            icon={<Icon icon="settings-1" size={24} />}
            onClick={() => setIsShowModalSettingTarget(true)}
          >
            C??i ?????t ch??? ti??u
          </Button>
          <Button
            variant="no-outlined"
            width={62}
            color="white"
            icon={<Icon icon="question" size={16} />}
          >
            H??? tr???
          </Button>
        </div>
      </div>
      <div className="flex flex-row bg-white rounded-lg mt-[12px] mb-[12px] p-[12px]">
        <div className="flex flex-col w-[50%] mb-[16px]">
          <p className="text-medium font-normal">T??n ch??? ti??u</p>
          <p className="text-medium font-medium">Ch??? ti??u th??ng 9</p>
        </div>
        <div className="flex flex-col w-[50%]">
          <p className="text-medium font-normal">Th???i gian ??p d???ng</p>
          <p className="text-medium font-medium">01/09/2022 - 30/09/2022</p>
        </div>
      </div>
      <div className="flex items-center flex-wrap gap-[8px] mb-[12px]">
        <Input
          className="flex-1"
          prefix={<Icon icon="search" color="#FF970D" size={24} />}
          placeholder="Nh???p ID/ T??n nh??n vi??n"
        />
        <Select
          prefix={<Icon icon="category" size={24} color="#5F5E6B" />}
          placeholder="T??m theo nh??m nh??n vi??n"
          style={{ width: 306 }}
          options={groupStaff}
        />
      </div>
      <div className="relative">
        <Table
          columns={columns}
          dataSource={data}
          scroll={{ x: 50, y: 500 }}
          pagination={{
            defaultPageSize: pagination.pageSize,
            showSizeChanger: true,
            pageSizeOptions: [10, 20, 50, 100],
          }}
        />
      </div>
      <ModalSettingTarget
        title="C??i ?????t ch??? ti??u"
        isVisible={isShowModalSettingTarget}
        onClose={() => setIsShowModalSettingTarget(false)}
        onOpen={() => setIsShowModalSettingTarget(false)}
      />
    </div>
  );
};

export default TargetManagement;
