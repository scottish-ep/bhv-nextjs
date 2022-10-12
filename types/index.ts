export enum StatusEnum {
  NEW = "NEW",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCEL = "CANCEL",
  CAN_SALES = "CAN_SALES",
  NEAR_EXPIRE = "NEAR_EXPIRE",
  EXPIRE = "EXPIRE",
  HIDDEN = "HIDDEN",
  PROCESSING = "PROCESSING",
  COMPLETED = "COMPLETED",
  PENDING = "PENDING",
  SELLING = "SELLING",
  PAY = "PAY",
  RECEIVE = "RECEIVE",
  LOCK = "LOCK",
}

export enum StatusColorEnum {
  NEW = "#10B981",
  SHIPPED = "#0EA5E9",
  DELIVERED = "#6366F1",
  CANCEL = "#EF4444",
  CAN_SALES = "#10B981",
  NEAR_EXPIRE = "#EAB308",
  EXPIRE = "#EF4444",
  HIDDEN = "#F97316",
  PROCESSING = "#F97316",
  COMPLETED = "#6366F1",
  SELLING = "#384ADC",
  PENDING = "#8B5CF6",
  PAY = "#8B5CF6",
  RECEIVE = "#EAB308",
  LOCK = "#384ADC",
    
}

export const StatusList = [
  {
    value: StatusEnum.NEW,
    name: "Mới",
  },
  {
    value: StatusEnum.SHIPPED,
    name: "Đã xuất hàng",
  },
  {
    value: StatusEnum.DELIVERED,
    name: "Đã nhập hàng",
  },
  {
    value: StatusEnum.CANCEL,
    name: "Đã huỷ",
  },
  {
    value: StatusEnum.CAN_SALES,
    name: "Có thể bán",
  },
  {
    value: StatusEnum.NEAR_EXPIRE,
    name: "Sắp hết hạn",
  },
  {
    value: StatusEnum.EXPIRE,
    name: "Hết hạn",
  },
  {
    value: StatusEnum.HIDDEN,
    name: "Ẩn",
  },
  {
    value: StatusEnum.PROCESSING,
    name: "Đang chuyển hàng",
  },
  {
    value: StatusEnum.COMPLETED,
    name: "Hoàn tất",
  },
  {
    value: StatusEnum.SELLING,
    name: "Bán chạy",
  },
  {
    value: StatusEnum.PENDING,
    name: "Chờ duyệt"
  },
  {
    value: StatusEnum.PAY,
    name: "Đã chi"
  },
  {
    value: StatusEnum.RECEIVE,
    name: "Đã thu"
  },
  {
    value: StatusEnum.LOCK,
    name: "Đã khoá"
  }
];
