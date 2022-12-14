import React, { useEffect, useState } from 'react';
import { ReactNode } from 'react';
import ReactDOM from 'react-dom';

import { Table, Switch } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import get from 'lodash/get';
import TitlePage from '../../components/TitlePage/Titlepage';
import Image from 'next/image';
import { formatCustomers } from '../../utils/utils';
import { LevelCustomer } from '../../enums/enums';
import Select from '../../components/Select/Select';
import Button from '../../components/Button/Button';
import Icon from '../../components/Icon/Icon';
import Input from '../../components/Input/Input';
import InputRangePicker from '../../components/DateRangePicker/DateRangePicker';
import ModalConfirm from '../../components/Modal/ModalConfirm/ModalConfirm';
import ModalNotice from '../../components/Modal/ModalNotice/ModalConfirm';
import ModalAddCustomer from './ModalAddCustomer/ModalAddCustomer';
import Checkbox from '../../components/CheckboxList/CheckboxList';
import defaultAvatar from '../../assets/default-avatar.svg';

interface DataType {
  key: string | number;
  isBlock: boolean | number;
  id: string | number;
  name: string;
  phoneNumber: string;
  customerLvName: string;
  orderTotalCount: number | string;
  printed: number | string;
  received: number | string;
  orderReturn: number | string;
  orderReturnAPart: number | string;
  successCost: string;
  lastBuy: string;
  lastUpdated: string;
}

