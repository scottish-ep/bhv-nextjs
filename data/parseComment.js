function parseComment(raw) {
  return {
    id: raw.id,
    name: raw.user
      ? (raw.user.fullname ? raw.user.fullname : ((raw.user.first_name ? raw.user.first_name : "") + " " + (raw.user.last_name ? raw.user.last_name : "")))
      : raw.page
      ? raw.page.name
      : "Fanpage",
    imgUrl: raw.user
      ? raw.user.profile_src
      : raw.page && raw.page.logo_src
      ? raw.page.logo_src
      : "https://i.imgur.com/PUOEe5r.jpg",
    pfpURL: "",
    facebook: "#",
    content: raw.message,
    photo: raw.photo,
    sendTime: raw.created_at,
    commentId: raw.comment_id,
    replies: raw.replies,
  };
}

export default parseComment;
