export interface IProductOfCombo {
  id: string;
  sku: string;
  name: string;
  category_id: string;
  price: number;
  quantity: number;
}

export interface ICombo {
  id: string;
  apply: boolean;
  name: string;
  channel: string;
  price: number;
  quantity: number;
  createdAt: Date | number;
  updatedAt: Date | number;
  productList: IProductOfCombo[];
}
