import React, { useState } from "react";
import ReactDOM from "react-dom";

import { wareHouseDetail } from "../../../const/constant";
import BalanceWareHouseForm from "./BalanceWareHouseForm/BalanceWareHouseForm";

const BalanceWareHouseDetail: React.FC = () => {
  const [detail, setDetail] = useState({ ...wareHouseDetail });

  return <BalanceWareHouseForm detail={detail} />;
};

ReactDOM.render(<BalanceWareHouseDetail />, document.getElementById("root"));
