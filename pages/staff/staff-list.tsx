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
import defaultAvatar from "../../assets/default-avatar.svg"
import { Popover } from 'antd';
import Select from '../../components/Select/Select';
import Button from '../../components/Button/Button';
import Icon from '../../components/Icon/Icon';
import Input from '../../components/Input/Input';
import DatePicker from '../../components/DatePicker/DatePicker';
import DropdownStatus from '../../components/DropdownStatus';
import { StatusColorEnum, StatusEnum, StatusList } from '../../types';
import ModalSettingGroup from './Modal/modal-setting-group';
import ModalSettingFault from './Modal/modal-setting-fault';
import ModalSettingStaff from './Modal/modal-setting-staff';
import classNames from 'classnames';

import styles from '../../styles/ListProduct.module.css';

import { IStaffListProps } from './staff.type';
import { productTypeList, groupStaff } from '../../const/constant';

const StaffList = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  const [isShowModalSettingGroup, setIsShowModalSettingGroup] = useState(false);
  const [isShowModalSettingFault, setIsShowModalSettingFault] = useState(false);
  const [isShowModalSettingStaff, setIsShowModalSettingStaff] = useState(false);

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
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const [pagination, setPagination] = useState({
    total: 0,
    pageSize: 10,
  });

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

  const columns: ColumnsType<IStaffListProps> = [
    {
      title: 'ID',
      width: 125,
      dataIndex: 'id',
      align: 'center',
      render: (_, record) => (
        <div className="text-medium font-medium">{record.id}</div>
      ),
    },
    {
      title: 'T??n / m?? nh??n vi??n',
      width: 431,
      dataIndex: 'name',
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
          </div>
        </div>
      ),
    },
    {
      title: 'S??T',
      width: 125,
      dataIndex: 'phone',
      key: 'name',
      align: 'center',
      render: (_, record) => (
        <div>
          <span className="font-medium text-medium">{record.phone}</span>
        </div>
      ),
    },
    {
      title: 'Ch???c v???',
      width: 220,
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
      title: 'Nh??m',
      width: 130,
      dataIndex: 'Fault',
      key: 'name',
      align: 'center',
      render: (_, record) => (
        <div>
          <span className="font-medium text-medium">{record.group}</span>
        </div>
      ),
    },
    {
      title: 'Tr???c thu???c',
      width: 240,
      dataIndex: 'store',
      key: 'name',
      align: 'center',
      render: (_, record) => (
        <div>
          <span className="font-medium text-medium">{record.store}</span>
        </div>
      ),
    },
    {
      title: 'S??? l???i',
      width: 70,
      dataIndex: 'role',
      key: 'name',
      sorter: (a, b) => a.orderError - b.orderError,
      align: 'center',
      render: (_, record) => (
        <div>
          <span className="font-medium text-medium">{record.error}</span>
        </div>
      ),
    },
  ];

  const data = Array(50)
    .fill({
      show: true,
      img: require('../../assets/staff.svg'),
      name: 'Y???n Nhi',
      id: 'NV0001',
      phone: '0987.654.321',
      role: 'Nh??n vi??n b??n h??ng',
      group: 'Sale c???p 1',
      store: 'T???ng kho Linh D????ng',
      error: 0,
    })
    .map((item, index) => ({ ...item }));

  const content = (
    <div className="w-[180px] flex flex-col justify-start">
      <p
        className="text-medium font-normal cursor-pointer mb-[16px]"
        onClick={() => setIsShowModalSettingGroup(true)}
      >
        C??i ?????t nh??m NVBH
      </p>
      <p
        className="text-medium font-normal cursor-pointer"
        onClick={() => setIsShowModalSettingFault(true)}
      >
        C??i ?????t l???i
      </p>
    </div>
  );

  return (
    <div className="w-full target-management">
      <div className="flex items-center justify-between mb-[12px] flex-wrap">
        <div className="flex flex-col justify-start">
          <TitlePage title="Danh s??ch nh??n vi??n b??n h??ng" href="/user-goal" />
          <div className="flex mt-[8px]">
            <p className="text-medium font-medium mr-[5px]">
              Qu???n l?? nh??n vi??n
            </p>
            <p>/</p>
            <p className="text-medium font-medium text-[#384ADC] ml-[5px]">
              Danh s??ch nh??n vi??n b??n h??ng
            </p>
          </div>
        </div>
        <div className="flex gap-[8px] flex-wrap">
          <div className="flex items-center">
            <div className="mr-[12px] font-medium">Ch???n kho</div>
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
            variant="primary"
            width={143}
            color="white"
            icon={<Icon icon="add-1" size={24} color="white" />}
            onClick={() => setIsShowModalSettingStaff(true)}
          >
            Th??m m???i
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
        <Popover
          placement="bottomRight"
          content={content}
          trigger="hover"
          overlayStyle={{ width: '180px' }}
          className="relative"
        >
          <Button width={129} height={45} className="p-0">
            <div className="w-[129px] flex justify-between p-[10px] items-center">
              <div className="flex justify-left">
                <Icon icon="setting" size={24} className="mr-[10px]" />
                C??i ?????t
              </div>
              <Icon icon="arrow-down-1" size={14} />
            </div>
          </Button>
        </Popover>
      </div>
      <div className="relative">
        <Table
          rowKey={(record) => record.id}
          columns={columns}
          dataSource={data}
          pagination={{
            defaultPageSize: pagination.pageSize,
            showSizeChanger: true,
            pageSizeOptions: [10, 20, 50, 100],
          }}
          scroll={{y: 400    }}
        />
      </div>
      <ModalSettingGroup
        title="C??i ?????t nh??m nh??n vi??n b??n h??ng"
        isVisible={isShowModalSettingGroup}
        onClose={() => setIsShowModalSettingGroup(false)}
        onOpen={() => setIsShowModalSettingGroup(false)}
      />
      <ModalSettingFault
        title="C??i ?????t l???i nh??n vi??n hay m???c"
        isVisible={isShowModalSettingFault}
        onClose={() => setIsShowModalSettingFault(false)}
        onOpen={() => setIsShowModalSettingFault(false)}
      />
      <ModalSettingStaff
        title="Th??m nh??n vi??n b??n h??ng"
        isVisible={isShowModalSettingStaff}
        onClose={() => setIsShowModalSettingStaff(false)}
        onOpen={() => setIsShowModalSettingStaff(false)}
      />
    </div>
  );
};

export default StaffList;
