function parsePost(raw) {
  return {
    id: raw.id,
    content: raw.content,
    comments: raw.comments,
  };
}

export default parsePost;
