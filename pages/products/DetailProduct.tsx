import React, { useState } from "react";
import ReactDOM from "react-dom";
import { productDetail } from "../../const/constant";
import ProductForms from "./ProductForms/ProductForms";
const ProductDetails: React.FC = () => {
  const [detail, setDetail] = useState(productDetail);

  return <ProductForms detail={detail} />;
};

// ReactDOM.render(<ProductDetails />, document.getElementById("root"));
export default ProductDetails;
