/**
* Module specific to video table
*/

const TABLE_NAME = "videos";
const FIELDS = {
  ID: "id",
  SITE_ID: "site_id",
  NAME: "name",
  DISPLAY_NAME: "display_name",
  SRT: "srt",
  LIKE: "like",
  CREATE_TIME: "create_time",
  UPDATE_TIME: "update_time",
  DELETE_TIME: "delete_time",
  POSTER: "poster",
  THUMBNAIL: "thumbnail",
  SLUG: "slug",
  DESCRIPTION: "description",
  DURATION: "duration",
  HLS_MASTER_PUBLIC_URL: "hls_master_public_url",
  CAPTION_URL: "caption_url",
  ALT_TEXT: "alt_text",
  LINKED_PRODUCT_ID: "linked_product_id",
  LINKED_VIDEO_ID: "linked_video_id",
  SHOW_LINK_BUTTON: "show_link_button",
  LINKED_BUTTON_TEXT: "linked_button_text"
}

let video = {};

video.SCHEMA = {
  TABLE_NAME,
  FIELDS
}

module.exports = video;