const ListCustomer = () => {
  const defaultPagination = {
    total: 0,
    pageSize: 8,
  };

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [customers, setCustomers] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState(defaultPagination);
  const [isShowModalConfirm, setIsShowModalConfirm] = useState(false);
  const [isShowModalNotice, setIsShowModalNotice] = useState(false);
  const [isShowModalAddCustomer, setIsShowModalAddCustomer] = useState(false);
  const [isShowSettings, setIsShowSettings] = useState(true);

  useEffect(() => {
    const element = document.getElementById('loading__animation');
    if (element) {
      element.remove();
    }
  }, []);

  useEffect(() => {
    const url = '/api/v1/customer/customer-list/list';
    console.log('url', url);
    fetch(url)
      .then((res) => res.json())
      .then((res: any) => {
        console.log(res.result);
        const response = res.result;
        setPagination({
          ...pagination,
          total: response.totalPage * pagination.pageSize,
        });
        const customers = formatCustomers(response.customers);
        console.log(customers);
        setCustomers(customers);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const onChange = (record?: any) => {
    console.log('record', record);
  };

  const handleConfirmDelete = () => {
    console.log('delete');
    setIsShowModalConfirm(false);
    setIsShowModalNotice(true);
  };

  const renderLevel = (level?: string) => {
    switch (level) {
      case LevelCustomer.NEW_CLIENT:
        return <div>KH m???i</div>;
      case LevelCustomer.GOLD:
        return <div>V??ng</div>;
      case LevelCustomer.SILVER:
        return <div>B???c</div>;
      case LevelCustomer.BRONZE:
        return <div>?????ng</div>;
      default:
        return <div></div>;
    }
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'Ch???n',
      width: 82,
      dataIndex: 'block',
      key: 'block',
      fixed: 'left',
      render: (_, record) => {
        return (
          <Switch
            className="button-switch"
            defaultChecked={
              record.isBlock ? (record.isBlock === 1 ? true : false) : false
            }
            onChange={() => onChange(record)}
          />
        );
      },
    },
    {
      title: 'ID',
      width: 100,
      key: 'id',
      fixed: 'left',
      align: 'center',
      render: (_, record) => <div>{record.id || get(record, 'user.id')}</div>,
    },
    {
      title: 'T??n kh??ch h??ng',
      width: 260,
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
      render: (_, record) => (
        <div className="flex items-center">
          <div className="relative w-[36px] h-[36px] mr-[5px]">
            <Image src={defaultAvatar} layout="fill" />
          </div>
          <div className="text-[#384ADC] font-medium text-medium">
            {record.name || get(record, 'user.name')}
          </div>

        </div>
      ),
    },
    {
      title: 'S??? ??i???n tho???i',
      width: 156,
      dataIndex: 'phoneNumer',
      key: 'phoneNumber',
      align: 'center',
      render: (_, record) => (
        <div>{record.phoneNumber || get(record, 'user.phone')}</div>
      ),
    },
    {
      title: 'C???p ????? KH',
      width: 115,
      dataIndex: 'level',
      key: 'level',
      align: 'center',
      render: (_, record) => renderLevel(record.customerLvName),
    },
    {
      title: 'T???ng s??? l?????ng ????n',
      width: 126,
      dataIndex: 'order',
      key: 'order',
      align: 'center',
      render: (_, record) => <div>{record.orderTotalCount}</div>,
    },
    {
      title: '???? in',
      width: 88,
      dataIndex: 'printed',
      key: 'printed',
      align: 'center',
    },
    {
      title: '???? nh???n',
      width: 100,
      dataIndex: 'received',
      key: 'received',
      align: 'center',
    },
    {
      title: '????n ho??n',
      width: 110,
      dataIndex: 'orderReturn',
      key: 'orderReturn',
      align: 'center',
    },
    {
      title: 'Ho??n 1 ph???n',
      width: 96,
      dataIndex: 'orderReturnAPart',
      key: 'orderReturnAPart',
      align: 'center',
    },
    {
      title: '???? thanh to??n',
      width: 160,
      dataIndex: 'successCost',
      key: 'successCost',
      align: 'center',
      render: (_, record) => <div>{record.successCost || '0 vn??'}</div>,
    },
    {
      title: 'L???n mua cu???i',
      width: 140,
      dataIndex: 'lastBuy',
      key: 'lastBuy',
      align: 'center',
    },
    {
      title: 'Th???i gian c???p nh???t',
      width: 185,
      dataIndex: 'updated',
      key: 'updated',
      align: 'center',
      render: (_, record) => <div>{record.lastUpdated}</div>,
    },
  ];

  const resources: {
    label: string;
    value: string;
  }[] = [
    {
      label: 'Ngu???n KH',
      value: 'Ngu???n KH',
    },
    {
      label: 'App BHV',
      value: 'App BHV',
    },
    {
      label: 'T???i CH',
      value: 'T???i CH',
    },
    {
      label: 'Facebook',
      value: 'Facebook',
    },
    {
      label: 'Livestream Facebook',
      value: 'Livestream Facebook',
    },
    {
      label: 'Livestream App',
      value: 'Livestream App',
    },
    {
      label: 'Zalo',
      value: 'Zalo',
    },
  ];

  const checkboxSettings: {
    label: string;
    value: string;
  }[] = [
    {
      label: 'Ch???n',
      value: 'Ch???n',
    },
    {
      label: 'ID',
      value: 'ID',
    },
    {
      label: 'T??n kh??ch h??ng',
      value: 'T??n kh??ch h??ng',
    },
    {
      label: 'S??? ??i???n tho???i',
      value: 'S??? ??i???n tho???i',
    },
    {
      label: 'C???p ????? KH',
      value: 'C???p ????? KH',
    },
    {
      label: 'T???ng s??? l?????ng ????n',
      value: 'T???ng s??? l?????ng ????n',
    },
    {
      label: '???? in',
      value: '???? in',
    },
    {
      label: '???? nh???n',
      value: '???? nh???n',
    },
    {
      label: '????n ho??n',
      value: '????n ho??n',
    },
    {
      label: 'Ho??n 1 ph???n',
      value: 'Ho??n 1 ph???n',
    },
    {
      label: '???? thanh to??n',
      value: '???? thanh to??n',
    },
    {
      label: 'L???n mua cu???i',
      value: 'L???n mua cu???i',
    },
    {
      label: 'Th???i gian c???p nh???t',
      value: 'Th???i gian c???p nh???t',
    },
  ];

  const data = [
    {
      id: 'KH0001',
      name: 'Nguy???n V??n A',
      phoneNumber: '123123',
      customerLvName: '1',
      orderTotalCount: 1,
      successCost: 1,
      lastUpdateted: '12321312',
    },
    {
      id: 'KH0001',
      name: 'Nguy???n V??n A',
      phoneNumber: '123123',
      customerLvName: '1',
      orderTotalCount: 1,
      successCost: 1,
      lastUpdateted: '12321312',
    },
    {
      id: 'KH0001',
      name: 'Nguy???n V??n A',
      phoneNumber: '123123',
      customerLvName: '1',
      orderTotalCount: 1,
      successCost: 1,
      lastUpdateted: '12321312',
    },
    {
      id: 'KH0001',
      name: 'Nguy???n V??n A',
      phoneNumber: '123123',
      customerLvName: '1',
      orderTotalCount: 1,
      successCost: 1,
      lastUpdateted: '12321312',
    },
    {
      id: 'KH0001',
      name: 'Nguy???n V??n A',
      phoneNumber: '123123',
      customerLvName: '1',
      orderTotalCount: 1,
      successCost: 1,
      lastUpdateted: '12321312',
    },
    {
      id: 'KH0001',
      name: 'Nguy???n V??n A',
      phoneNumber: '123123',
      customerLvName: '1',
      orderTotalCount: 1,
      successCost: 1,
      lastUpdateted: '12321312',
    },
    {
      id: 'KH0001',
      name: 'Nguy???n V??n A',
      phoneNumber: '123123',
      customerLvName: '1',
      orderTotalCount: 1,
      successCost: 1,
      lastUpdateted: '12321312',
    },
    {
      id: 'KH0001',
      name: 'Nguy???n V??n A',
      phoneNumber: '123123',
      customerLvName: '1',
      orderTotalCount: 1,
      successCost: 1,
      lastUpdateted: '12321312',
    },
    {
      id: 'KH0001',
      name: 'Nguy???n V??n A',
      phoneNumber: '123123',
      customerLvName: '1',
      orderTotalCount: 1,
      successCost: 1,
      lastUpdateted: '12321312',
    },
    {
      id: 'KH0001',
      name: 'Nguy???n V??n A',
      phoneNumber: '123123',
      customerLvName: '1',
      orderTotalCount: 1,
      successCost: 1,
      lastUpdateted: '12321312',
    },
    {
      id: 'KH0001',
      name: 'Nguy???n V??n A',
      phoneNumber: '123123',
      customerLvName: '1',
      orderTotalCount: 1,
      successCost: 1,
      lastUpdateted: '12321312',
    },
    {
      id: 'KH0001',
      name: 'Nguy???n V??n A',
      phoneNumber: '123123',
      customerLvName: '1',
      orderTotalCount: 1,
      successCost: 1,
      lastUpdateted: '12321312',
    },
    {
      id: 'KH0001',
      name: 'Nguy???n V??n A',
      phoneNumber: '123123',
      customerLvName: '1',
      orderTotalCount: 1,
      successCost: 1,
      lastUpdateted: '12321312',
    },
    {
      id: 'KH0001',
      name: 'Nguy???n V??n A',
      phoneNumber: '123123',
      customerLvName: '1',
      orderTotalCount: 1,
      successCost: 1,
      lastUpdateted: '12321312',
    },
    {
      id: 'KH0001',
      name: 'Nguy???n V??n A',
      phoneNumber: '123123',
      customerLvName: '1',
      orderTotalCount: 1,
      successCost: 1,
      lastUpdateted: '12321312',
    },
    {
      id: 'KH0001',
      name: 'Nguy???n V??n A',
      phoneNumber: '123123',
      customerLvName: '1',
      orderTotalCount: 1,
      successCost: 1,
      lastUpdateted: '12321312',
    },
    {
      id: 'KH0001',
      name: 'Nguy???n V??n A',
      phoneNumber: '123123',
      customerLvName: '1',
      orderTotalCount: 1,
      successCost: 1,
      lastUpdateted: '12321312',
    },
    {
      id: 'KH0001',
      name: 'Nguy???n V??n A',
      phoneNumber: '123123',
      customerLvName: '1',
      orderTotalCount: 1,
      successCost: 1,
      lastUpdateted: '12321312',
    },
    {
      id: 'KH0001',
      name: 'Nguy???n V??n A',
      phoneNumber: '123123',
      customerLvName: '1',
      orderTotalCount: 1,
      successCost: 1,
      lastUpdateted: '12321312',
    },
    {
      id: 'KH0001',
      name: 'Nguy???n V??n A',
      phoneNumber: '123123',
      customerLvName: '1',
      orderTotalCount: 1,
      successCost: 1,
      lastUpdateted: '12321312',
    },
    {
      id: 'KH0001',
      name: 'Nguy???n V??n A',
      phoneNumber: '123123',
      customerLvName: '1',
      orderTotalCount: 1,
      successCost: 1,
      lastUpdateted: '12321312',
    },
    {
      id: 'KH0001',
      name: 'Nguy???n V??n A',
      phoneNumber: '123123',
      customerLvName: '1',
      orderTotalCount: 1,
      successCost: 1,
      lastUpdateted: '12321312',
    },
    {
      id: 'KH0001',
      name: 'Nguy???n V??n A',
      phoneNumber: '123123',
      customerLvName: '1',
      orderTotalCount: 1,
      successCost: 1,
      lastUpdateted: '12321312',
    },
    {
      id: 'KH0001',
      name: 'Nguy???n V??n A',
      phoneNumber: '123123',
      customerLvName: '1',
      orderTotalCount: 1,
      successCost: 1,
      lastUpdateted: '12321312',
    },
    {
      id: 'KH0001',
      name: 'Nguy???n V??n A',
      phoneNumber: '123123',
      customerLvName: '1',
      orderTotalCount: 1,
      successCost: 1,
      lastUpdateted: '12321312',
    },
    {
      id: 'KH0001',
      name: 'Nguy???n V??n A',
      phoneNumber: '123123',
      customerLvName: '1',
      orderTotalCount: 1,
      successCost: 1,
      lastUpdateted: '12321312',
    },
    {
      id: 'KH0001',
      name: 'Nguy???n V??n A',
      phoneNumber: '123123',
      customerLvName: '1',
      orderTotalCount: 1,
      successCost: 1,
      lastUpdateted: '12321312',
    },
    {
      id: 'KH0001',
      name: 'Nguy???n V??n A',
      phoneNumber: '123123',
      customerLvName: '1',
      orderTotalCount: 1,
      successCost: 1,
      lastUpdateted: '12321312',
    },
    {
      id: 'KH0001',
      name: 'Nguy???n V??n A',
      phoneNumber: '123123',
      customerLvName: '1',
      orderTotalCount: 1,
      successCost: 1,
      lastUpdateted: '12321312',
    },
    {
      id: 'KH0001',
      name: 'Nguy???n V??n A',
      phoneNumber: '123123',
      customerLvName: '1',
      orderTotalCount: 1,
      successCost: 1,
      lastUpdateted: '12321312',
    },
    {
      id: 'KH0001',
      name: 'Nguy???n V??n A',
      phoneNumber: '123123',
      customerLvName: '1',
      orderTotalCount: 1,
      successCost: 1,
      lastUpdateted: '12321312',
    },
    {
      id: 'KH0001',
      name: 'Nguy???n V??n A',
      phoneNumber: '123123',
      customerLvName: '1',
      orderTotalCount: 1,
      successCost: 1,
      lastUpdateted: '12321312',
    },
    {
      id: 'KH0001',
      name: 'Nguy???n V??n A',
      phoneNumber: '123123',
      customerLvName: '1',
      orderTotalCount: 1,
      successCost: 1,
      lastUpdateted: '12321312',
    },
    {
      id: 'KH0001',
      name: 'Nguy???n V??n A',
      phoneNumber: '123123',
      customerLvName: '1',
      orderTotalCount: 1,
      successCost: 1,
      lastUpdateted: '12321312',
    },
    {
      id: 'KH0001',
      name: 'Nguy???n V??n A',
      phoneNumber: '123123',
      customerLvName: '1',
      orderTotalCount: 1,
      successCost: 1,
      lastUpdateted: '12321312',
    },
    {
      id: 'KH0001',
      name: 'Nguy???n V??n A',
      phoneNumber: '123123',
      customerLvName: '1',
      orderTotalCount: 1,
      successCost: 1,
      lastUpdateted: '12321312',
    },
    {
      id: 'KH0001',
      name: 'Nguy???n V??n A',
      phoneNumber: '123123',
      customerLvName: '1',
      orderTotalCount: 1,
      successCost: 1,
      lastUpdateted: '12321312',
    },
    {
      id: 'KH0001',
      name: 'Nguy???n V??n A',
      phoneNumber: '123123',
      customerLvName: '1',
      orderTotalCount: 1,
      successCost: 1,
      lastUpdateted: '12321312',
    },
    {
      id: 'KH0001',
      name: 'Nguy???n V??n A',
      phoneNumber: '123123',
      customerLvName: '1',
      orderTotalCount: 1,
      successCost: 1,
      lastUpdateted: '12321312',
    },
    {
      id: 'KH0001',
      name: 'Nguy???n V??n A',
      phoneNumber: '123123',
      customerLvName: '1',
      orderTotalCount: 1,
      successCost: 1,
      lastUpdateted: '12321312',
    },
    {
      id: 'KH0001',
      name: 'Nguy???n V??n A',
      phoneNumber: '123123',
      customerLvName: '1',
      orderTotalCount: 1,
      successCost: 1,
      lastUpdateted: '12321312',
    },
    {
      id: 'KH0001',
      name: 'Nguy???n V??n A',
      phoneNumber: '123123',
      customerLvName: '1',
      orderTotalCount: 1,
      successCost: 1,
      lastUpdateted: '12321312',
    },
    {
      id: 'KH0001',
      name: 'Nguy???n V??n A',
      phoneNumber: '123123',
      customerLvName: '1',
      orderTotalCount: 1,
      successCost: 1,
      lastUpdateted: '12321312',
    },
    {
      id: 'KH0001',
      name: 'Nguy???n V??n A',
      phoneNumber: '123123',
      customerLvName: '1',
      orderTotalCount: 1,
      successCost: 1,
      lastUpdateted: '12321312',
    },
    {
      id: 'KH0001',
      name: 'Nguy???n V??n A',
      phoneNumber: '123123',
      customerLvName: '1',
      orderTotalCount: 1,
      successCost: 1,
      lastUpdateted: '12321312',
    },
    {
      id: 'KH0001',
      name: 'Nguy???n V??n A',
      phoneNumber: '123123',
      customerLvName: '1',
      orderTotalCount: 1,
      successCost: 1,
      lastUpdateted: '12321312',
    },
    {
      id: 'KH0001',
      name: 'Nguy???n V??n A',
      phoneNumber: '123123',
      customerLvName: '1',
      orderTotalCount: 1,
      successCost: 1,
      lastUpdateted: '12321312',
    },
    {
      id: 'KH0001',
      name: 'Nguy???n V??n A',
      phoneNumber: '123123',
      customerLvName: '1',
      orderTotalCount: 1,
      successCost: 1,
      lastUpdateted: '12321312',
    },
    {
      id: 'KH0001',
      name: 'Nguy???n V??n A',
      phoneNumber: '123123',
      customerLvName: '1',
      orderTotalCount: 1,
      successCost: 1,
      lastUpdateted: '12321312',
    },
    {
      id: 'KH0001',
      name: 'Nguy???n V??n A',
      phoneNumber: '123123',
      customerLvName: '1',
      orderTotalCount: 1,
      successCost: 1,
      lastUpdateted: '12321312',
    },
    {
      id: 'KH0001',
      name: 'Nguy???n V??n A',
      phoneNumber: '123123',
      customerLvName: '1',
      orderTotalCount: 1,
      successCost: 1,
      lastUpdateted: '12321312',
    },
    {
      id: 'KH0001',
      name: 'Nguy???n V??n A',
      phoneNumber: '123123',
      customerLvName: '1',
      orderTotalCount: 1,
      successCost: 1,
      lastUpdateted: '12321312',
    },
    {
      id: 'KH0001',
      name: 'Nguy???n V??n A',
      phoneNumber: '123123',
      customerLvName: '1',
      orderTotalCount: 1,
      successCost: 1,
      lastUpdateted: '12321312',
    },
    {
      id: 'KH0001',
      name: 'Nguy???n V??n A',
      phoneNumber: '123123',
      customerLvName: '1',
      orderTotalCount: 1,
      successCost: 1,
      lastUpdateted: '12321312',
    },
    {
      id: 'KH0001',
      name: 'Nguy???n V??n A',
      phoneNumber: '123123',
      customerLvName: '1',
      orderTotalCount: 1,
      successCost: 1,
      lastUpdateted: '12321312',
    },
    {
      id: 'KH0001',
      name: 'Nguy???n V??n A',
      phoneNumber: '123123',
      customerLvName: '1',
      orderTotalCount: 1,
      successCost: 1,
      lastUpdateted: '12321312',
    },
    {
      id: 'KH0001',
      name: 'Nguy???n V??n A',
      phoneNumber: '123123',
      customerLvName: '1',
      orderTotalCount: 1,
      successCost: 1,
      lastUpdateted: '12321312',
    },
    {
      id: 'KH0001',
      name: 'Nguy???n V??n A',
      phoneNumber: '123123',
      customerLvName: '1',
      orderTotalCount: 1,
      successCost: 1,
      lastUpdateted: '12321312',
    },
    {
      id: 'KH0001',
      name: 'Nguy???n V??n A',
      phoneNumber: '123123',
      customerLvName: '1',
      orderTotalCount: 1,
      successCost: 1,
      lastUpdateted: '12321312',
    },
    {
      id: 'KH0001',
      name: 'Nguy???n V??n A',
      phoneNumber: '123123',
      customerLvName: '1',
      orderTotalCount: 1,
      successCost: 1,
      lastUpdateted: '12321312',
    },
    {
      id: 'KH0001',
      name: 'Nguy???n V??n A',
      phoneNumber: '123123',
      customerLvName: '1',
      orderTotalCount: 1,
      successCost: 1,
      lastUpdateted: '12321312',
    },
    {
      id: 'KH0001',
      name: 'Nguy???n V??n A',
      phoneNumber: '123123',
      customerLvName: '1',
      orderTotalCount: 1,
      successCost: 1,
      lastUpdateted: '12321312',
    },
    {
      id: 'KH0001',
      name: 'Nguy???n V??n A',
      phoneNumber: '123123',
      customerLvName: '1',
      orderTotalCount: 1,
      successCost: 1,
      lastUpdateted: '12321312',
    },
    {
      id: 'KH0001',
      name: 'Nguy???n V??n A',
      phoneNumber: '123123',
      customerLvName: '1',
      orderTotalCount: 1,
      successCost: 1,
      lastUpdateted: '12321312',
    },
    {
      id: 'KH0001',
      name: 'Nguy???n V??n A',
      phoneNumber: '123123',
      customerLvName: '1',
      orderTotalCount: 1,
      successCost: 1,
      lastUpdateted: '12321312',
    },
    {
      id: 'KH0001',
      name: 'Nguy???n V??n A',
      phoneNumber: '123123',
      customerLvName: '1',
      orderTotalCount: 1,
      successCost: 1,
      lastUpdateted: '12321312',
    },
    {
      id: 'KH0001',
      name: 'Nguy???n V??n A',
      phoneNumber: '123123',
      customerLvName: '1',
      orderTotalCount: 1,
      successCost: 1,
      lastUpdateted: '12321312',
    },
    {
      id: 'KH0001',
      name: 'Nguy???n V??n A',
      phoneNumber: '123123',
      customerLvName: '1',
      orderTotalCount: 1,
      successCost: 1,
      lastUpdateted: '12321312',
    },
    {
      id: 'KH0001',
      name: 'Nguy???n V??n A',
      phoneNumber: '123123',
      customerLvName: '1',
      orderTotalCount: 1,
      successCost: 1,
      lastUpdateted: '12321312',
    },
    {
      id: 'KH0001',
      name: 'Nguy???n V??n A',
      phoneNumber: '123123',
      customerLvName: '1',
      orderTotalCount: 1,
      successCost: 1,
      lastUpdateted: '12321312',
    },
    {
      id: 'KH0001',
      name: 'Nguy???n V??n A',
      phoneNumber: '123123',
      customerLvName: '1',
      orderTotalCount: 1,
      successCost: 1,
      lastUpdateted: '12321312',
    },
    {
      id: 'KH0001',
      name: 'Nguy???n V??n A',
      phoneNumber: '123123',
      customerLvName: '1',
      orderTotalCount: 1,
      successCost: 1,
      lastUpdateted: '12321312',
    },
  ];
  const styleHiddenSlideToggle = {
    height: 0,
    opacity: 0.75,
    overflow: 'hidden',
    padding: '0px',
    // display: "none",
    transition: 'all 0.3s linear',
  };

  const styleShowSlideToggle = {
    height: 'fit-content',
    opacity: 1,
    // display: "block",
    padding: '10px',
    border: '1px solod #FFCF90',
  };

  return (
    <div className="w-full list-customer">
      <div className="flex items-center justify-between mb-[12px] flex-wrap ">
        <TitlePage title="Kh??ch h??ng" />
        <div className="flex gap-[8px] flex-wrap">
          <div className="flex items-center">
            <div className="font-medium mr-[12px] text-medium">Ch???n ngu???n</div>
            <Select
              placeholder="Ch???n ngu???n"
              style={{ width: 426 }}
              options={resources}
            />
          </div>
          <Button
            variant="outlined"
            width={113}
            icon={<Icon icon="export" size={24} />}
          >
            Xu???t file
          </Button>
          <Button
            variant="outlined"
            width={101}
            icon={<Icon icon="upload" size={24} />}
          >
            T???i l??n
          </Button>
          <Button
            variant="primary"
            width={151}
            color="white"
            suffixIcon={<Icon icon="add" size={24} />}
            onClick={() => setIsShowModalAddCustomer(true)}
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
      <div className="flex items-center flex-wrap gap-[8px] mb-[12px] justify-between">
        <Input
          width={337}
          prefix={<Icon icon="search" color="#FF970D" size={24} />}
          placeholder="Nh???p ID/ T??n kh??ch h??ng"
        />
        <Button variant="outlined" width={148}>
          Ghim t??m ki???m
        </Button>
        <Input
          width={306}
          prefix={<Icon icon="personalcard" size={24} />}
          placeholder="Nh???p t??n nh??n vi??n"
        />
        <InputRangePicker
          placeholder={['Ng??y b???t ?????u', 'Ng??y k???t th??c']}
          width={306}
          prevIcon={<Icon size={24} icon="calendar" />}
        />
        <Button
          variant="danger-outlined"
          width={113}
          icon={<Icon icon="trash" size={24} color="#EF4444" />}
          onClick={() => setIsShowModalConfirm(true)}
        >
          Xo?? KH
        </Button>
        <Button
          variant="outlined"
          width={69}
          icon={<Icon icon="settings-1" size={24} />}
          onClick={() => setIsShowSettings(!isShowSettings)}
        />
      </div>
      <div
        style={isShowSettings ? styleShowSlideToggle : styleHiddenSlideToggle}
        className="my-[12px] w-full bg-[#FFFFFF] rounded-b"
      >
        <Checkbox options={checkboxSettings} />
      </div>
      <Table
        // loading={loading}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        pagination={{
          defaultPageSize: pagination.pageSize,
          showSizeChanger: true,
          pageSizeOptions: [10, 20, 50, 100],
        }}
        scroll={{ x: 50, y: 500 }}
      />
      <ModalConfirm
        titleBody="Xo?? th??ng tin kh??ch h??ng?"
        content={
          <div className="text-center">
            M???i d??? li???u c???a kh??ch h??ng n??y <br />
            s??? b??? xo?? kh???i h??? th???ng
          </div>
        }
        onOpen={handleConfirmDelete}
        onClose={() => setIsShowModalConfirm(false)}
        isVisible={isShowModalConfirm}
      />
      <ModalNotice
        titleBody="Kh??ng th??? xo?? ng?????i d??ng n??y kh???i h??? th???ng"
        content="B???n kh??ng th??? xo?? kh??ch h??ng c??n c??ng n???"
        onClose={() => setIsShowModalNotice(false)}
        isVisible={isShowModalNotice}
      />
      <ModalAddCustomer
        isVisible={isShowModalAddCustomer}
        onClose={() => setIsShowModalAddCustomer(false)}
        onOpen={() => setIsShowModalAddCustomer(false)}
      />
    </div>
  );
};

export default ListCustomer;
// ReactDOM.render(<ListCustomer />, document.getElementById('root'));
