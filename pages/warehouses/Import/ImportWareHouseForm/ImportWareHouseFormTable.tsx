import { InputNumber, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import classNames from "classnames";
import React, { useState } from "react";
import Icon from "../../../../components/Icon/Icon";
import { IProduct } from "../../../products/product.type";

interface ImportWareHouseFormTableProps {
  product_list?: IProduct[];
}

const ImportWareHouseFormTable: React.FC<ImportWareHouseFormTableProps> = ({
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
      width: 200,
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
      title: "Giá nhập",
      width: 150,
      dataIndex: "import_price",
      key: "import_price",
      align: "center",
      render: (_, record) =>
        record.id !== "total" ? (
          <span className="text-medium font-medium text-[#1D1C2D]">
            {record.import_price}
          </span>
        ) : (
          <span className="text-[#1D1C2D] font-semibold text-medium text-right">
            Tổng nhập
          </span>
        ),
    },
    {
      title: "Số lượng",
      width: 150,
      dataIndex: "import_quantity",
      key: "import_quantity",
      align: "center",
      render: (_, record) =>
        record.id !== "total" ? (
          <InputNumber
            value={record.import_quantity}
            className="text-center"
            onChange={(value) =>
              handleChangeValue(record.id, "import_quantity", value || 0)
            }
          />
        ) : (
          <span className="text-[#384ADC] font-semibold text-medium">
            {record.import_quantity}
          </span>
        ),
    },
    {
      title: "Trọng lượng",
      width: 150,
      dataIndex: "import_weight",
      key: "import_weight",
      align: "center",
      render: (_, record) =>
        record.id !== "total" ? (
          <InputNumber
            value={record.import_weight}
            addonAfter="kg"
            onChange={(value) =>
              handleChangeValue(record.id, "import_weight", value || 0)
            }
          />
        ) : (
          <span className="text-[#384ADC] font-semibold text-medium">
            {record.import_weight} kg
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
            "font-semibold text-[#384ADC]": record.id === "total",
          })}
        >
          {record.money.toLocaleString()} đ
        </span>
      ),
    },
    {
      title: "Số lượng kiện hàng",
      width: 150,
      dataIndex: "number_package",
      key: "number_package",
      align: "center",
      render: (_, record) =>
        record.id !== "total" ? (
          <InputNumber
            value={record.number_package}
            className="text-center"
            onChange={(value) =>
              handleChangeValue(record.id, "number_package", value || 0)
            }
          />
        ) : (
          <span className="text-[#384ADC] font-semibold text-medium">
            {record.number_package}
          </span>
        ),
    },
    {
      title: "Đơn giá kiện hàng",
      width: 150,
      dataIndex: "unit_package",
      key: "unit_package",
      align: "center",
      render: (_, record) =>
        record.id !== "total" ? (
          <InputNumber
            value={record.unit_package}
            className="text-center"
            addonAfter="kg"
            onChange={(value) =>
              handleChangeValue(record.id, "unit_package", value || 0)
            }
          />
        ) : (
          <span className="text-[#384ADC] font-semibold text-medium">
            {record.unit_package.toLocaleString()}
          </span>
        ),
    },
    {
      title: "Tổng tiền",
      width: 150,
      dataIndex: "total_money",
      key: "total_money",
      align: "center",
      render: (_, record) => (
        <span
          className={`font-semibold text-medium text-[${
            record.id === "total" ? "#384ADC" : "#1D1C2D"
          }]`}
        >
          {Number(
            record.import_price * record.import_quantity +
              record.number_package * record.unit_package
          ).toLocaleString()}{" "}
          đ
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
                import_quantity: productList.reduce(
                  (init, item) => init + item.import_quantity,
                  0
                ),
                import_price: productList.reduce(
                  (init, item) => init + item.import_price,
                  0
                ),
                import_weight: productList.reduce(
                  (init, item) => init + item.import_weight,
                  0
                ),
                number_package: productList.reduce(
                  (init, item) => init + item.number_package,
                  0
                ),
                unit_package: productList.reduce(
                  (init, item) => init + item.unit_package,
                  0
                ),
                money: productList.reduce((init, item) => init + item.money, 0),
                total_money: productList.reduce(
                  (init, item) => init + item.total_money,
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

export default ImportWareHouseFormTable;
