import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { parseFacebookMessages } from "../data/parseMessage";
import { timeFrom } from "../utils/relative-time";
import { request } from "../utils/request";

let messageCount = 1000000;

function scrollToBottomChatView() {
  let objDiv = document.getElementById("portal-chat__content");
  objDiv.scrollTop = objDiv.scrollHeight;
}

export function useMessageList({ user,settings }) {
  let [messageListWithOptions, setMessageListWithOptions] = useState({
    messageList: [],
    options: {
      doScrollToBottom: false,
      scrollToMessage: null,
    },
  });
  let { messageList } = messageListWithOptions;

  let [forceFetchMore, setForceFetchMore] = useState(false);
  let fetchMore = useCallback(function () {
    setForceFetchMore((p) => !p);
  }, []);

  let isFetching = useRef(false);
  let nextFetchMessageUrl = useRef("");

  // Messenger API config (accessToken and appVersion)
  let [config, setConfig] = useState(null);

  useEffect(
    function () {
      setMessageListWithOptions({
        messageList: [],
        options: {
          doScrollToBottom: false,
        },
      });
    },
    [user],
  );

  useEffect(
    function () {
      setMessageListWithOptions({
        messageList: [],
        options: {
          doScrollToBottom: false,
        },
      });

      nextFetchMessageUrl.current = null;
    },
    [settings],
  );



  useEffect(
    function () {
      let controller = new AbortController();
      let aborted = false;
      if (user) {
        let pageId = user.social_account.social_id;
        request(`/portal/facebook/api-config/${pageId}`)
          .catch(function () {
            // Set config to null in case of failures
            return null;
          })
          .then(function (config) {
            if (aborted) {
              return;
            }
            if (!config) {
              setConfig(config);
              return;
            }
            setConfig({
              accessToken: config.access_token,
              appVersion: config.app_version,
            });
          });
      }
      return function () {
        aborted = false;
        controller.abort();
        setConfig(null);
      };
    },
    [user],
  );

  useEffect(
    function () {
      nextFetchMessageUrl.current = null;
    },
    [user],
  );

  useEffect(
    function () {
      if (!user || isFetching.current || !config) {
        return;
      }
      isFetching.current = true;

      let controller = new AbortController();
      let aborted = false;
      console.log("user");
      console.log(user);

      let { accessToken, appVersion } = config;
      let conversationId = user.conversation_info;

      let isFirstBatch = !nextFetchMessageUrl.current;
      let url = isFirstBatch
        ? `https://graph.facebook.com/${appVersion}/${conversationId}?access_token=${accessToken}&fields=messages{from,id,message,to,created_time,shares{link,name,description},attachments}`
        : nextFetchMessageUrl.current;
      fetch(url, {
        signal: controller.signal,
      })
        .then(function (res) {
          if (res.ok) {
            return res.json();
          }
          throw res;
        })
        .catch(function (res) {
          if (res?.name !== "AbortError") {
            window.alertDanger("Vui lòng thực hiện lại thao tác add page ở trang cổng thông tin");
          }
          throw res;
        })
        .then(function (res) {
          if (aborted) {
            return;
          }
          let { messageList, nextUrl } = parseFacebookMessages(res, user);
          if (nextUrl) {
            nextFetchMessageUrl.current = nextUrl;
          }

          if (isFirstBatch) {
            setMessageListWithOptions({
              messageList,
              options: { doScrollToBottom: true },
            });
          } else {
            let newMessageList = messageList;
            setMessageListWithOptions(function (prev) {
              let messageList = newMessageList.concat(prev.messageList);
              return {
                messageList,
                options: {
                  doScrollToBottom: false,
                  scrollToMessage: `message-${prev.messageList[0].id}`,
                },
              };
            });
          }
        })
        .finally(function () {
          isFetching.current = false;
        });

      return function () {
        aborted = true;
        controller.abort();
        isFetching.current = false;
      };
    },
    [user, config, forceFetchMore],
  );

  useEffect(
    function () {
      let { options } = messageListWithOptions;

      // After fetching and rendering the first batch of messages, scroll to the bottom
      if (options.doScrollToBottom) {
        scrollToBottomChatView();
        setMessageListWithOptions((p) => ({
          ...p,
          options: {
            ...p.options,
            doScrollToBottom: false,
          },
        }));
      }
    },
    [messageListWithOptions],
  );

  useLayoutEffect(
    function () {
      let { options } = messageListWithOptions;

      // Persist scroll position after fetching previous messages
      if (options.scrollToMessage) {
        let messageDom = document.getElementById(options.scrollToMessage);
        let containerDom = document.getElementById("portal-chat__content");
        if (messageDom && containerDom) {
          containerDom.scrollTop = messageDom.offsetTop - 20;
        }
        setMessageListWithOptions((p) => ({
          ...p,
          options: {
            ...p.options,
            scrollToMessage: null,
          },
        }));
      }
    },
    [messageListWithOptions],
  );

  let lastCustomerIndexMessage = useMemo(
    function () {
      for (let i = messageList.length - 1; i >= 0; --i) {
        let message = messageList[i];
        if (message.sender === "customer") {
          return i;
        }
      }
      return 0;
    },
    [messageList],
  );

  let addNewMessages = useCallback(function (newMessageList) {
    let newMessageListWithId = newMessageList.map(function (message) {
      return {
        ...message,
        id: ++messageCount,
        createdAt: timeFrom(new Date()),
      };
    });
    setMessageListWithOptions(function ({ messageList, options }) {
      return {
        messageList: messageList.concat(newMessageListWithId),
        options: {
          ...options,
          doScrollToBottom: true, // new message -> scroll to bottom
        },
      };
    });
    return newMessageListWithId.map(({ id }) => id);
  }, []);

  let updateMessage = useCallback(function (messageId, newMessage) {
    setMessageListWithOptions(function (prev) {
      return {
        ...prev,
        messageList: prev.messageList.map(function (message) {
          if (message.id !== messageId) {
            return message;
          }
          return {
            ...newMessage,
            createdAt: timeFrom(new Date()),
          };
        }),
      };
    });
  }, []);

  return {
    messageList,
    setMessageListWithOptions,
    lastCustomerIndexMessage,
    addNewMessages,
    updateMessage,
    fetchMore,
  };
}
