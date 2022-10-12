import { StatusEnum, StatusList } from "../types";

export const productList = Array(50)
  .fill({
    name: "Áo thun basic cotton - Trắng - S",
    sku: "555501S",
    category_id: "Áo",
    import_price: 25000,
    sale_price: 150000,
    quantity: 500,
  })
  .map((item, index) => ({
    ...item,
    id: index + 1,
    status: index % 2 === 0 ? StatusEnum.NEAR_EXPIRE : StatusEnum.SELLING,
  }));

export const returnWareHouseList = Array(50)
  .fill({
    type: "Đơn hoàn",
    reason: "Hàng không đúng mô tả",
    import_name: "Tổng kho Linh Dương",
    quantity: 3,
    name: "Nguyễn Văn A",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  })
  .map((item, index) => ({
    ...item,
    id: `KH00${index + 1}`,
    status: index % 2 === 0 ? StatusEnum.NEW : StatusEnum.COMPLETED,
  }));

export const list_Debt = Array(50)
  .fill({
    id: "CN0001",
    name: "Tran Huyen",
    code: "KH0021",
    phone: "0936.216.320",
    debt: 1200000,
    note: "Công thợ theo đơn hoàn",
    status: StatusEnum.PENDING,
    update_time: "19/09/2022 - 13:05"
  })
  .map((item, index) => ({...item, id: `KH${index+1}`}))

export const wareHouseList = Array(50)
  .fill({
    name: "Nguyễn Văn A",
    export_name: "Kho tổng Linh Dương",
    note: "Đơn hàng #009NHG",
    quantity: 10,
    weight: 2,
    totalMoney: 120000,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    status: StatusEnum.NEW,
    source: "Công ty ABC",
    transport_fee: 120000,
    transfer_name: "Kho tổng Linh Dương",
    total_transfer_product: 3,
    total_transfer: 100,
    total_transfer_weight: 0,
  })
  .map((item, index) => ({ ...item, id: `KH${index + 1}` }));

export const paymentList = Array(50)
 .fill({
    code: "C004",
    deal_name: "Tiền điện",
    employee: "Yến Nhi",
    date: "09:23 - 21/09/2022",
    money: 500.000,
    method: "Tiền mặt",
    receive_name: "Anh Ước",
    phone: "0922.562.888",
    status: StatusEnum.PENDING,
    note: "Có hoá đơn"
 })
 .map((item, index) => ({...item, id: `KH${index+1}`}));

export const wareHouseDetail = {
  id: "EP01",
  export_code: "BHV0021",
  user: "Nguyễn Văn A",
  createdAt: Date.now(),
  updatedAt: Date.now(),
  note: "Xuất đơn hàng #NJV098HJG",
  export_name: "Kho tổng Linh Dương",
  export_warehouse: "Kho tổng Linh Dương",
  phone_number: "0987987456",
  export_address:
    "Số nhà 40, đường Phạm Quang Lịch, tổ 21, phường Tiền Phong, thành phố Thái Bình, Thái Bình",
  address: "",
  shipping_id: "Ninjavan",
  product_list: Array(5)
    .fill({
      name: "555501 | Áo thun basic cotton - Trắng - S",
      category_id: "Áo",
      export_price: 150000,
      import_price: 150000,
      export_quantity: 1,
      import_quantity: 1,
      export_weight: 0,
      import_weight: 0,
      money: 150000,
      number_package: 10,
      unit_package: 30000,
      total_money: 0,
      quantity_transfer: 0,
      weight_transfer: 0,
      quantity_can_transfer: 549,
      weight_can_transfer: 0,
    })
    .map((item, index) => ({ ...item, id: index + 1 })),
};

export const warehouses: {
  label: string;
  value: string;
}[] = [
  {
    label: "Kho tổng Linh Dương",
    value: "Kho tổng Linh Dương",
  },
  {
    label: "Kho tổng Linh Đan",
    value: "Kho tổng Linh Đan",
  },
  {
    label: "Kho tổng Linh Thị",
    value: "Kho tổng Linh Thị",
  },
];

export const employeeProcess: {
  label: string;
  value: string;
}[] = [
  {
    label: "Nguyễn Văn A",
    value: "Nguyễn Văn A",
  },
  {
    label: "Nguyễn Văn B",
    value: "Nguyễn Văn B",
  },
  {
    label: "Nguyễn Văn C",
    value: "Nguyễn Văn C",
  },
];

export const shippingUnitList: {
  label: string;
  value: string;
}[] = [
  {
    label: "Ninjavan",
    value: "Ninjavan",
  },
  {
    label: "Son Hun Sai",
    value: "Son Hun Sai",
  },
  {
    label: "SaiGon",
    value: "SaiGon",
  },
];

export const priceShippingList: {
  label: string;
  value: number;
}[] = [
  {
    label: "30.000",
    value: 30000,
  },
  {
    label: "100.000",
    value: 100000,
  },
  {
    label: "500.000",
    value: 500000,
  },
  {
    label: "1.000.000",
    value: 1000000,
  },
];

export const supplierList: {
  label: string;
  value: string;
}[] = [
  {
    label: "Công Ty Văn Lang",
    value: "Công Ty Văn Lang",
  },
  {
    label: "Công Ty Hoan Hao",
    value: "Công Ty Hoan Hao",
  },
  {
    label: "Công Ty Sai Gon",
    value: "Công Ty Sai Gon",
  },
];

export const payBackList: {
  label: string;
  value: string;
}[] = [
  {
    label: "Đơn hoàn",
    value: "Đơn hoàn",
  },
  {
    label: "Đơn hoàn 1 phần",
    value: "Đơn hoàn 1 phần",
  },
  {
    label: "Đơn đổi 1 phần",
    value: "Đơn đổi 1 phần",
  },
  {
    label: "Đơn huỷ",
    value: "Đơn huỷ",
  },
];

export const reasonList: {
  label: string;
  value: string;
}[] = [
  {
    label: "Hàng không đúng mô tả",
    value: "Hàng không đúng mô tả",
  },
  {
    label: "Sản phẩm không đúng mẫu mã",
    value: "Sản phẩm không đúng mẫu mã",
  },
];

export const statusOptions: {
  value: StatusEnum;
  label: string;
}[] = [
  {
    value: StatusEnum.NEW,
    label:
      StatusList.find((status) => status.value === StatusEnum.NEW)?.name || "",
  },
  {
    value: StatusEnum.SHIPPED,
    label:
      StatusList.find((status) => status.value === StatusEnum.SHIPPED)?.name ||
      "",
  },
  {
    value: StatusEnum.CANCEL,
    label:
      StatusList.find((status) => status.value === StatusEnum.CANCEL)?.name ||
      "",
  },
];

export const productTypeList: {
  label: string;
  value: string;
}[] = [
  {
    label: "Áo",
    value: "Áo",
  },
  {
    label: "Quần",
    value: "Quần",
  },
  {
    label: "Giày dép",
    value: "Giày dép",
  },
  {
    label: "Mỹ phẩm",
    value: "Mỹ phẩm",
  },
  {
    label: "TP chức năng",
    value: "TP chức năng",
  },
  {
    label: "Đồ khô",
    value: "Đồ khô",
  },
];

export const productDetail = {
  id: "5555",
  name: "Áo thun basic cotton",
  createdAt: Date.now(),
  expireDate: Date.now(),
};

export const productAttributes = [
  {
    label: "Màu sắc",
    value: "Màu sắc",
  },
  {
    label: "Size",
    value: "Size",
  },
  {
    label: "Vị",
    value: "Vị",
  },
];
