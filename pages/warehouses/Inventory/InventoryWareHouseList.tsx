import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import get from 'lodash/get';

import {
  warehouses,
  productList,
  productTypeList,
} from '../../../const/constant';
import { StatusColorEnum, StatusList } from '../../../types';
import TitlePage from '../../../components/TitlePage/Titlepage';
import Select from '../../../components/Select/Select';
import Button from '../../../components/Button/Button';
import Icon from '../../../components/Icon/Icon';
import Input from '../../../components/Input/Input';
import DatePicker from '../../../components/DateRangePicker/DateRangePicker';
import { IInventoryWareHouses, IWareHouses } from '../warehouse.type';

const InventoryWareHouseList = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [inventoryWareHouses, setInventoryWareHouses] = useState<
    IInventoryWareHouses[]
  >([...productList]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    total: 0,
    pageSize: 10,
  });

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
  //       setInventoryWareHouses(customers);
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

  const columns: ColumnsType<IInventoryWareHouses> = [
    {
      title: 'M?? s???n ph???m',
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
      title: 'M?? SKU',
      width: 150,
      dataIndex: 'sku',
      key: 'sku',
      align: 'center',
      render: (_, record) => (
        <span className="text-medium text-[#384ADC] font-semibold">
          {record.sku}
        </span>
      ),
    },
    {
      title: 'T??n s???n ph???m',
      width: 250,
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      render: (_, record) => (
        <span className="text-medium font-medium text-[#2E2D3D]">
          {record.name}
        </span>
      ),
    },
    {
      title: 'Danh m???c',
      width: 150,
      dataIndex: 'category_id',
      key: 'category_id',
      align: 'center',
      render: (_, record) => (
        <span className="text-medium font-medium text-[#2E2D3D]">
          {record.category_id}
        </span>
      ),
    },
    {
      title: 'Gi?? nh???p',
      width: 150,
      dataIndex: 'import_price',
      key: 'import_price',
      align: 'center',
      render: (_, record) => (
        <span className="text-medium font-medium text-[#2E2D3D]">
          {record.import_price}
        </span>
      ),
    },
    {
      title: 'Gi?? b??n',
      width: 150,
      dataIndex: 'sale_price',
      key: 'sale_price',
      align: 'center',
      render: (_, record) => (
        <span className="text-medium font-medium text-[#2E2D3D]">
          {record.sale_price}
        </span>
      ),
    },
    {
      title: 'SL t???n kho',
      width: 150,
      dataIndex: 'quantity',
      key: 'quantity',
      align: 'center',
      render: (_, record) => (
        <span className="text-medium font-medium text-[#2E2D3D]">
          {record.quantity}
        </span>
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
        <TitlePage title="Qu???n l?? t???n kho" />
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
            width={136}
            icon={<Icon icon="transfer" size={24} />}
          >
            Chuy???n kho
          </Button>
          <Button
            variant="outlined"
            width={116}
            icon={<Icon icon="export-2" size={24} />}
          >
            Xu???t kho
          </Button>
          <Button
            variant="outlined"
            width={116}
            icon={<Icon icon="export-2" size={24} />}
          >
            Nh???p kho
          </Button>
          <Button
            variant="outlined"
            width={116}
            icon={<Icon icon="export" size={24} />}
          >
            Xu???t file
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
          placeholder="Nh???p m?? s???n ph???m / t??n s???n ph???m"
        />
        <Select
          prefix={<Icon icon="category" size={24} color="#5F5E6B" />}
          placeholder="T??m theo danh m???c s???n ph???m"
          style={{ width: 306 }}
          options={productTypeList}
        />
        <Button
          variant="outlined"
          width={129}
          icon={<Icon icon="barcode-2" size={24} />}
        >
          In barcode
        </Button>
        <Button
          variant="outlined"
          width={129}
          icon={<Icon icon="scan" size={24} />}
        >
          In QR code
        </Button>
      </div>
      <Table
        rowKey={(record) => record.id}
        loading={loading}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={inventoryWareHouses}
        pagination={{
          defaultPageSize: pagination.pageSize,
          showSizeChanger: true,
          pageSizeOptions: [10, 20, 50, 100],
        }}
        scroll={{ x: 50 }}
      />
    </div>
  );
};

ReactDOM.render(<InventoryWareHouseList />, document.getElementById('root'));
