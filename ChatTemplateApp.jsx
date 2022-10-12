import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import ChatEditorLayout from "./components/Template/ChatEditorLayout";
import ChatPreview from "./components/Template/ChatPreview";
import ChatType from "./components/Template/ChatType";

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
