import { InputNumber, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import React, { useState } from "react";
import Icon from "../../../../components/Icon/Icon";
import { IProduct } from "../../../products/product.type";

interface ReturnWareHouseFormTableProps {
  product_list?: IProduct[];
}

const ReturnWareHouseFormTable: React.FC<ReturnWareHouseFormTableProps> = ({
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
      render: (_, record, index) => (
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
      render: (_, record) => (
        <span className="text-medium font-medium text-[#1D1C2D]">
          {record.category_id}
        </span>
      ),
    },
    {
      title: "Số lượng",
      width: 150,
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
      render: (_, record) => (
        <InputNumber
          value={record.quantity}
          className="text-center"
          onChange={(value) =>
            handleChangeValue(record.id, "quantity", value || 0)
          }
        />
      ),
    },
    {
      title: "Trọng lượng",
      width: 150,
      dataIndex: "weight",
      key: "weight",
      align: "center",
      render: (_, record) => (
        <InputNumber
          value={record.weight}
          addonAfter="kg"
          onChange={(value) =>
            handleChangeValue(record.id, "weight", value || 0)
          }
        />
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
              // {
              //   id: "total",
              //   name: "",
              //   category_id: "",
              //   export_price: 0,
              //   quantity: productList.reduce(
              //     (init, item) => init + item.quantity,
              //     0
              //   ),
              //   weight: productList.reduce(
              //     (init, item) => init + item.weight,
              //     0
              //   ),
              // },
            ]
          : []
      }
      pagination={false}
      scroll={{ x: 50, y: 500 }}
    />
  );
};

export default ReturnWareHouseFormTable;
