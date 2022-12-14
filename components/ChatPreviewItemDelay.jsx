import React from "react";
import { useRecoilValue } from "recoil";
import { itemWithId, buttonListOfItemWithId } from "../states/ChatState";

function ChatPreviewItemDelay({ item: metadata }) {
  let item = useRecoilValue(itemWithId(metadata.id, metadata));
  return (
    <div>
      <p style={{ margin: 0 }}>
        <svg width="16" height="16" viewBox="0 0 16 16" style={{ margin: "0px 0.5rem" }}>
          <path
            fill="#000000"
            d="M10.293 11.707l-3.293-3.293v-4.414h2v3.586l2.707 2.707zM8 0c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zM8 14c-3.314 0-6-2.686-6-6s2.686-6 6-6c3.314 0 6 2.686 6 6s-2.686 6-6 6z"
          ></path>
        </svg>
        Delay {item.value}s
      </p>
    </div>
  );
}

export default ChatPreviewItemDelay;
