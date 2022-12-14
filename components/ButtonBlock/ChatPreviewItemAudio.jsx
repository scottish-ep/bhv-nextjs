import React, { Fragment } from "react";
import { useRecoilValue } from "recoil";
import { itemWithId } from "../../states/ChatState";

function ChatPreviewItemAudio({ item: metadata }) {
  let item = useRecoilValue(itemWithId(metadata.id, metadata));
  return (
    <Fragment>
      <svg style={{ minWidth: "1.6rem" }} width="16" height="16" viewBox="0 0 16 16">
        <path
          fill="#000000"
          d="M15 0h1v11.5c0 1.381-1.567 2.5-3.5 2.5s-3.5-1.119-3.5-2.5c0-1.381 1.567-2.5 3.5-2.5 0.979 0 1.865 0.287 2.5 0.751v-5.751l-8 1.778v7.722c0 1.381-1.567 2.5-3.5 2.5s-3.5-1.119-3.5-2.5c0-1.381 1.567-2.5 3.5-2.5 0.979 0 1.865 0.287 2.5 0.751v-9.751l9-2z"
        ></path>
      </svg>
      <span>{item.file ? item.file.name : "File"}</span>
    </Fragment>
  );
}

export default ChatPreviewItemAudio;
