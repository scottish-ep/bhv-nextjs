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
import { IsProduct } from "../products/product.type";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { IStaff } from "./report.type";

const ReportStaff = () => {
  const [isCompare, setIsCompare] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    total: 0,
    pageSize: 10,
  });

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

  const columns: ColumnsType<IStaff> = [
    {
      title: "Mã nhân viên",
      width: 133,
      key: "id",
      align: "center",
      render: (_, record) => {
        return <div className="font-medium">{record.id}</div>;
      },
    },
    {
      title: "Tên nhân viên",
      width: 339,
      key: "name",
      align: "left",
      render: (_, record) => {
        return (
          <div className="font-semibold text-[#384ADC]">{record.name}</div>
        );
      },
    },
    {
      title: "Số lượng đơn hàng",
      width: 240,
      key: "numberOrders",
      align: "center",
      sorter: (a, b) => a.numberOrders - b.numberOrders,
      render: (_, record) => {
        return <div className="font-medium">{record.numberOrders}</div>;
      },
    },
    {
      title: "Số lượng SP bán ra",
      width: 240,
      key: "orderSales",
      sorter: (a, b) => a.orderSales - b.orderSales,
      align: "center",
      render: (_, record) => {
        return <div className="font-medium">{record.orderSales}</div>;
      },
    },
    {
      title: "Doanh thu",
      width: 240,
      key: "totalIncome",
      sorter: (a, b) => a.totalIncome - b.totalIncome,
      align: "center",
      render: (_, record) => {
        return <div className="font-medium">{record.totalIncome}d</div>;
      },
    },
  ];

  const dataTable = Array(20).fill({
    id: "BHV0123",
    name: "Yến Nhi",
    image: "",
    numberOrders: 245,
    orderSales: 25.621,
    totalIncome: 126000000,
  });

  const data = [
    {
      name: "Nguyễn Văn AA",
      order: 210,
      totalMoney: "547.000.000 đ",
    },
    {
      name: "Tran Huyen",
      order: 400,
      totalMoney: "547.000.000 đ",
    },
    {
      name: "Đặng Văn C",
      order: 700,
      totalMoney: "547.000.000 đ",
    },
    {
      name: "Mai Linh",
      order: 100,
      totalMoney: "547.000.000 đ",
    },
    {
      name: "Phương An",
      order: 600,
      totalMoney: "547.000.000 đ",
    },
    {
      name: "Trần Quỳnh Trang",
      order: 450,
      totalMoney: "547.000.000 đ",
    },
    {
      name: "Mỹ Duyên",
      order: 900,
      totalMoney: "547.000.000 đ",
    },
    {
      name: "Quỳnh Như Lê",
      order: 850,
      totalMoney: "547.000.000 đ",
    },
    {
      name: "Hải Lê",
      order: 50,
      totalMoney: "547.000.000 đ",
    },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    console.log("payload", payload);
    if (active && payload && payload.length) {
      return (
        <div className={styles.toolip_custom}>
          <div>{payload[0].payload.order}</div>
          <div className="text-[#FF970D]">{payload[0].payload.totalMoney}</div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-[12px] flex-wrap">
        <TitlePage title="Báo cáo nhân viên" />
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
      <div className={styles.div_container}>
        <div className="flex items-center justify-between mb-[24px] flex-wrap">
          <div className="text-[#384ADC] font-semibold text-big">
            Đơn hàng theo nhân viên
          </div>
          <div className="flex items-center gap-[24px]">
            <div className="flex items-center">
              <div className="mr-[12px]">Chọn kho</div>
              <Select options={warehouseData} style={{ width: 248 }} />
            </div>
            <span className="cursor-pointer">
              <Icon icon="export" />
            </span>
          </div>
        </div>
        <div className="w-full" style={{ height: 370 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart width={150} height={40} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="order" fill="#FFAC3D" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-end text-medium font-medium">
          Đơn vị: đơn hàng
        </div>
      </div>
      <div className={classNames(styles.div_container, "mt-[12px]")}>
        <div className="flex items-center justify-between mb-[24px] flex-wrap">
          <div className="text-[#384ADC] font-semibold text-big">
            Doanh thu theo nhân viên
          </div>
          <div className="flex items-center gap-[24px]">
            <div className="flex items-center">
              <div className="mr-[12px]">Chọn kho</div>
              <Select options={warehouseData} style={{ width: 248 }} />
            </div>
            <span className="cursor-pointer">
              <Icon icon="export" />
            </span>
          </div>
        </div>
        <Table
          loading={loading}
          className="table-layout2 table-has-total"
          columns={columns}
          dataSource={dataTable}
          pagination={{
            position: ["bottomCenter"],
            defaultPageSize: pagination.pageSize,
            showSizeChanger: true,
            pageSizeOptions: [10, 20, 50, 100],
          }}
          summary={(pageData) => {
            let totalOrder = 0;
            let totalSaleOrder = 0;
            let totalMoneyEarn = 0;

            pageData.forEach(({ numberOrders, orderSales, totalIncome }) => {
              totalOrder = totalOrder + numberOrders;
              totalSaleOrder = totalSaleOrder + orderSales;
              totalMoneyEarn = totalMoneyEarn + totalIncome;
            });

            return (
              <>
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0} colSpan={2}>
                    <div className="text-[#1D1C2D] text-center font-bold">
                      Tổng
                    </div>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={2}>
                    <div className="text-[#FF970D] font-semibold text-center">
                      {totalOrder}
                    </div>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={3}>
                    <div className="text-[#FF970D] font-semibold text-center">
                      {totalSaleOrder}
                    </div>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={4}>
                    <div className="text-[#FF970D] font-semibold text-center">
                      {totalMoneyEarn}đ
                    </div>
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              </>
            );
          }}
        />
      </div>
    </div>
  );
};

export default ReportStaff;
// ReactDOM.render(<ReportStaff />, document.getElementById("root"));
