import { StatusEnum } from "../../types";

export interface IsProduct {
  show: boolean | number;
  id?: string;
  img?: string;
  name?: string;
  image?: string;
  category?: string;
  total?: number | number;
  models?: number;
  numberSale?: number;
  price?: number | string;
  totalPrice?: number | string;
  createdAt?: string;
  outOfDate?: string;
  status?: StatusEnum;
}

export interface IProduct {
  id: string;
  name: string;
  category_id: string;
  export_price: number;
  import_price: number;
  export_quantity: number;
  import_quantity: number;
  export_weight: number;
  import_weight: number;
  money: number;
  number_package: number;
  unit_package: number;
  total_money: number;
  quantity_transfer: number;
  weight_transfer: number;
  quantity_can_transfer: number;
  weight_can_transfer: number;
  quantity: number;
  weight: number;
  price: number;
  discount: number;
}

export interface ProductAttributeProps {
  attribute_list?: any;
  id: string;
  attribute: string;
  typeAttribute: any;
}

export interface ProductDetailProps {
  show?: boolean | number;
  sku?: string;
  inputNum?: number;
  saleNum?: number;
  type?: string;
  weight?: number;
  negative?: boolean;
}
