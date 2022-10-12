import { useCallback, useState } from "react";

export let EnumSettingOption = {
  SEARCH: "search_phase",
  FILTER_PHONE_NUMBER: "has_phone_number",
  FILTER_NOT_READ: "not_read",
  FILTER_NOT_REPLY: "not_reply",
  FILTER_NEW: "new",
  FILTER_CONVERSATION: "conversation_type",
  FILTER_FANPAGE: "fanpage",
  FILTER_STAFF: "staff",
  FILTER_DATETIME_FROM: "from",
  FILTER_DATETIME_TO: "to",
  SORT_BY_TIME: "sort_by_time",
  SORT_BY_SEEN_FIRST: "sort_by_seen_first",
  SORT_BY_NOT_SEEN_FIRST: "sort_by_not_seen_first",
};

export function useSettings(defaultSettings) {
  let [settings, setRawSettings] = useState(defaultSettings);

  let updateSetting = useCallback(
    /**
     * Update settings
     * @param {string} name name of the option that needs to be updated (using EnumSettingOption is recommended)
     * @param {string | number | (oldValue: string | number) => string | number} setter a function that compute new value based on the old one, or a value
     */
    function (name, setter) {
      setRawSettings(function (prevSettings) {
        let value = typeof setter === "function" ? setter(prevSettings[name]) : setter;
        return {
          ...prevSettings,
          [name]: value,
        };
      });
    },
    [],
  );

  let updateMultipleSettings = useCallback(function (nameList, valueList) {
    setRawSettings(function (prevSettings) {
      let newSettings = {
        ...prevSettings,
      };
      for (let i = 0; i < nameList.length && i < valueList.length; ++i) {
        let name = nameList[i];
        let value = valueList[i];
        newSettings[name] = value;
      }
      return newSettings;
    });
  }, []);

  return {
    settings,
    updateSetting,
    updateMultipleSettings,
  };
}
