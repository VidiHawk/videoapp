/**
* Module specific to menuvideo table
*/

const TABLE_NAME = "review";

const FIELDS = {
  ID: "id", 
  TEXT: "text",
  STAR: "star",
  ATTACHMENTS: "attachments",
  USER_ID: "user_id",
  PRODUCT_ID: "product_id",
  CREATE_TIME: "create_time",
  STATUS: "status",
  UPDATE_TIME: "update_time"
}

let review = {};

review.SCHEMA = {
  TABLE_NAME,
  FIELDS
}

module.exports = review;