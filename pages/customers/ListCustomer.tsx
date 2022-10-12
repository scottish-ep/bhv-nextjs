import React, { useEffect, useState } from "react";
import { ReactNode } from "react";
import ReactDOM from "react-dom";

import { Table, Switch } from "antd";
import type { ColumnsType } from "antd/es/table";
import get from "lodash/get";
import TitlePage from "../../components/TitlePage/Titlepage";

import { formatCustomers } from "../../utils/utils";
import { LevelCustomer } from "../../enums/enums";
import Select from "../../components/Select/Select";
import Button from "../../components/Button/Button";
import Icon from "../../components/Icon/Icon";
import Input from "../../components/Input/Input";
import InputRangePicker from "../../components/DateRangePicker/DateRangePicker";
import ModalConfirm from "../../components/Modal/ModalConfirm/ModalConfirm";
import ModalNotice from "../../components/Modal/ModalNotice/ModalConfirm";
import ModalAddCustomer from "./ModalAddCustomer/ModalAddCustomer";
import Checkbox from "../../components/CheckboxList/CheckboxList";

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
  const [isShowSettings, setIsShowSettings] = useState(false);

  useEffect(() => {
    const element = document.getElementById("loading__animation");
    if (element) {
      element.remove();
    }
  }, []);

  useEffect(() => {
    const url = "/api/v1/customer/customer-list/list";
    console.log("url", url);
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
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const onChange = (record?: any) => {
    console.log("record", record);
  };

  const handleConfirmDelete = () => {
    console.log("delete");
    setIsShowModalConfirm(false);
    setIsShowModalNotice(true);
  };

  const renderLevel = (level?: string) => {
    switch (level) {
      case LevelCustomer.NEW_CLIENT:
        return <div>KH mới</div>;
      case LevelCustomer.GOLD:
        return <div>Vàng</div>;
      case LevelCustomer.SILVER:
        return <div>Bạc</div>;
      case LevelCustomer.BRONZE:
        return <div>Đồng</div>;
      default:
        return <div></div>;
    }
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Chặn",
      width: 82,
      dataIndex: "block",
      key: "block",
      fixed: "left",
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
      title: "ID",
      width: 100,
      key: "id",
      fixed: "left",
      align: "center",
      render: (_, record) => <div>{record.id || get(record, "user.id")}</div>,
    },
    {
      title: "Tên khách hàng",
      width: 260,
      dataIndex: "name",
      key: "name",
      fixed: "left",
      render: (_, record) => (
        <div>{record.name || get(record, "user.name")}</div>
      ),
    },
    {
      title: "Số điện thoại",
      width: 156,
      dataIndex: "phoneNumer",
      key: "phoneNumber",
      align: "center",
      render: (_, record) => (
        <div>{record.phoneNumber || get(record, "user.phone")}</div>
      ),
    },
    {
      title: "Cấp độ KH",
      width: 115,
      dataIndex: "level",
      key: "level",
      align: "center",
      render: (_, record) => renderLevel(record.customerLvName),
    },
    {
      title: "Tổng số lượng đơn",
      width: 126,
      dataIndex: "order",
      key: "order",
      align: "center",
      render: (_, record) => <div>{record.orderTotalCount}</div>,
    },
    {
      title: "Đã in",
      width: 88,
      dataIndex: "printed",
      key: "printed",
      align: "center",
    },
    {
      title: "Đã nhận",
      width: 100,
      dataIndex: "received",
      key: "received",
      align: "center",
    },
    {
      title: "Đơn hoàn",
      width: 110,
      dataIndex: "orderReturn",
      key: "orderReturn",
      align: "center",
    },
    {
      title: "Hoàn 1 phần",
      width: 96,
      dataIndex: "orderReturnAPart",
      key: "orderReturnAPart",
      align: "center",
    },
    {
      title: "Đã thanh toán",
      width: 160,
      dataIndex: "successCost",
      key: "successCost",
      align: "center",
      render: (_, record) => <div>{record.successCost || "0 vnđ"}</div>,
    },
    {
      title: "Lần mua cuối",
      width: 140,
      dataIndex: "lastBuy",
      key: "lastBuy",
      align: "center",
    },
    {
      title: "Thời gian cập nhật",
      width: 185,
      dataIndex: "updated",
      key: "updated",
      align: "center",
      render: (_, record) => <div>{record.lastUpdated}</div>,
    },
  ];

  const resources: {
    label: string;
    value: string;
  }[] = [
    {
      label: "Nguồn KH",
      value: "Nguồn KH",
    },
    {
      label: "App BHV",
      value: "App BHV",
    },
    {
      label: "Tại CH",
      value: "Tại CH",
    },
    {
      label: "Facebook",
      value: "Facebook",
    },
    {
      label: "Livestream Facebook",
      value: "Livestream Facebook",
    },
    {
      label: "Livestream App",
      value: "Livestream App",
    },
    {
      label: "Zalo",
      value: "Zalo",
    },
  ];

  const checkboxSettings: {
    label: string;
    value: string;
  }[] = [
    {
      label: "Chặn",
      value: "Chặn",
    },
    {
      label: "ID",
      value: "ID",
    },
    {
      label: "Tên khách hàng",
      value: "Tên khách hàng",
    },
    {
      label: "Số điện thoại",
      value: "Số điện thoại",
    },
    {
      label: "Cấp độ KH",
      value: "Cấp độ KH",
    },
    {
      label: "Tổng số lượng đơn",
      value: "Tổng số lượng đơn",
    },
    {
      label: "Đã in",
      value: "Đã in",
    },
    {
      label: "Đã nhận",
      value: "Đã nhận",
    },
    {
      label: "Đơn hoàn",
      value: "Đơn hoàn",
    },
    {
      label: "Hoàn 1 phần",
      value: "Hoàn 1 phần",
    },
    {
      label: "Đã thanh toán",
      value: "Đã thanh toán",
    },
    {
      label: "Lần mua cuối",
      value: "Lần mua cuối",
    },
    {
      label: "Thời gian cập nhật",
      value: "Thời gian cập nhật",
    },
  ];

  const styleHiddenSlideToggle = {
    height: 0,
    opacity: 0.75,
    overflow: "hidden",
    padding: "0px",
    // display: "none",
    transition: "all 0.3s linear",
  };

  const styleShowSlideToggle = {
    height: "fit-content",
    opacity: 1,
    // display: "block",
    padding: "10px",
    border: "1px solod #FFCF90",
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-[12px] flex-wrap">
        <TitlePage title="Khách hàng" />
        <div className="flex gap-[8px] flex-wrap">
          <div className="flex items-center">
            <div className="font-medium mr-[12px] text-medium">Chọn nguồn</div>
            <Select
              placeholder="Chọn nguồn"
              style={{ width: 426 }}
              options={resources}
            />
          </div>
          <Button
            variant="outlined"
            width={113}
            icon={<Icon icon="export" size={24} />}
          >
            Xuất file
          </Button>
          <Button
            variant="outlined"
            width={101}
            icon={<Icon icon="upload" size={24} />}
          >
            Tải lên
          </Button>
          <Button
            variant="primary"
            width={151}
            color="white"
            suffixIcon={<Icon icon="add" size={24} />}
            onClick={() => setIsShowModalAddCustomer(true)}
          >
            Thêm mới
          </Button>
          <Button
            variant="no-outlined"
            width={62}
            color="white"
            icon={<Icon icon="upload" size={16} />}
          >
            Hỗ trợ
          </Button>
        </div>
      </div>
      <div className="flex items-center flex-wrap gap-[8px] mb-[12px]">
        <Input
          width={337}
          prefix={<Icon icon="search" color="#FF970D" size={24} />}
          placeholder="Nhập ID/ Tên khách hàng"
        />
        <Button variant="outlined" width={148}>
          Ghim tìm kiếm
        </Button>
        <Input
          width={306}
          prefix={<Icon icon="personalcard" size={24} />}
          placeholder="Nhập tên nhân viên"
        />
        <InputRangePicker
          placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
          width={306}
          prevIcon={<Icon size={24} icon="calendar" />}
        />
        <Button
          variant="danger-outlined"
          width={113}
          icon={<Icon icon="trash" size={24} color="#EF4444" />}
          onClick={() => setIsShowModalConfirm(true)}
        >
          Xoá KH
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
        loading={loading}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={customers}
        pagination={{
          defaultPageSize: pagination.pageSize,
          showSizeChanger: true,
          pageSizeOptions: [10, 20, 50, 100],
        }}
        scroll={{ x: 50, y: 500 }}
      />
      <ModalConfirm
        titleBody="Xoá thông tin khách hàng?"
        content={
          <div className="text-center">
            Mọi dữ liệu của khách hàng này <br />
            sẽ bị xoá khỏi hệ thống
          </div>
        }
        onOpen={handleConfirmDelete}
        onClose={() => setIsShowModalConfirm(false)}
        isVisible={isShowModalConfirm}
      />
      <ModalNotice
        titleBody="Không thể xoá người dùng này khỏi hệ thống"
        content="Bạn không thể xoá khách hàng còn công nợ"
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

ReactDOM.render(<ListCustomer />, document.getElementById("root"));
