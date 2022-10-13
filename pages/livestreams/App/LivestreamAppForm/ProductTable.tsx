import { AutoComplete, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import classNames from "classnames";
import React, { useState } from "react";
import Icon from "../../../../components/Icon/Icon";
import { IProduct } from "../../../products/product.type";
import { ILivestreamAppDetail } from "../livestream-app.type";

interface ProductTableProps {
  productList: IProduct[];
  setProductList: React.Dispatch<React.SetStateAction<IProduct[]>>;
  detail?: ILivestreamAppDetail;
}

interface ISearchProductList {
  list: any[];
  page: number;
  limit: number;
  totalPage: number;
}

const { Option } = AutoComplete;

const ProductTable: React.FC<ProductTableProps> = ({
  productList,
  detail,
  setProductList,
}) => {
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isLoadMoreProduct, setIsLoadMoreProduct] = useState(false);
  const productIdList = productList.map((product) => product.id);
  const [searchProductList, setSearchProductList] =
    useState<ISearchProductList>({
      list: [
        {
          id: "9999",
          name: "LD Mart Bưởi Phúc Trạch 0.5kg | LD001A",
          price: 55000,
          category_id: "Áo",
          discount: 50000,
        },
      ],
      page: 1,
      limit: 10,
      totalPage: 0,
    });

  const columns: ColumnsType<any> = [
    {
      title: "STT",
      width: 50,
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (_, __, index) => (
        <span className="text-medium text-[#1D1C2D] font-medium">
          {index + 1}
        </span>
      ),
    },
    {
      title: "Mã SP",
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
      title: "Tên sản phẩm",
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
      title: "Danh mục",
      width: 100,
      dataIndex: "category_id",
      key: "category_id",
      align: "center",
      render: (_, record) => (
        <span className="text-medium text-[#1D1C2D] font-medium">
          {record.category_id || "--"}
        </span>
      ),
    },
    {
      title: "Giá bán",
      width: 100,
      dataIndex: "price",
      key: "price",
      align: "center",
      render: (_, record) => (
        <span className="text-medium text-[#1D1C2D] font-medium">
          {record.price ? `${record.price.toLocaleString()} đ` : "--"}
        </span>
      ),
    },
    {
      title: "Giá KM",
      width: 100,
      dataIndex: "discount",
      key: "discount",
      align: "center",
      render: (_, record) => (
        <span className="text-medium text-[#1D1C2D] font-medium">
          {record.discount ? `${record.discount.toLocaleString()} đ` : "--"}
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

  //   useEffect(() => {
  //     setIsLoadMoreProduct(true);

  //     ProductApi.getList({
  //       page: searchProductList.page,
  //       itemPerPage: searchProductList.limit,
  //       saveStore: false,
  //       name: searchValue.trim(),
  //     }).then((res) => {
  //       setIsLoadMoreProduct(false);
  //       if (res) {
  //         setSearchProductList({
  //           list:
  //             searchProductList.page === 1
  //               ? res.product_list
  //               : searchProductList.list.concat(res.product_list),
  //           totalPage: Math.ceil(res.total / searchProductList.limit),
  //           limit: searchProductList.limit,
  //           page: searchProductList.page,
  //         });
  //       }
  //     });

  //     // eslint-disable-next-line
  //   }, [searchProductList.page, searchProductList.limit, searchValue]);

  const handleDeleteProduct = (id: string) => {
    setProductList((prevProductList) =>
      prevProductList.filter((product) => product.id !== id)
    );
  };

  const onScrollBottom = (event: any) => {
    const target = event.target;
    if (
      target.scrollTop + target.offsetHeight === target.scrollHeight &&
      searchProductList.page < searchProductList.totalPage &&
      !isLoadMoreProduct
    ) {
      setSearchProductList({
        ...searchProductList,
        page: searchProductList.page + 1,
      });
    }
  };

  const handleAddProduct = (id: string) => {
    const product = searchProductList.list.find((product) => product.id === id);
    product && setProductList([...productList, product]);
  };

  return (
    <div className="flex flex-col gap-y-3 bg-white rounded px-3 py-4 mt-3">
      <div className="font-medium text-[#1D1C2D] text-[16px]">
        Danh sách sản phẩm
      </div>
      {!detail && (
        <AutoComplete
          value={searchValue}
          className="autocomplete w-full"
          placeholder="Nhập mã sản phẩm / tên sản phẩm"
          onPopupScroll={onScrollBottom}
          onSelect={(id: string) =>
            !isLoadMoreProduct &&
            !productIdList.includes(id) &&
            handleAddProduct(id)
          }
          onChange={(value) =>
            value !== "loading" &&
            !productIdList.includes(value) &&
            setSearchValue(
              searchProductList.list.find((option) => option.id === value)
                ?.name || value
            )
          }
        >
          {searchProductList.list.map((option, index) => (
            <Option key={index} value={option.id}>
              <div
                className={classNames("flex flex-col gap-y-1", {
                  "cursor-not-allowed opacity-50": productIdList.includes(
                    option.id
                  ),
                })}
              >
                <span className="text-medium font-medium text-[#4B4B59]">
                  {option.name || "-"}
                </span>
                <span className="text-medium font-medium text-[#384ADC]">
                  {option.price ? option.price.toLocaleString() : "-"}
                </span>
              </div>
            </Option>
          ))}
          {isLoadMoreProduct && <Option value="loading">Loading ......</Option>}
        </AutoComplete>
      )}
      <Table
        rowKey={(record) => record.id}
        loading={loading}
        columns={columns}
        dataSource={productList}
        pagination={false}
        scroll={{ x: 50 }}
      />
    </div>
  );
};

export default ProductTable;
