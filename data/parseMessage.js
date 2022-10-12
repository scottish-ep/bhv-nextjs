import { timeFrom } from "../utils/relative-time";

export function parseFacebookMessages(raw, user) {
  let messages = raw.messages || raw;
  let messageList = messages.data
    .map(function (message) {
      try {
        let metadata = {
          message: message.message,
          sender: message.from && message.from.id === user.id ? "customer" : "me",
          quickReplyList: [],
          createdAt: timeFrom(message.created_time),
          page: user.social_account,
          conversation_link: user ? `https://www.facebook.com${user.conversation_link}` : "#",
          name: "--Xem nội dung này trên facebook--",
          elements: message.elements,
          title: message.title,
          subtitle: message.subtitle,
        };

        let ans = [];
        if (message.attachments) {
          for (let i = 0; i < message.attachments.data.length; ++i) {
            let attachment = {
              ...metadata,
              id: `${message.id}-${i}`,
              type: message.message ? "text" : "file",
            };
            let data = message.attachments.data[i];
            if (data.mime_type?.includes("video") && data.video_data) {
              attachment.type = "video";
              attachment.message = data.video_data.url;
              attachment.height = data.video_data.height;
              attachment.width = data.video_data.width;
              attachment.name = "--Xem nội dung này trên facebook--";
            } else if (data.mime_type?.includes("image") && data.image_data) {
              attachment.type = "image";
              attachment.message = data.image_data.url;
              attachment.height = data.image_data.height;
              attachment.width = data.image_data.width;
              attachment.name = "--Xem nội dung này trên facebook--";
            } else {
              attachment.type = "file";
              attachment.message = data.file_url;
              attachment.name = data.name;
            }
            ans.push(attachment);
          }
        }

        let mainMessage = {
          ...metadata,
          id: message.id,
          type: message.message ? "text" : "message",
        };
        if (message.shares?.data && message.shares.data.length > 0) {
          let data = message.shares.data[0];
          mainMessage.message = data.link;
          if (mainMessage.message.includes(".png")) {
            mainMessage.type = "image";
            mainMessage.height = 72;
            mainMessage.width = 72;
          } else {
            mainMessage.type = "template";
            mainMessage.message = "---#####---";
          }
          mainMessage.name = "--Xem nội dung này trên facebook--";
        }

        if (mainMessage.message.length > 0) {
          return ans.concat(mainMessage);
        }
        if (ans.length > 0) {
          return ans;
        }
        return [mainMessage];
      } catch (err) {
        return null;
      }
    })
    .filter(Boolean)
    .flat()
    .reverse()
    .map(function (message) {
      let url = "";
      if (message.type === "file" || message.type === "video") {
        url = message.message;
      } else if (message.type == "template") {
        url = message.url;
      }
      return { ...message, url, content: message.message };
    });
  return {
    messageList,
    nextUrl: messages.paging.next,
  };
}

export function parseMessage(raw, options = {}) {
  let { isNew = false } = options;
  let url = "";
  if (raw.type == "file" || raw.type == "video") {
    url = raw.message;
  } else if (raw.type == "template") {
    url = raw.url;
  }
  let user = raw.facebook_user ? raw.facebook_user : null;
  let page = raw ? raw.social_account : null;

  let name = "";
  if (raw.type === "file" && isNew) {
    let urlObject = new URL(raw.message);
    name = urlObject.pathname.split("/").slice(-1)[0];
  }

  return {
    id: raw.id,
    sender: raw.is_me ? "me" : "customer",
    type: raw.type,
    content: raw.message,
    quickReplyList: [],
    createdAt: raw.sended_at,
    url: url,
    name,
    elements: raw.elements,
    title: raw.title,
    subtitle: raw.subtitle,
    page: page,
    conversation_link: user ? "https://www.facebook.com" + user.conversation_link : "#",
    height: raw.height,
    width: raw.width,
  };
}
