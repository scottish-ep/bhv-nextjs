import React, { useState } from "react";
import ReactDOM from "react-dom";

import { wareHouseDetail } from "../../../const/constant";
import ImportWareHouseForm from "./ImportWareHouseForm/ImportWareHouseForm";

const ImportWareHouseDetail: React.FC = () => {
  const [detail, setDetail] = useState({ ...wareHouseDetail });

  return <ImportWareHouseForm detail={detail} />;
};

ReactDOM.render(<ImportWareHouseDetail />, document.getElementById("root"));
