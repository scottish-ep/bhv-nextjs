import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import ChatEditorLayout from "./components/PrivateReply/ChatEditorLayout";
import ChatPreview from "./components/PrivateReply/ChatPreview";
import ChatType from "./components/PrivateReply/ChatType";

function ChatPrivateReplyApp() {
  return (
    <RecoilRoot>
      <ChatEditorLayout />
      <ChatPreview />
      <ChatType />
    </RecoilRoot>
  );
}

ReactDOM.render(<ChatPrivateReplyApp />, document.getElementById("root"));
