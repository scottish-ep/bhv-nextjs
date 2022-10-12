import { InputNumber, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import classNames from "classnames";
import React, { useState } from "react";
import Icon from "../../../../components/Icon/Icon";
import { IProduct } from "../../../products/product.type";

interface BalanceWareHouseFormTableProps {
  product_list?: IProduct[];
}

const BalanceWareHouseFormTable: React.FC<BalanceWareHouseFormTableProps> = ({
  product_list = [],
}) => {
  const [productList, setProductList] = useState([...product_list]);

  const handleDeleteProduct = (id: string) => {
    setProductList((prevProductList) =>
      prevProductList.filter((product) => product.id !== id)
    );
  };

  const handleChangeValue = (id: string, key: string, value: number) => {
    setProductList((prevProductList) =>
      prevProductList.map((product) => {
        if (product.id === id) {
          return { ...product, [key]: value };
        }

        return product;
      })
    );
  };

  const columns: ColumnsType<any> = [
    {
      title: "STT",
      width: 75,
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (_, record, index) =>
        record.id !== "total" && (
          <span className="text-medium font-medium text-[#1D1C2D]">
            {index + 1}
          </span>
        ),
    },
    {
      title: "Tên sản phẩm",
      width: 250,
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <span className="text-medium font-medium text-[#1D1C2D]">
          {record.name}
        </span>
      ),
    },
    {
      title: "Danh mục",
      width: 150,
      dataIndex: "category_id",
      key: "category_id",
      align: "center",
      render: (_, record) =>
        record.id !== "total" ? (
          <span className="text-medium font-medium text-[#1D1C2D]">
            {record.category_id}
          </span>
        ) : (
          <span className="text-[#1D1C2D] font-semibold text-medium text-right">
            Tổng chuyển
          </span>
        ),
    },
    {
      title: "Tồn kho",
      width: 150,
      dataIndex: "number_package",
      key: "number_package",
      align: "center",
      render: (_, record) => (
        <span
          className={classNames("text-medium font-medium text-[#1D1C2D]", {
            "font-semibold text-[#384ADC]": record.id === "total",
          })}
        >
          {record.number_package}
        </span>
      ),
    },
    {
      title: "Thực kiếm",
      width: 150,
      dataIndex: "quantity_transfer",
      key: "quantity_transfer",
      align: "center",
      render: (_, record) =>
        record.id !== "total" ? (
          <InputNumber
            value={record.quantity_transfer}
            className="text-center"
            onChange={(value) =>
              handleChangeValue(record.id, "quantity_transfer", value || 0)
            }
          />
        ) : (
          <span className="text-[#384ADC] font-semibold text-medium">
            {record.quantity_transfer}
          </span>
        ),
    },
    {
      title: "Chênh lệch",
      width: 150,
      dataIndex: "weight_transfer",
      key: "weight_transfer",
      align: "center",
      render: (_, record) => (
        <span
          className={classNames("text-medium font-medium text-[#1D1C2D]", {
            "font-semibold text-[#384ADC]": record.id === "total",
          })}
        >
          {record.weight_transfer}
        </span>
      ),
    },
    {
      title: "",
      width: 50,
      dataIndex: "",
      key: "",
      align: "center",
      render: (_, record) =>
        record.id !== "total" && (
          <span
            className="cursor-pointer"
            onClick={() => handleDeleteProduct(record.id)}
          >
            <Icon icon="cancel" size={20} />
          </span>
        ),
    },
  ];

  return (
    <Table
      rowKey={(record) => record.id}
      locale={{
        emptyText: (
          <div className="flex flex-col gap-y-3">
            {/* <img src={LogoImage} alt="" /> */}
            <span className="text-[#6C728B]">Không có dữ liệu</span>
          </div>
        ),
      }}
      columns={columns}
      dataSource={
        productList.length
          ? [
              ...productList,
              {
                id: "total",
                number_package: productList.reduce(
                  (init, item) => init + item.number_package,
                  0
                ),
                quantity_transfer: productList.reduce(
                  (init, item) => init + item.quantity_transfer,
                  0
                ),
                weight_transfer: productList.reduce(
                  (init, item) => init + item.weight_transfer,
                  0
                ),
              },
            ]
          : []
      }
      pagination={false}
      scroll={{ x: 50, y: 500 }}
    />
  );
};

export default BalanceWareHouseFormTable;
