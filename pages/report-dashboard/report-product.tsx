import { Checkbox } from "antd";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import Button from "../../components/Button/Button";
import DatePicker from "../../components/DatePicker/DatePicker";
import Icon from "../../components/Icon/Icon";
import Select from "../../components/Select/Select";
import TitlePage from "../../components/TitlePage/Titlepage";
import Break from "../../components/Break/Break";
import { listDayCompare } from "../../const/constant";
import classNames from "classnames";
import { Switch, Table } from "antd";
import { productTypeList } from "../../const/constant";
import type { ColumnsType } from "antd/es/table";
import get from "lodash/get";

import styles from "../../styles/Report.module.css";
import ReportPieChart from "./ReportChart/PieChart/ReportPieChart";
import LineChart from "./ReportChart/LineChart/ReportLineChart";
import { IsProduct } from "../products/product.type";

const ReportProduct = () => {
  const [isCompare, setIsCompare] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    total: 0,
    pageSize: 20,
  });

  const data = [
    { name: "Tại quầy", value: 653326000 },
    { name: "Onine", value: 225549000 },
    { name: "Trên app", value: 136500000 },
  ];

  const warehouseData = [
    {
      label: "Tổng kho Linh Dương",
      value: "Tổng kho Linh Dương",
      totalPrice: "21.000.000 đ",
    },
    {
      label: "Cửa hàng LD Mart",
      value: "Cửa hàng LD Mart",
      totalPrice: "21.000.000 đ",
    },
    {
      label: "Siêu thị tiện ích LD",
      value: "Siêu thị tiện ích LD",
      totalPrice: "21.000.000 đ",
    },
  ];

  const dataLineChart = [
    {
      name: "28",
      a: 700,
      b: 600,
      c: 500,
    },
    {
      name: "29",
      a: 1000,
      b: 600,
      c: 500,
    },
    {
      name: "28",
      a: 900,
      b: 600,
      c: 400,
    },
    {
      name: "30",
      a: 700,
      b: 600,
      c: 500,
    },
    {
      name: "01",
      a: 300,
      b: 500,
      c: 500,
    },
    {
      name: "02",
      a: 700,
      b: 900,
      c: 500,
    },
    {
      name: "03",
      a: 1000,
      b: 600,
      c: 500,
    },
  ];

  const statusOrder = [
    {
      label: "Đã nhận",
      value: "Đã nhận",
    },
    {
      label: "Đã huỷ",
      value: "Đã huỷ",
    },
    {
      label: "Đã hoàn",
      value: "Đã hoàn",
    },
  ];

  const columns: ColumnsType<IsProduct> = [
    {
      title: "#",
      width: 50,
      key: "id",
      align: "center",
      render: (_, record, index) => {
        return <div className="font-medium w-full h-full">{index + 1}</div>;
      },
    },
    {
      title: "Mã sản phẩm",
      width: 133,
      key: "id",
      align: "center",
      render: (_, record) => {
        return <div className="font-medium">{record.id}</div>;
      },
    },
    {
      title: "Tên sản phẩm",
      width: 434,
      key: "name",
      align: "left",
      render: (_, record) => {
        return <div className="font-medium">{record.name}</div>;
      },
    },
    {
      title: "Số lượng bán ra",
      width: 240,
      key: "total",
      align: "center",
      render: (_, record) => {
        return <div className="font-medium">{record.total}</div>;
      },
    },
    {
      title: "Doanh thu",
      width: 434,
      key: "totalPrice",
      align: "center",
      render: (_, record) => {
        return <div className="font-medium">{record.totalPrice}</div>;
      },
    },
  ];

  const dataTable = Array(12).fill({
    id: "BHV0123",
    name: "Áo sơ mi nam công sở",
    image: "",
    total: "245",
    totalPrice: "126.000.000 đ",
  });

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-[12px] flex-wrap">
        <TitlePage title="Báo cáo doanh thu" />
        <div className="flex items-center gap-[24px]">
          <Button
            variant="outlined"
            width={109}
            icon={<Icon icon="export" size={24} />}
          >
            Xuất file
          </Button>
          <div className="flex items-center">
            <div className="text-medium font-semibold mr-[8px]">
              Hiển thị theo thời gian
            </div>
            <DatePicker width={306} />
          </div>
          <div className="flex items-center gap-[8px]">
            <Checkbox onChange={() => setIsCompare(!isCompare)}>
              So sánh với
            </Checkbox>
            <Select
              defaultValue={listDayCompare[0]}
              style={{ width: 235 }}
              options={listDayCompare}
              disabled={!isCompare}
            />
          </div>
        </div>
      </div>
      <div className="flex gap-[12px] mb-[12px]">
        <div className="w-1/2 gap-[12px] flex flex-col">
          <div className={classNames(styles.div_container)}>
            <div className={styles.row}>
              <div className="text-big text-[#384ADC] font-semibold">
                Tổng số lượng sản phẩm đã bán
              </div>
              <div className="text-2xl font-bold text-[#384ADC]">20.560</div>
            </div>
            <div className={styles.row}>
              <div className="font-semibold">Lợi nhuận</div>
              <div className="text-[#10B981] text-2xl font-bold">
                865.254.000 đ
              </div>
            </div>
            <Break />
            <div className={classNames(styles.row, "mt-[16px]")}>
              <div className="font-semibold">Tổng sản phẩm nhập</div>
              <div className="text-big font-bold">1.426.210</div>
            </div>
            <div className={styles.row}>
              <div className="font-semibold">Giá nhập</div>
              <div className="text-big font-bold">154.203.000 đ</div>
            </div>
          </div>
        </div>
        <ReportPieChart
          title="Số lượng sản phẩm đã bán theo kênh bán"
          data={data}
        />
      </div>
      <LineChart
        statusOrder={statusOrder}
        title="Số lượng sản phẩm bán ra theo kho"
        dataLineChart={dataLineChart}
        data={warehouseData}
        unit="sản phẩm"
      />
      <div className={classNames(styles.div_container, "mt-[12px]")}>
        <div className="flex items-center justify-between mb-[24px] flex-wrap">
          <div className="text-[#384ADC] font-semibold text-big">
            Top sản phẩm bán chạy
          </div>
          <div className="flex items-center gap-[24px]">
            <div className="flex items-center">
              <div className="mr-[12px]">Chọn kho</div>
              <Select options={statusOrder} style={{ width: 248 }} />
            </div>
            <span className="cursor-pointer">
              <Icon icon="export" />
            </span>
          </div>
        </div>
        <Table
          loading={loading}
          className="table-layout1"
          columns={columns}
          dataSource={dataTable}
          pagination={{
            defaultPageSize: pagination.pageSize,
            showSizeChanger: true,
            pageSizeOptions: [10, 20, 50, 100],
          }}
        />
      </div>
    </div>
  );
};

ReactDOM.render(<ReportProduct />, document.getElementById("root"));
