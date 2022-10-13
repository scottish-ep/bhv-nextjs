import React from "react";
import ReactDOM from "react-dom";
import { liveStreamAppDetail } from "../../../const/constant";
import LivestreamAppForm from "./LivestreamAppForm/LivestreamAppForm";

const LivestreamAppDetail: React.FC = () => {
  return <LivestreamAppForm detail={liveStreamAppDetail} />;
};

ReactDOM.render(<LivestreamAppDetail />, document.getElementById("root"));
