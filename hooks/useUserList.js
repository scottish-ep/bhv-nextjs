import { useCallback, useEffect, useRef, useState } from "react";
import parseCustomer from "../data/parseCustomer";
import { request } from "../utils/request";
import { EnumSettingOption } from "./useSettings";

export function useUserList(settings) {
  let [userList, setUserList] = useState([]);
  let [page, setPage] = useState(1);

  useEffect(
    function () {
      setUserList([]);
      setPage(1);
    },
    [settings],
  );

  useEffect(
    function () {
      window.CURRENT_REQ_LOAD_CUSTOMER_DATA = window.CURRENT_REQ_LOAD_CUSTOMER_DATA + 1;
      let current_req_index = window.CURRENT_REQ_LOAD_CUSTOMER_DATA;
      window.LoadDataPopup("load_customer_list_popup","block");
      let time_out = 2000;
      setTimeout(() => {
        if(current_req_index < window.CURRENT_REQ_LOAD_CUSTOMER_DATA){
          return;
        }

        let search = new URLSearchParams({ ...settings, page }).toString();
        let url = `/portal/facebook/users?${search}`;

        let controller = new AbortController();
        let aborted = false;
    
        request(url, { signal: controller.signal }).then(function (rawUserList) {
          if (aborted) {
            return;
          }
          if(page==1 && rawUserList.length==0){
            //request BE to pull customer data
            Promise.all([
              fetch('/portal/facebook/users/pull-customer-data',{
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
                },
                body: JSON.stringify(settings)
              }).then(response => {
                //do notthing
              })
              .catch(error =>{
                console.log(error)
              })
            ])
          }
          setUserList((currentList) => currentList.concat(rawUserList.map(parseCustomer)));
          window.LoadDataPopup("load_customer_list_popup","none");

          if(rawUserList.length==0 || rawUserList.length==1 || userList.length%rawUserList.length!=0){
            window.showNoResultPopup("load_customer_list_popup");
          }
          window.CURRENT_REQ_LOAD_CUSTOMER_DATA = 0;
        });
      }, time_out);

      
      /*return function () {
        controller.abort();
        aborted = true;
      };*/
    },
    [settings, page],
  );

  let fetchMore = useCallback(function () {
    setPage((p) => p + 1);
  }, []);

  let updateUserSeenState = useCallback(
    function (pageID,userId,newSeenState) {
      fetch("/portal/facebook/users/read/" + userId);

      Promise.all([
        fetch("/portal/facebook/users/read",{
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
          },
          body: JSON.stringify({
            page_id:pageID,
            user_id:userId
          })
        }).then(response => {
          //do notthing
        })
        .catch(error =>{
          console.log(error)
        })  

      ]);

      setUserList(function (userList) {
        return userList.map(function (user) {
          if (user.id !== userId) {
            return user;
          }
          return {
            ...user,
            isSeen: newSeenState,
          };
        });
      });
    },
    [setUserList],
  );

  let lastQueryMessage = useRef(null);
  let updateUserSupporterList = useCallback(
    /**
     * Add current staff to a user's supporter list
     * @param {number} userId
     * @param {"add" | "remove"} action
     * @returns {boolean} true/false <=> support successfully or not
     */
    function (pageId,userId, action = "add") {
      if (action === "add") {
        let now = new Date().getTime();
        if (lastQueryMessage.current) {
          let lastQueryTime = lastQueryMessage.current;
          if (Math.round((now - lastQueryTime) / 1000) < 5) {
            window.alertDanger("Không thể nhận chăm sóc cách nhau ít hơn 5s");
            return false;
          }
        }
        lastQueryMessage.current = now;
      }

      let currentStaff = window.__CURRENT__USER__;
      setUserList(function (userList) {
        return userList.map(function (user) {
          if (user.id !== userId) {
            return user;
          }
          let oldList = user.isChatWith || [];
          if (action === "add") {
            if (oldList.includes(currentStaff)) {
              return user;
            }
            return {
              ...user,
              isChatWith: oldList.concat(currentStaff),
            };
          }
          if (action === "remove") {
            if (!oldList.includes(currentStaff)) {
              return user;
            }
            let newList = oldList.filter((staff) => staff !== currentStaff);
            return {
              ...user,
              isChatWith: newList,
              isSeen: false,
            };
          }
          return user;
        });
      });

      if (action === "add") {
        // Add current staff to user's support list (in backend)
        fetch(`/portal/facebook/users/taken/${pageId}/${userId}`);
      } else if (action === "remove") {
        // Remove current staff from this user's supporter list
        fetch(`/portal/facebook/users/remove-taken/${pageId}/${userId}`);
      }

      return true;
    },
    [setUserList],
  );

  return {
    userList,
    setUserList,
    fetchMore,
    updateUserSeenState,
    updateUserSupporterList,
  };
}
