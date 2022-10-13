import { StatusEnum } from "../../types";

export interface ITartget {
  name: string;
  time: string;
  status: StatusEnum;
}

export interface ITartgetManageProps {
  show?: boolean | number;
  img: string;
  name?: string;
  id?: string;
  role?: string;
  order: number;
  profit: number;
  kpiorder: number;
  kpiprofit: number;
  orderSum: number;
  orderProfit: number;
  orderKpiOrder: number;
  orderKpiProfit: number;
  month: string;
}

export interface IStaffListProps {
  show?: boolean | number;
  img: string;
  name?: string;
  id?: string;
  phone?: string;
  role?: string;
  group?: string;
  store?: string;
  orderError: number;
  error: number;
}

export interface IFaultDetailProps {
  name?: string;
  fault?: number;
  update?: string;
}