import { StatusEnum } from "../../../types";
import { IProduct } from "../../products/product.type";

export interface IComment {
  id: string;
  name: string;
  comment: string;
  phone: string;
  netWorkProviders: string;
  createdAt: Date | number;
  updatedAt: Date | number;
}

export interface ILivestreamApp {
  id: string;
  name: string;
  quantity: number;
  status: StatusEnum;
  createdAt: Date | number;
  updatedAt: Date | number;
}

export interface ILivestreamAppDetail {
  id: string;
  name: string;
  createdAt: Date | number;
  updatedAt: Date | number;
  productList: IProduct[];
  commentList: IComment[];
}
