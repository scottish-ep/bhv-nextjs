import { Table } from "antd";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import Button from "../../components/Button/Button";
import Icon from "../../components/Icon/Icon";
import TitlePage from "../../components/TitlePage/Titlepage";
import { listTarget } from "../../const/constant";
import { ITartget } from "./staff.type";
import type { ColumnsType } from "antd/es/table";
import { StatusColorEnum, StatusList } from "../../types";

const ListTarget = () => {
  const [loading, setIsloading] = useState(false);
  const [pagination, setPagination] = useState({
    total: 0,
    pageSize: 10,
  });

  const columns: ColumnsType<ITartget> = [
    {
      title: "Tên chỉ tiêu",
      width: 690,
      key: "id",
      align: "left",
      render: (_, record) => {
        return <div>{record.name}</div>;
      },
    },
    {
      title: "Thời gian áp dụng",
      width: 300,
      key: "id",
      align: "center",
      render: (_, record) => {
        return <div>{record.time}</div>;
      },
    },
    {
      title: "Trạng thái",
      width: 220,
      key: "id",
      align: "center",
      render: (_, record) => {
        return (
          <span
            className={`font-semibold text-[${StatusColorEnum[record.status]}]`}
          >
            {StatusList.find((status) => status.value === record.status)?.name}
          </span>
        );
      },
    },
    {
      title: "",
      width: 50,
      key: "id",
      align: "center",
      render: (_, record) => {
        return (
          <span className="cursor-pointer">
            <Icon icon="edit-2" />
          </span>
        );
      },
    },
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-[12px] flex-wrap">
        <TitlePage title="Danh sách chỉ tiêu" />
        <div className="flex gap-[8px] flex-wrap">
          <Button
            variant="primary"
            width={151}
            color="white"
            suffixIcon={<Icon icon="add" size={24} />}
            onClick={() =>
              (window.location.href = "/warehouse/export-commands/update/1")
            }
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
      <Table
        loading={loading}
        columns={columns}
        dataSource={listTarget}
        pagination={{
          defaultPageSize: pagination.pageSize,
          showSizeChanger: true,
          pageSizeOptions: [10, 20, 50, 100],
        }}
        scroll={{ y: 350 }}
      />
    </div>
  );
};

ReactDOM.render(<ListTarget />, document.getElementById("root"));
