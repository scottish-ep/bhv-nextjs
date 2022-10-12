import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import ChatEditorLayout from "./components/ChatEditorLayout";
import ChatPreview from "./components/ChatPreview";
import ChatType from "./components/ChatType";

function ChatApp() {
  return (
    <RecoilRoot>
      <ChatEditorLayout />
      <ChatPreview />
      <ChatType />
    </RecoilRoot>
  );
}

ReactDOM.render(<ChatApp />, document.getElementById("root"));
