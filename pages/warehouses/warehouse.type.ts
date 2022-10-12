import { StatusEnum } from "../../types";
import { IProduct } from "../products/product.type";

export interface IWareHouses {
  id: string;
  name: string;
  export_name: string;
  note: string;
  quantity: number;
  weight: number;
  totalMoney: number;
  createdAt: Date | number;
  updatedAt: Date | number;
  status: StatusEnum;
  source: string;
  transport_fee: number;
  transfer_name: string;
  total_transfer_product: number;
  total_transfer: number;
  total_transfer_weight: number;
}

export interface IWareHousesDetail {
  id: string;
  export_code: string;
  user: string;
  note: string;
  export_warehouse: string;
  export_name: string;
  phone_number: string;
  export_address: string;
  address: string;
  createdAt: Date | number;
  updatedAt: Date | number;
  shipping_id: string;
  product_list: IProduct[];
}

export interface IInventoryWareHouses {
  id: string;
  name: string;
  sku: string;
  category_id: string;
  import_price: number;
  sale_price: number;
  quantity: number;
  status: StatusEnum;
}

export interface IReturnWareHouses {
  id: string;
  type: string;
  reason: string;
  import_name: string;
  quantity: number;
  name: string;
  createdAt: Date | number;
  updatedAt: Date | number;
  status: StatusEnum;
}
