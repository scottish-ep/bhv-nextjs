import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import get from 'lodash/get';
import { format } from 'date-fns';

import {
  wareHouseList,
  statusOptions,
  warehouses,
} from '../../../const/constant';
import { StatusColorEnum, StatusEnum, StatusList } from '../../../types';
import Tabs from '../../../components/Tabs';
import TitlePage from '../../../components/TitlePage/Titlepage';
import Select from '../../../components/Select/Select';
import Button from '../../../components/Button/Button';
import Icon from '../../../components/Icon/Icon';
import Input from '../../../components/Input/Input';
import DatePicker from '../../../components/DateRangePicker/DateRangePicker';
import DropdownStatus from '../../../components/DropdownStatus';
import ModalRemove from '../components/ModalRemove/ModalRemove';
import { IWareHouses } from '../warehouse.type';

const ImportWareHouseList = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [importWareHouses, setImportWareHouses] = useState<IWareHouses[]>([
    ...wareHouseList,
  ]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    total: 0,
    pageSize: 10,
  });
  const [isShowModalRemoveExport, setIsShowModalRemoveExport] = useState(false);

  const TabStatus = [
    { name: StatusEnum.NEW, count: 10 },
    { name: StatusEnum.DELIVERED, count: 12 },
    { name: StatusEnum.CANCEL, count: 12 },
  ];

  useEffect(() => {
    const element = document.getElementById('loading__animation');
    if (element) {
      element.remove();
    }
  }, []);

  // useEffect(() => {
  //   const url = "/api/v1/product/product-list/list";
  //   fetch(url)
  //     .then((res) => res.json())
  //     .then((res: any) => {
  //       console.log(res.result);
  //       const response = res.result;
  //       setPagination({
  //         ...pagination,
  //         total: response.totalPage * pagination.pageSize,
  //       });
  //       const customers = formatCustomers(response.customers);
  //       console.log(customers);
  //       setImportWareHouses(customers);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const columns: ColumnsType<IWareHouses> = [
    {
      title: 'M?? nh???p h??ng',
      width: 150,
      dataIndex: 'id',
      key: 'id',
      fixed: 'left',
      align: 'center',
      render: (_, record) => (
        <span className="text-medium text-[#384ADC] font-semibold">
          {record.id}
        </span>
      ),
    },
    {
      title: 'NV x??? l?? / Th???i gian',
      width: 200,
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => (
        <div className="flex flex-col gap-y-1">
          <span className="text-[#384ADC] font-semibold text-medium">
            {record.name}
          </span>
          <span className="text-[#5F5E6B] font-medium text-medium">
            {record.createdAt
              ? format(record.createdAt, 'HH:mm - dd/MM/yyyy')
              : ''}
          </span>
        </div>
      ),
    },
    {
      title: 'Kho nh???p',
      width: 200,
      dataIndex: 'export_name',
      key: 'export_name',
      align: 'center',
      render: (_, record) => (
        <span className="text-medium font-medium text-[#2E2D3D]">
          {record.export_name}
        </span>
      ),
    },
    {
      title: 'Ghi ch??',
      width: 200,
      dataIndex: 'note',
      key: 'note',
      align: 'center',
      render: (_, record) => (
        <span className="text-medium text-[#4B4B59]">{record.note}</span>
      ),
    },
    {
      title: 'Ngu???n h??ng',
      width: 200,
      dataIndex: 'source',
      key: 'source',
      align: 'center',
      render: (_, record) => (
        <span className="text-medium text-[#4B4B59]">{record.source}</span>
      ),
    },
    {
      title: 'S??? l?????ng',
      width: 100,
      dataIndex: 'quantity',
      key: 'quantity',
      align: 'center',
      render: (_, record) => (
        <span className="text-medium font-medium text-[#1D1C2D]">
          {record.quantity}
        </span>
      ),
    },
    {
      title: 'Tr???ng l?????ng',
      width: 100,
      dataIndex: 'weight',
      key: 'weight',
      align: 'center',
      render: (_, record) => (
        <span className="text-medium font-medium text-[#1D1C2D]">
          {record.weight} kg
        </span>
      ),
    },
    {
      title: 'T???ng ti???n s???n ph???m',
      width: 260,
      dataIndex: 'totalMoney',
      key: 'totalMoney',
      align: 'center',
      render: (_, record) => (
        <span className="text-medium text-[#384ADC] font-medium">
          {record.totalMoney.toLocaleString()} ??
        </span>
      ),
    },
    {
      title: 'Ph?? v???n chuy???n',
      width: 260,
      dataIndex: 'transport_fee',
      key: 'transport_fee',
      align: 'center',
      render: (_, record) => (
        <span className="text-medium text-[#1D1C2D] font-medium">
          {record.transport_fee.toLocaleString()} ??
        </span>
      ),
    },
    {
      title: 'C???p nh???t cu???i',
      width: 185,
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      align: 'center',
      render: (_, record) => (
        <div className="flex flex-col gap-y-1 text-medium text-[#1D1C2D]">
          <span>{format(record.updatedAt, 'HH:mm')}</span>
          <span>{format(record.updatedAt, 'dd/MM/yyyy')}</span>
        </div>
      ),
    },
    {
      title: 'Tr???ng th??i',
      width: 185,
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      fixed: 'right',
      render: (_, record) => (
        <span
          className={`text-medium font-semibold text-[${
            StatusColorEnum[record.status]
          }]`}
        >
          {StatusList.find((status) => status.value === record.status)?.name}
        </span>
      ),
    },
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-[12px] flex-wrap">
        <TitlePage title="Nh???p kho" />
        <div className="flex gap-[8px] flex-wrap">
          <div className="flex items-center">
            <div className="font-medium mr-[12px] text-medium">Ch???n kho</div>
            <Select
              placeholder="Ch???n kho"
              style={{ width: 248 }}
              options={warehouses}
            />
          </div>
          <Button
            variant="outlined"
            width={109}
            icon={<Icon icon="printer" size={24} />}
          >
            In phi???u
          </Button>
          <DropdownStatus
            text="C???p nh???t tr???ng th??i"
            options={statusOptions}
            icon="refresh"
            onRemoveSelected={() => setIsShowModalRemoveExport(true)}
          />
          <Button
            variant="outlined"
            width={109}
            icon={<Icon icon="export" size={24} />}
          >
            Xu???t file
          </Button>
          <Button
            variant="primary"
            width={151}
            color="white"
            suffixIcon={<Icon icon="add" size={24} />}
            onClick={() =>
              (window.location.href = '/warehouse/import-commands/create')
            }
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
          placeholder="Nh???p m?? nh???p kho"
        />
        <Input
          width={306}
          prefix={<Icon icon="personalcard" size={24} />}
          placeholder="Nh???p t??n nh??n vi??n"
        />
        <DatePicker width={306} />
      </div>
      <Tabs countTotal={999} tabs={TabStatus} />
      <Table
        rowKey={(record) => record.id}
        onRow={() => {
          return {
            onClick: () => {
              window.location.href = '/warehouse/import-commands/update/1';
            },
          };
        }}
        loading={loading}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={importWareHouses}
        pagination={{
          defaultPageSize: pagination.pageSize,
          showSizeChanger: true,
          pageSizeOptions: [10, 20, 50, 100],
        }}
        scroll={{ x: 50 }}
      />

      <ModalRemove
        isVisible={isShowModalRemoveExport}
        onClose={() => setIsShowModalRemoveExport(false)}
        onOpen={() => setIsShowModalRemoveExport(false)}
        titleBody="Xo?? phi???u nh???p kho?"
        content="Th??ng tin c???a phi???u nh???p kho s??? kh??ng c??n n???a."
      />
    </div>
  );
};

ReactDOM.render(<ImportWareHouseList />, document.getElementById('root'));
