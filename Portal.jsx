import React, { useState } from "react";
import ReactDOM from "react-dom";
import PortalChatSettings from "./components/PortalChatSettings";
import PortalChat from "./components/PortalChat";
import { EnumSettingOption, useSettings } from "./hooks/useSettings";
import "regenerator-runtime/runtime";
import "core-js/stable";

function Portal() {
  let { settings, updateSetting, updateMultipleSettings } = useSettings({
    [EnumSettingOption.SEARCH]: "",
    [EnumSettingOption.FILTER_PHONE_NUMBER]: 0,
    [EnumSettingOption.FILTER_NOT_READ]: 0,
    [EnumSettingOption.FILTER_NOT_REPLY]: 0,
    [EnumSettingOption.FILTER_NEW]: 0,
    [EnumSettingOption.FILTER_CONVERSATION]: "all",
    [EnumSettingOption.FILTER_FANPAGE]: "",
    [EnumSettingOption.FILTER_STAFF]: "",
    [EnumSettingOption.FILTER_DATETIME_FROM]: "",
    [EnumSettingOption.FILTER_DATETIME_TO]: "",
    [EnumSettingOption.SORT_BY_TIME]: 1,
    [EnumSettingOption.SORT_BY_SEEN_FIRST]: 0,
    [EnumSettingOption.SORT_BY_NOT_SEEN_FIRST]: 0,
  });

  let { clearData, setClearData } = useState(false);
  const [openSetting, setOpenSetting] = useState(false);

  return (
    <div id="portal-page">
      <PortalChatSettings
        settings={settings}
        updateSetting={updateSetting}
        updateMultipleSettings={updateMultipleSettings}
        setClearData={setClearData}
        openSetting={openSetting}
        closeSetting={() => setOpenSetting(false)}
      />
      <PortalChat
        settings={settings}
        updateSetting={updateSetting}
        setOpenSetting={setOpenSetting}
      />
    </div>
  );
}

ReactDOM.render(<Portal />, document.getElementById("root"));
