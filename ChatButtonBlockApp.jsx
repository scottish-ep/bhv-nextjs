import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import ChatEditorLayout from "./components/ButtonBlock/ChatEditorLayout";
import ChatPreview from "./components/ButtonBlock/ChatPreview";
import ChatType from "./components/ButtonBlock/ChatType";

function ChatTemplateApp() {
  return (
    <RecoilRoot>
      <ChatEditorLayout />
      <ChatPreview />
      <ChatType />
    </RecoilRoot>
  );
}

ReactDOM.render(<ChatTemplateApp />, document.getElementById("root"));
