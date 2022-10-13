import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { format } from "date-fns";
import React, { useState } from "react";
import { IComment } from "../livestream-app.type";

interface CommentTableProps {
  commentList: IComment[];
}

const CommentTable: React.FC<CommentTableProps> = ({ commentList }) => {
  const [loading, setLoading] = useState(false);

  const columns: ColumnsType<IComment> = [
    {
      title: "Thời gian",
      width: 50,
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      render: (_, record) => (
        <span className="text-medium text-[#1D1C2D] font-medium">
          {record.createdAt ? format(record.createdAt, "HH:mm:ss") : "--"}
        </span>
      ),
    },
    {
      title: "Khách hàng",
      width: 100,
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
      title: "Bình luận",
      width: 250,
      dataIndex: "comment",
      key: "comment",
      render: (_, record) => (
        <span className="text-medium text-[#1D1C2D]">
          {record.comment || "--"}
        </span>
      ),
    },
    {
      title: "Số điện thoại",
      width: 100,
      dataIndex: "phone",
      key: "phone",
      align: "center",
      render: (_, record) => (
        <span className="text-medium text-[#1D1C2D] font-medium">
          {record.phone || "--"}
        </span>
      ),
    },
    {
      title: "Nhà mạng",
      width: 100,
      dataIndex: "netWorkProviders",
      key: "netWorkProviders",
      align: "center",
      render: (_, record) => (
        <span className="text-medium text-[#1D1C2D] font-medium">
          {record.netWorkProviders || "--"}
        </span>
      ),
    },
  ];

  return (
    <Table
      rowKey={(record) => record.id}
      loading={loading}
      columns={columns}
      dataSource={commentList}
      pagination={false}
      scroll={{ x: 50, y: 500 }}
    />
  );
};

export default CommentTable;
