import { InputNumber, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import classNames from "classnames";
import React, { useState } from "react";
import Icon from "../../../components/Icon/Icon";
import { IProductOfCombo } from "../promotion.type";

interface ProductTableProps {
  productList: IProductOfCombo[];
  setProductList: React.Dispatch<React.SetStateAction<IProductOfCombo[]>>;
}

const ProductTable: React.FC<ProductTableProps> = ({
  productList,
  setProductList,
}) => {
  const [loading, setLoading] = useState(false);

  const handleDeleteProduct = (id: string) => {
    setProductList((prevProductList) =>
      prevProductList.filter((product) => product.id !== id)
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
          <span className="text-medium text-[#1D1C2D] font-medium">
            {index + 1}
          </span>
        ),
    },
    {
      title: "Mã SP",
      width: 100,
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (_, record) =>
        record.id !== "total" && (
          <span className="text-medium text-[#1D1C2D] font-medium">
            {record.id}
          </span>
        ),
    },
    {
      title: "Mã SKU",
      width: 100,
      dataIndex: "sku",
      key: "sku",
      align: "center",
      render: (_, record) =>
        record.id !== "total" && (
          <span className="text-medium text-[#1D1C2D] font-medium">
            {record.sku}
          </span>
        ),
    },
    {
      title: "Tên sản phẩm",
      width: 200,
      dataIndex: "name",
      key: "name",
      align: "left",
      render: (_, record) =>
        record.id !== "total" && (
          <span className="text-medium text-[#1D1C2D] font-medium">
            {record.name || "--"}
          </span>
        ),
    },
    {
      title: "Danh mục",
      width: 125,
      dataIndex: "category_id",
      key: "category_id",
      align: "center",
      render: (_, record) =>
        record.id !== "total" ? (
          <span className="text-medium text-[#1D1C2D] font-medium">
            {record.category_id || "--"}
          </span>
        ) : (
          <span className="text-medium font-semibold text-[#1D1C2D]">Tổng</span>
        ),
    },
    {
      title: "Đơn giá",
      width: 125,
      dataIndex: "price",
      key: "price",
      align: "center",
      render: (_, record) => (
        <span
          className={classNames("text-medium text-[#1D1C2D] font-medium", {
            "font-semibold text-[#384ADC]": record.id === "total",
          })}
        >
          {record.price ? `${record.price.toLocaleString()} đ` : "--"}
        </span>
      ),
    },
    {
      title: "Số lượng trong combo",
      width: 250,
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
      render: (_, record) =>
        record.id !== "total" ? (
          <InputNumber
            value={record.quantity}
            className="w-full"
            placeholder="Nhập giá combo"
            onChange={(value) =>
              setProductList((prevProductList) =>
                prevProductList.map((product) => {
                  if (product.id === record.id) {
                    return { ...product, quantity: value };
                  }

                  return product;
                })
              )
            }
          />
        ) : (
          <span className="text-medium font-semibold text-[#384ADC]">
            {record.quantity}
          </span>
        ),
    },

    {
      title: "",
      width: 50,
      dataIndex: "",
      key: "",
      render: (_, record) => (
        <span
          className="cursor-pointer flex justify-center"
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
      loading={loading}
      columns={columns}
      dataSource={
        productList.length
          ? [
              ...productList,
              {
                id: "total",
                price: productList.reduce((init, item) => init + item.price, 0),
                quantity: productList.reduce(
                  (init, item) => init + item.quantity,
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

export default ProductTable;
