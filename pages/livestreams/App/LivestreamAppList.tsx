import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Button from "../../../components/Button/Button";
import DatePicker from "../../../components/DatePicker/DatePicker";
import Icon from "../../../components/Icon/Icon";
import Input from "../../../components/Input/Input";
import TitlePage from "../../../components/TitlePage/Titlepage";
import { liveStreamAppList } from "../../../const/constant";
import { StatusColorEnum, StatusList } from "../../../types";
import { ILivestreamApp } from "./livestream-app.type";

const LivestreamAppList: React.FC = () => {
  const [liveStreamApps, setLivestreamApps] = useState<ILivestreamApp[]>([
    ...liveStreamAppList,
  ]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    total: 0,
    pageSize: 10,
  });

  useEffect(() => {
    const element = document.getElementById("loading__animation");
    if (element) {
      element.remove();
    }
  }, []);

  const columns: ColumnsType<ILivestreamApp> = [
    {
      title: "#",
      width: 50,
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (_, record) => (
        <span className="text-medium text-[#1D1C2D] font-medium">
          {record.id}
        </span>
      ),
    },
    {
      title: "Tên live stream",
      width: 250,
      dataIndex: "name",
      key: "name",
      align: "left",
      render: (_, record) => (
        <span className="text-medium text-[#1D1C2D] font-medium">
          {record.name || "--"}
        </span>
      ),
    },
    {
      title: "Số sản phẩm",
      width: 50,
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
      render: (_, record) => (
        <span className="text-medium text-[#4B4B59] font-medium">
          {record.quantity || "--"}
        </span>
      ),
    },
    {
      title: "Trạng thái",
      width: 100,
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (_, record) => (
        <span
          className={`text-medium font-medium text-[${
            StatusColorEnum[record.status]
          }]`}
        >
          {StatusList.find((status) => status.value === record.status)?.name}
        </span>
      ),
    },
    {
      title: "Thời gian kết thúc",
      width: 150,
      dataIndex: "updatedAt",
      key: "updatedAt",
      align: "center",
      render: (_, record) => (
        <span className="text-medium text-[#1D1C2D] font-medium">
          {record.updatedAt
            ? format(record.updatedAt, "HH:mm dd/MM/yyyy")
            : "--"}
        </span>
      ),
    },
  ];

  return (
    <div className="w-full">
      <div className="flex gap-2 flex-wrap justify-between">
        <TitlePage title="Livestream trên app" />
        <div className="flex gap-x-4">
          <Button
            variant="primary"
            width={151}
            color="white"
            suffixIcon={<Icon icon="add" size={24} />}
            onClick={() => (window.location.href = "/livestream/app/add")}
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
      <div className="flex gap-2 my-3 flex-wrap">
        <Input
          className="flex-1 w-[306px]"
          prefix={<Icon icon="search" color="#FF970D" size={24} />}
          placeholder="Tìm tên livestream"
        />
        <DatePicker width={306} placeholder="Tìm theo thời gian" />
      </div>
      <Table
        rowKey={(record) => record.id}
        onRow={() => {
          return {
            onClick: () => {
              window.location.href = "/livestream/app/live/1";
            },
          };
        }}
        loading={loading}
        columns={columns}
        dataSource={liveStreamApps}
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

ReactDOM.render(<LivestreamAppList />, document.getElementById("root"));
