export interface reportInComeProps {
  totalIncome: number | string;
  profit: number | string;
  moneyDeal: number | string;
  methodPayment: {
    cash: number | string;
    transfer: number | string;
  };
}

export interface IStaff {
  id?: string;
  name?: string;
  image?: string;
  numberOrders: number;
  orderSales: number;
  totalIncome: number;
}

export interface IOrder {
  id?: string;
  time?: string;
  orderPending: number;
  orderPrinted: number;
  orderSened: number;
  orderReceived: number;
  orderPartRefund: number;
  orderRefund: number;
  orderPartChange: number;
  orderChanged: number;
}