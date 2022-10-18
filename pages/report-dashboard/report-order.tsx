import { Checkbox, Table } from "antd";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import Button from "../../components/Button/Button";
import DatePicker from "../../components/DatePicker/DatePicker";
import Icon from "../../components/Icon/Icon";
import Select from "../../components/Select/Select";
import TitlePage from "../../components/TitlePage/Titlepage";
import { listDayCompare } from "../../const/constant";
import classNames from "classnames";
import type { ColumnsType } from "antd/es/table";

import styles from "../../styles/Report.module.css";
import ReportPieChart from "./ReportChart/PieChart/ReportPieChart";
import LineChart from "./ReportChart/LineChart/ReportLineChart";
import { IOrder } from "./report.type";

const ReportOrder = () => {
  const [isCompare, setIsCompare] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    total: 0,
    pageSize: 10,
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

  const percentOrder = [
    {
      label: "Chốt đơn",
      value: 85,
    },
    {
      label: "Đơn hoàn",
      value: 15,
    },
  ];

  const dataTable = Array(50).fill({
    time: "28/09/2022",
    orderPending: 253,
    orderPrinted: 245,
    orderSened: 123,
    orderReceived: 432,
    orderPartRefund: 122,
    orderRefund: 125,
    orderPartChange: 125,
    orderChanged: 124,
  });

  const columns: ColumnsType<IOrder> = [
    {
      title: "Thời gian",
      width: 144,
      key: "time",
      align: "center",
      render: (_, record) => {
        return <div className="font-medium">{record.time}</div>;
      },
    },
    {
      title: "Chờ xử lý",
      width: 144,
      key: "orderPending",
      align: "center",
      sorter: (a, b) => a.orderPending - b.orderPending,
      render: (_, record) => {
        return <div className="font-semibold">{record.orderPending}</div>;
      },
    },
    {
      title: "Đã in",
      width: 144,
      key: "orderPrinted",
      align: "center",
      sorter: (a, b) => a.orderPrinted - b.orderPrinted,
      render: (_, record) => {
        return <div className="font-semibold">{record.orderPrinted}</div>;
      },
    },
    {
      title: "Đã gửi hàng",
      width: 144,
      key: "orderSened",
      align: "center",
      sorter: (a, b) => a.orderSened - b.orderSened,
      render: (_, record) => {
        return <div className="font-semibold">{record.orderSened}</div>;
      },
    },
    {
      title: "Đã nhận",
      width: 144,
      key: "orderReceived",
      align: "center",
      sorter: (a, b) => a.orderReceived - b.orderReceived,
      render: (_, record) => {
        return <div className="font-semibold">{record.orderReceived}</div>;
      },
    },
    {
      title: "Hoàn 1 phần",
      width: 144,
      key: "orderPartRefund",
      align: "center",
      sorter: (a, b) => a.orderPartRefund - b.orderPartRefund,
      render: (_, record) => {
        return <div className="font-semibold">{record.orderPartRefund}</div>;
      },
    },
    {
      title: "Đã hoàn",
      width: 144,
      key: "orderRefund",
      align: "center",
      sorter: (a, b) => a.orderRefund - b.orderRefund,
      render: (_, record) => {
        return <div className="font-semibold">{record.orderRefund}</div>;
      },
    },
    {
      title: "Đổi 1 phần",
      width: 144,
      key: "orderPartChange",
      align: "center",
      sorter: (a, b) => a.orderPartChange - b.orderPartChange,
      render: (_, record) => {
        return <div className="font-semibold">{record.orderPartChange}</div>;
      },
    },
    {
      title: "Đã đổi",
      width: 144,
      key: "orderChanged",
      align: "center",
      sorter: (a, b) => a.orderChanged - b.orderChanged,
      render: (_, record) => {
        return <div className="font-semibold">{record.orderChanged}</div>;
      },
    },
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-[12px] flex-wrap">
        <TitlePage title="Báo cáo đơn hàng" />
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
          <div className={classNames(styles.div_container, "flex-1")}>
            <div className={styles.row}>
              <div className="text-big text-[#384ADC] font-semibold">
                Tổng đơn hàng đã tạo
              </div>
              <div className="text-2xl font-bold">2560</div>
            </div>
            <div className={styles.row}>
              <div className="font-semibold opacity-50">Đã nhận</div>
              <div className="text-[#10B981] text-2xl font-bold">
              956
              </div>
            </div>
            <div className={styles.row}>
              <div className="font-semibold ">Chuyển hoàn</div>
              <div className="text-[#8B5CF6] text-big font-bold">153</div>
            </div>
            <div className={styles.row}>
              <div className="font-semibold">Đơn huỷ</div>
              <div className="text-[#EF4444] text-big font-bold">95</div>
            </div>
          </div>
          <div className={classNames(styles.div_container, "flex-1")}>
            <div className={styles.row}>
              <div className="text-big text-[#384ADC] font-semibold">
                Tỉ lệ đơn hàng
              </div>
              <div className="flex gap-[34px]">
                <div className="flex gap-[12px]">
                  <div className="text-[#10B981] font-semibold">
                    {percentOrder[0].label}
                  </div>
                  <div className="text-medium font-semibold">85%</div>
                </div>
                <div className="flex gap-[12px]">
                  <div className="text-[#8B5CF6] font-semibold">
                    {percentOrder[1].label}
                  </div>
                  <div className="text-medium font-semibold">15%</div>
                </div>
              </div>
            </div>
            <div className={styles.column_percent}>
              <div
                style={{
                  width: `${percentOrder[0].value}%`,
                  backgroundColor: "#10B981",
                  height: "100%",
                }}
              />
              <div
                style={{
                  width: `${percentOrder[1].value}%`,
                  backgroundColor: "#8B5CF6",
                  height: "100%",
                }}
              />
            </div>
          </div>
        </div>
        <ReportPieChart title="Đơn hàng theo kênh bán" data={data} />
      </div>
      <LineChart
        statusOrder={statusOrder}
        title="Đơn hàng theo thời gian"
        dataLineChart={dataLineChart}
        data={warehouseData}
        unit="đơn hàng"
      />
      <div className={classNames(styles.div_container, "mt-[12px]")}>
        <div className="flex items-center justify-between mb-[24px] flex-wrap">
          <div className="text-[#384ADC] font-semibold text-big">
            Đơn hàng theo trạng thái
          </div>
          <div className="flex items-center gap-[24px]">
            <div className="flex items-center">
              <div className="mr-[12px] font-medium">Chọn kho</div>
              <Select options={statusOrder} style={{ width: 248 }} />
            </div>
            <span className="cursor-pointer">
              <Icon icon="export" />
            </span>
          </div>
        </div>
        <Table
          loading={loading}
          className="table-layout1 table-has-total"
          columns={columns}
          dataSource={dataTable}
          pagination={{
            position: ["bottomCenter"],
            defaultPageSize: pagination.pageSize,
            showSizeChanger: true,
            pageSizeOptions: [10, 20, 50, 100],
          }}
          summary={(pageData) => {
            let totalOrderPending = 0;
            let totalOrderPrinted = 0;
            let totalOrderSened = 0;
            let totalOrderReceived = 0;
            let totalOrderPartRefund = 0;
            let totalOrderRefund = 0;
            let totalOrderPartChange = 0;
            let totalOrderChanged = 0;

            pageData.forEach(
              ({
                orderPending,
                orderPrinted,
                orderSened,
                orderReceived,
                orderPartRefund,
                orderRefund,
                orderPartChange,
                orderChanged,
              }) => {
                totalOrderPending = totalOrderPending + orderPending;
                totalOrderPrinted = totalOrderPrinted + orderPrinted;
                totalOrderSened = totalOrderSened + orderSened;
                totalOrderReceived = totalOrderReceived + orderReceived;
                totalOrderPartRefund = totalOrderPartRefund + orderPartRefund;
                totalOrderRefund = totalOrderRefund + orderRefund;
                totalOrderPartChange = totalOrderPartChange + orderPartChange;
                totalOrderChanged = totalOrderChanged + orderChanged;
              }
            );

            return (
              <>
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0}>
                    <div className="text-[#1D1C2D] text-center font-bold">
                      Tổng
                    </div>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={1}>
                    <div className="text-[#FF970D] font-semibold text-center">
                      {totalOrderPending}
                    </div>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={2}>
                    <div className="text-[#FF970D] font-semibold text-center">
                      {totalOrderPrinted}
                    </div>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={3}>
                    <div className="text-[#FF970D] font-semibold text-center">
                      {totalOrderSened}
                    </div>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={4}>
                    <div className="text-[#FF970D] font-semibold text-center">
                      {totalOrderReceived}
                    </div>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={5}>
                    <div className="text-[#FF970D] font-semibold text-center">
                      {totalOrderPartRefund}
                    </div>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={6}>
                    <div className="text-[#FF970D] font-semibold text-center">
                      {totalOrderRefund}
                    </div>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={7}>
                    <div className="text-[#FF970D] font-semibold text-center">
                      {totalOrderPartChange}
                    </div>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={8}>
                    <div className="text-[#FF970D] font-semibold text-center">
                      {totalOrderChanged}
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

export default ReportOrder;
// ReactDOM.render(<ReportOrder />, document.getElementById("root"));
