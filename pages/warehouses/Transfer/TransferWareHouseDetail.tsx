import React, { useState } from "react";
import ReactDOM from "react-dom";

import { wareHouseDetail } from "../../../const/constant";
import TransferWareHouseForm from "./TransferWareHouseForm/TransferWareHouseForm";

const TransferWareHouseDetail: React.FC = () => {
  const [detail, setDetail] = useState({ ...wareHouseDetail });

  return <TransferWareHouseForm detail={detail} />;
};

ReactDOM.render(<TransferWareHouseDetail />, document.getElementById("root"));
