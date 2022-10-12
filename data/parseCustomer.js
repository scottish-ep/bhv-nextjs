function parseCustomer(raw) {
  return {
    id: raw.user_id,
    customer_id: raw.customer ? raw.customer.id : null,
    name: raw.fullname,
    phone: raw.phone_number ? raw.phone_number : "",
    facebook: raw.user_id ? raw.user_id : "",
    pfpURL: raw.profile_src,
    badge: "",
    badgeTooltip: "Loại KH",
    latestMessage: raw.last_message
      ? {
          content: raw.last_message,
          time: raw.last_message_sended_at,
        }
      : raw.message
      ? {
          content: raw.message.message,
          time: raw.last_message_sended_at,
        }
      : null,
    tagList: [],
    isSeen: raw.is_read_by,
    phoneMessageId: raw.phone_message_id ? raw.phone_message_id : null,
    hasComment: raw.has_comment == "1" || raw.has_comment == 1 ? true : false,
    hasMessage: raw.has_message == "1" || raw.has_message == 1 ? true : false,
    isChatWith: raw.is_taken_by ? raw.is_taken_by : [],
    customerShortDetail: raw.social_account && raw.social_account.name ? raw.social_account.name : "",
    customerDetail: {
      joinTime: raw.join_time,
      email: "",
      phone:raw.phone_number,
      gender: raw.gender == "male" ? "Nam" : "Nữ",
      address: "",
      totalOrderCount:
        raw.total_orders && raw.total_orders.total_orders.length
          ? raw.total_orders.total_orders.length
          : 0,
      transferOrderCount:
        raw.transfer_orders && raw.transfer_orders.transfer_orders.length
          ? raw.transfer_orders.transfer_orders.length
          : 0,
    },
    conversation_info: raw.conversation_info,
    systemTag: raw.facebook_system_tag,
    //fb_page_string_id : raw.fb_page_string_id,
    social_id : raw.social_id,
    social_account: raw.social_account,
    //social_account_personal: raw.social_account_personal,
    conversation_link: raw.conversation_link,
  };
}

export default parseCustomer;
