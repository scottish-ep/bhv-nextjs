import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import TitlePage from '../../components/TitlePage/Titlepage';
import Button from '../../components/Button/Button';
import Icon from '../../components/Icon/Icon';
import Input from '../../components/Input/Input';
import DatePicker from '../../components/DatePicker/DatePicker';
import Select from '../../components/Select/Select';
import { productTypeList } from '../../const/constant';
import Tabs from '../../components/Tabs';
import type { ColumnsType } from 'antd/es/table';
import { Table } from 'antd';
import { StatusColorEnum, StatusEnum, StatusList } from '../../types';
import { ListDebtProps, ListPaymentProps } from './listdebt.type';
import classNames from 'classnames';
import DropdownStatus from '../../components/DropdownStatus';
import { warehouses, statusOptions2, paymentList } from '../../const/constant';
import styles from '../../styles/ListPayment.module.css';
import ModalPayDetail from './Modal/ModalPayDetail';

const ListPayment = () => {
  const [listPayment, setListPayment] = useState<ListPaymentProps[]>([
    ...paymentList,
  ]);
  const [isShowModalPayDetail, setIsShowModalPayDetail] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isShowModalAddPayDetail, setIsShowModalAddPayDetail] = useState(false);
  const [isShowModalRemoveExport, setIsShowModalRemoveExport] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const TabStatus = [
    { name: StatusEnum.PENDING, count: 15 },
    { name: StatusEnum.PAY, count: 9 },
    { name: StatusEnum.RECEIVE, count: 12 },
    { name: StatusEnum.LOCK, count: 12 },
  ];
  const [pagination, setPagination] = useState({
    total: 0,
    pageSize: 10,
  });
  const [loading, setLoading] = useState(false);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const columns: ColumnsType<ListPaymentProps> = [
    {
      title: 'M?? giao d???ch',
      width: 110,
      dataIndex: 'id',
      key: 'ie',
      fixed: 'left',
      align: 'center',
      render: (_, record) => (
        <span className="text-sm text-[#384ADC] font-medium pd-[9px]">
          {record.code}
        </span>
      ),
    },
    {
      title: 'T??n giao d???ch',
      width: 156,
      dataIndex: 'export_name',
      key: 'export_name',
      align: 'left',
      render: (_, record) => (
        <span className="text-sm font-medium text-[#2E2D3D]">
          {record.deal_name}
        </span>
      ),
    },
    {
      title: 'NV giao d???ch / Th???i gian',
      width: 210,
      dataIndex: 'note',
      key: 'note',
      align: 'left',
      render: (_, record) => (
        <div className="flex flex-col justify-left items-left">
          <span className="text-sm font-medium text-[#384ADC]">
            {record.employee}
          </span>
          <span className="text-sm normal text-[#1D1C2D]">{record.date}</span>
        </div>
      ),
    },
    {
      title: 'S??? ti???n',
      width: 115,
      dataIndex: 'quantity',
      key: 'quantity',
      align: 'left',
      render: (_, record) => (
        <span className="text-sm font-medium text-[#384ADC]">
          {record.money}
        </span>
      ),
    },
    {
      title: 'Ph????ng th???c',
      width: 100,
      dataIndex: 'weight',
      key: 'weight',
      align: 'center',
      render: (_, record) => (
        <span className="text-sm font-medium text-[#1D1C2D]">
          {record.method}
        </span>
      ),
    },
    {
      title: 'Ng?????i nh???n / S??T',
      width: 180,
      dataIndex: 'totalMoney',
      key: 'totalMoney',
      align: 'left',
      render: (_, record) => (
        <div className="flex flex-col justify-center">
          <span className="text-sm font-medium text-[#384ADC]">
            {record.receive_name}
          </span>
          <span className="text-sm font-medium text-[#1D1C2D]">
            {record.phone}
          </span>
        </div>
      ),
    },
    {
      title: 'Tr???ng th??i',
      width: 96,
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      fixed: 'right',
      render: (_, record) => (
        <span
          className={`text-sm font-semibold pd-[9px] text-[${
            StatusColorEnum[record.status]
          }]`}
        >
          {StatusList.find((status) => status.value === record.status)?.name}
        </span>
      ),
    },
    {
      title: 'Ghi ch??',
      width: 220,
      dataIndex: 'note',
      key: 'weight',
      align: 'left',
      render: (_, record) => (
        <span className="text-sm font-medium pd-[9px] text-[#1D1C2D]">
          {record.note}
        </span>
      ),
    },
  ];
  return (
    <div className="w-full list-payment">
      <div className="flex items-center justify-between mb-[12px] flex-wrap">
        <TitlePage title="Qu???n l?? thu chi" />
        <div className="flex gap-[8px] flex-wrap">
          <div className="flex items-center">
            <div className="font-medium pd-[9px] mr-[12px] text-sm">
              Ch???n kho
            </div>
            <Select
              placeholder="Ch???n kho"
              style={{ width: 248 }}
              options={warehouses}
              defaultValue={warehouses[0]}
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
            options={statusOptions2}
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
            onClick={() => {
              setIsEdit(true);
              setIsShowModalPayDetail(true);
            }}
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
          placeholder="Nh???p t??n giao d???ch/ m?? giao d???ch / nh??n vi??n / s??? ??i???n tho???i"
        />
        <Input
          width={306}
          prefix={<Icon icon="personalcard" size={24} />}
          placeholder="Nh???p t??n nh??n vi??n"
        />
        <DatePicker width={306} placeholder="Ng??y/th??ng/n??m" />
      </div>
      <Tabs countTotal={999} tabs={TabStatus} />
      <Table
        rowKey={(record) => record.id}
        scroll={{ y: 500 }} 
        onRow={() => {
          return {
            onClick: () => {
              {
                setIsEdit(false);
                setIsShowModalPayDetail(true);
              }
            },
          };
        }}
        loading={loading}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={listPayment}
        pagination={{
          defaultPageSize: pagination.pageSize,
          showSizeChanger: true,
          pageSizeOptions: [6, 20, 50, 100],
        }}
        scroll={{ x: 50 }}
      />
      <div className={classNames('flex items-center', styles.total_wrapper)}>
        <div className={styles.row}>
          T???ng thu:
          <span className="font-medium pd-[9px] text-[#384ADC]">
            1.000.000 ??
          </span>
        </div>
        <div className={styles.row}>
          T???ng chi:
          <span className="font-medium pd-[9px] text-[#EF4444]">
            16.500.000 ??
          </span>
        </div>
      </div>
      <ModalPayDetail
        isEdit={isEdit}
        title="Theem ho?? ????n thu chi"
        isVisible={isShowModalPayDetail}
        onClose={() => setIsShowModalPayDetail(false)}
        onOpen={() => setIsShowModalPayDetail(false)}
      />
    </div>
  );
};

export default ListPayment;
// ReactDOM.render(<ListPayment />, document.getElementById("root"));
