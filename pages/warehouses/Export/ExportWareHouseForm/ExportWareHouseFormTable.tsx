import { InputNumber, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import classNames from "classnames";
import React, { useState } from "react";
import Icon from "../../../../components/Icon/Icon";
import { IProduct } from "../../../products/product.type";

interface ExportWareHouseFormTableProps {
  product_list?: IProduct[];
}

const ExportWareHouseFormTable: React.FC<ExportWareHouseFormTableProps> = ({
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
      width: 200,
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
      title: "Giá xuất",
      width: 150,
      dataIndex: "export_price",
      key: "export_price",
      align: "center",
      render: (_, record) =>
        record.id !== "total" ? (
          <InputNumber
            value={record.export_price}
            addonAfter="đ"
            onChange={(value) =>
              handleChangeValue(record.id, "export_price", value || 0)
            }
          />
        ) : (
          <span className="text-[#1D1C2D] font-semibold text-medium text-right">
            Tổng xuất
          </span>
        ),
    },
    {
      title: "Số lượng",
      width: 125,
      dataIndex: "export_quantity",
      key: "export_quantity",
      align: "center",
      render: (_, record) =>
        record.id !== "total" ? (
          <InputNumber
            value={record.export_quantity}
            className="text-center"
            onChange={(value) =>
              handleChangeValue(record.id, "export_quantity", value || 0)
            }
          />
        ) : (
          <span className="text-[#384ADC] font-semibold text-medium">
            {record.export_quantity}
          </span>
        ),
    },
    {
      title: "Trọng lượng",
      width: 150,
      dataIndex: "export_weight",
      key: "export_weight",
      align: "center",
      render: (_, record) =>
        record.id !== "total" ? (
          <InputNumber
            value={record.export_weight}
            addonAfter="kg"
            onChange={(value) =>
              handleChangeValue(record.id, "export_weight", value || 0)
            }
          />
        ) : (
          <span className="text-[#384ADC] font-semibold text-medium">
            {record.export_weight} kg
          </span>
        ),
    },
    {
      title: "Thành tiền",
      width: 150,
      dataIndex: "money",
      key: "money",
      align: "center",
      render: (_, record) => (
        <span
          className={classNames("text-medium font-medium text-[#1D1C2D]", {
            "text-[#384ADC] font-semibold": record.id === "total",
          })}
        >
          {record.money.toLocaleString()} đ
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
                name: "",
                category_id: "",
                export_price: 0,
                export_quantity: productList.reduce(
                  (init, item) => init + item.export_quantity,
                  0
                ),
                export_weight: productList.reduce(
                  (init, item) => init + item.export_weight,
                  0
                ),
                money: productList.reduce((init, item) => init + item.money, 0),
              },
            ]
          : []
      }
      pagination={false}
      scroll={{ x: 50, y: 500 }}
    />
  );
};

export default ExportWareHouseFormTable;
