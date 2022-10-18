import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Switch, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { format } from 'date-fns';

import { warehouses, comboList } from '../../../const/constant';
import TitlePage from '../../../components/TitlePage/Titlepage';
import Select from '../../../components/Select/Select';
import Button from '../../../components/Button/Button';
import Icon from '../../../components/Icon/Icon';
import Input from '../../../components/Input/Input';
import DatePicker from '../../../components/DateRangePicker/DateRangePicker';
import { ICombo } from '../promotion.type';
import ModalRemove from '../../../components/ModalRemove/ModalRemove';
import ModalAddCombo from './ModalAddCombo';

const ComboList = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [combos, setCombos] = useState<ICombo[]>([...comboList]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    total: 0,
    pageSize: 10,
  });
  const [isShowModalRemoveCombo, setIsShowModalRemoveCombo] = useState(false);
  const [isShowModalAddEditCombo, setIsShowModalAddEditCombo] = useState(true);
  const [rowSelected, setRowSelected] = useState<ICombo>();

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

  const columns: ColumnsType<ICombo> = [
    {
      title: 'Áp dụng',
      width: 100,
      key: 'apply',
      align: 'center',
      render: (_, record) => {
        return (
          <Switch
            className="button-switch"
            defaultChecked={record.apply}
            onChange={() => console.log('check')}
          />
        );
      },
    },
    {
      title: 'Mã combo',
      width: 150,
      dataIndex: 'id',
      key: 'ie',
      align: 'center',
      render: (_, record) => (
        <span className="text-medium text-[#384ADC] font-semibold">
          {record.id}
        </span>
      ),
    },
    {
      title: 'Tên combo',
      width: 200,
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => (
        <span className="text-medium text-[#2E2D3d] font-medium">
          {record.name || '--'}
        </span>
      ),
    },
    {
      title: 'Kênh bán',
      width: 100,
      dataIndex: 'channel',
      key: 'channel',
      align: 'center',
      render: (_, record) => (
        <span className="text-medium font-medium text-[#1D1C2D]">
          {record.channel || '--'}
        </span>
      ),
    },
    {
      title: 'Giá combo',
      width: 100,
      dataIndex: 'price',
      key: 'price',
      align: 'center',
      render: (_, record) => (
        <span className="text-medium text-[#4B4B59]">
          {record.price ? record.price.toLocaleString() : '--'} đ
        </span>
      ),
    },
    {
      title: 'Số sản phẩm',
      width: 100,
      dataIndex: 'quantity',
      key: 'quantity',
      align: 'center',
      render: (_, record) => (
        <span className="text-medium font-medium text-[#1D1C2D]">
          {record.quantity || '--s'}
        </span>
      ),
    },
    {
      title: 'Thời gian áp dụng',
      width: 150,
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center',
      render: (_, record) => (
        <span className="text-medium font-medium text-[#1D1C2D]">{`${format(
          record.createdAt,
          'dd/MM/yy'
        )} - ${format(record.updatedAt, 'dd/MM/yy')}`}</span>
      ),
    },
    {
      title: 'Cập nhật cuối',
      width: 150,
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      align: 'center',
      render: (_, record) => (
        <span className="text-medium text-[#1D1C2D]">
          {format(record.updatedAt, 'dd/MM/yyyy - HH:mm')}
        </span>
      ),
    },
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-[12px] flex-wrap">
        <TitlePage title="Quản lý combo" />
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
            icon={<Icon icon="export" size={24} />}
          >
            Xuất file
          </Button>
          <Button
            variant="primary"
            width={151}
            color="white"
            suffixIcon={<Icon icon="add" size={24} />}
            onClick={() => setIsShowModalAddEditCombo(true)}
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
          placeholder="Tìm mã combo / tên combo"
        />
        <DatePicker width={306} />
        <Button
          variant="danger-outlined"
          width={137}
          icon={<Icon icon="trash" size={24} />}
          onClick={() => setIsShowModalRemoveCombo(true)}
          disabled={selectedRowKeys.length === 0}
        >
          Xoá combo
        </Button>
      </div>
      <Table
        rowKey={(record) => record.id}
        onRow={(record) => {
          return {
            onClick: () => {
              setRowSelected(record);
              setIsShowModalAddEditCombo(true);
            },
          };
        }}
        loading={loading}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={combos}
        pagination={{
          defaultPageSize: pagination.pageSize,
          showSizeChanger: true,
          pageSizeOptions: [10, 20, 50, 100],
        }}
        scroll={{ x: 50 }}
      />

      <ModalRemove
        isVisible={isShowModalRemoveCombo}
        onClose={() => setIsShowModalRemoveCombo(false)}
        onOpen={() => {
          setIsShowModalRemoveCombo(false);
          setIsShowModalAddEditCombo(false);
        }}
        titleBody="Xoá combo này?"
        content="Thông tin của combo sẽ không còn nữa."
      />
      <ModalAddCombo
        rowSelected={rowSelected}
        isVisible={isShowModalAddEditCombo}
        onClose={() => {
          setRowSelected(undefined);
          setIsShowModalAddEditCombo(false);
        }}
        title={`${rowSelected ? 'Chi tiết' : 'Tạo mới'} combo`}
        onRemove={() => setIsShowModalRemoveCombo(true)}
      />
    </div>
  );
};

ReactDOM.render(<ComboList />, document.getElementById('root'));
