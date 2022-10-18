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

const TransferWareHouseList = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [transferWareHouses, setTransferWareHouses] = useState<IWareHouses[]>([
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
    { name: StatusEnum.PROCESSING, count: 12 },
    { name: StatusEnum.COMPLETED, count: 12 },
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
  //       setTransferWareHouses(customers);
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
      title: 'Mã chuyển kho',
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
      title: 'NV xử lý / Thời gian',
      width: 200,
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => (
        <div className="flex flex-col gap-y-1">
          <span className="text-medium text-[#384ADC] font-semibold">
            {record.name}
          </span>
          <span className="text-medium text-[#5F5E6B] font-medium">
            {record.createdAt
              ? format(record.createdAt, 'HH:mm - dd/MM/yyyy')
              : ''}
          </span>
        </div>
      ),
    },
    {
      title: 'Kho chuyển',
      width: 200,
      dataIndex: 'transfer_name',
      key: 'transfer_name',
      align: 'center',
      render: (_, record) => (
        <span className="text-medium font-medium text-[#2E2D3D]">
          {record.transfer_name}
        </span>
      ),
    },
    {
      title: 'Kho nhập',
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
      title: 'Ghi chú',
      width: 200,
      dataIndex: 'note',
      key: 'note',
      align: 'center',
      render: (_, record) => (
        <span className="text-medium text-[#4B4B59]">{record.note}</span>
      ),
    },
    {
      title: 'Tổng số SP chuyển kho',
      width: 150,
      dataIndex: 'total_transfer_product',
      key: 'total_transfer_product',
      align: 'center',
      render: (_, record) => (
        <span className="text-medium font-medium text-[#384ADC]">
          {record.total_transfer_product}
        </span>
      ),
    },
    {
      title: 'Tổng số lượng chuyển',
      width: 150,
      dataIndex: 'total_transfer',
      key: 'total_transfer',
      align: 'center',
      render: (_, record) => (
        <span className="text-medium font-medium text-[#1D1C2D]">
          {record.total_transfer}
        </span>
      ),
    },
    {
      title: 'Tổng trọng lượng chuyển',
      width: 150,
      dataIndex: 'total_transfer_weight',
      key: 'total_transfer_weight',
      align: 'center',
      render: (_, record) => (
        <span className="text-medium font-medium text-[#1D1C2D]">
          {record.total_transfer_weight} kg
        </span>
      ),
    },
    {
      title: 'Cập nhật cuối',
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
      title: 'Trạng thái',
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
        <TitlePage title="Chuyển kho" />
        <div className="flex gap-[8px] flex-wrap">
          <div className="flex items-center">
            <div className="font-medium mr-[12px] text-medium">Chọn kho</div>
            <Select
              placeholder="Chọn kho"
              style={{ width: 248 }}
              options={warehouses}
            />
          </div>
          <Button
            variant="outlined"
            width={109}
            icon={<Icon icon="printer" size={24} />}
          >
            In phiếu
          </Button>
          <DropdownStatus
            text="Cập nhật trạng thái"
            options={statusOptions}
            icon="refresh"
            onRemoveSelected={() => setIsShowModalRemoveExport(true)}
          />
          <Button
            variant="outlined"
            width={109}
            icon={<Icon icon="export" size={24} />}
          >
            Xuất file
          </Button>
          <Button
            variant="primary"
            width={151}
            color="white"
            suffixIcon={<Icon icon="add" size={24} />}
            onClick={() =>
              (window.location.href = '/warehouse/transfer-commands/create')
            }
          >
            Thêm mới
          </Button>
          <Button
            variant="no-outlined"
            width={62}
            color="white"
            icon={<Icon icon="question" size={16} />}
          >
            Hỗ trợ
          </Button>
        </div>
      </div>
      <div className="flex items-center flex-wrap gap-[8px] mb-[12px]">
        <Input
          className="flex-1"
          prefix={<Icon icon="search" color="#FF970D" size={24} />}
          placeholder="Nhập mã chuyển kho"
        />
        <Input
          width={306}
          prefix={<Icon icon="personalcard" size={24} />}
          placeholder="Nhập tên nhân viên"
        />
        <DatePicker width={306} />
      </div>
      <Tabs countTotal={999} tabs={TabStatus} />
      <Table
        rowKey={(record) => record.id}
        onRow={() => {
          return {
            onClick: () => {
              window.location.href = '/warehouse/transfer-commands/update/1';
            },
          };
        }}
        loading={loading}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={transferWareHouses}
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
        titleBody="Xoá phiếu chuyển kho?"
        content="Thông tin của phiếu chuyển kho sẽ không còn nữa."
      />
    </div>
  );
};

ReactDOM.render(<TransferWareHouseList />, document.getElementById('root'));
