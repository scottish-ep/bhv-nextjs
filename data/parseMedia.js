function parseMedia(raw) {
  return {
    id: raw.id,
    name: raw.name,
    url: raw.url,
    type: raw.type,
    thumbnailSrc: raw.thumbnail_src,
    isSelected: false,
  };
}

export default parseMedia;
