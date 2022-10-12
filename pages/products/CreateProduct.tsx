import React, { useState } from "react";
import ReactDOM from "react-dom";
import ProductForms from "./ProductForms/ProductForms";

const CreateProduct: React.FC = () => {
  return <ProductForms />;
};

ReactDOM.render(<CreateProduct />, document.getElementById("root"));
