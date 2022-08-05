let BASE_URL = "";
let API_BASE_URL = "";
let PORT = "4003";
let IMG_END_POINT = "";
let CDN_BUCKET_URL = "";
let PRODUCTION = true;
let SERVICE_WORKER = process.env.SERVICE_WORKER;
let FIREBASE_CONFIG = {};
let SHOPIFY_CONFIG = {};

switch (process.env.NODE_APP) {
  case "demo":
    BASE_URL = "https://www.emkbeverlyhills.com";
    API_BASE_URL = "https://api.emkbeverlyhills.com/api";
    IMG_END_POINT = "https://storage.googleapis.com/emk_video_store";
    CDN_BUCKET_URL = "https://storage.googleapis.com/emk-beverly-hills-mvp";
    PORT = 4003;
    FIREBASE_CONFIG = {
      apiKey: "AIzaSyDq1QGour8SA6icZvbv72Ouy5Ram8yvSWM",
      authDomain: "rapid-stage-289208.firebaseapp.com",
      databaseURL: "https://rapid-stage-289208.firebaseio.com",
      projectId: "rapid-stage-289208",
    };
    SHOPIFY_CONFIG = {
      API_ENDPOINT: "https://shop.emkbeverlyhills.com/api/2020-10/graphql.json",
      STOREFRONT_ACCESS_TOKEN: "c1de63a9bba0c7b302561794c0eb3e66",
      SHOPIFY_SECRET:
        "742d031a27fc6c51675d7f88f0b1db32c69a873b6b3509b84a0d78382dcbec5e",
    };
    PRODUCTION = true;
    break;

  case "production":
    BASE_URL = "https://dev.emkbeverlyhills.com";
    API_BASE_URL = "https://devapi.emkbeverlyhills.com/api";
    IMG_END_POINT = "https://storage.googleapis.com/emk_video_store";
    CDN_BUCKET_URL = "https://storage.googleapis.com/emk-beverly-hills-mvp";
    PORT = 4003;
    FIREBASE_CONFIG = {
      apiKey: "AIzaSyDq1QGour8SA6icZvbv72Ouy5Ram8yvSWM",
      authDomain: "rapid-stage-289208.firebaseapp.com",
      databaseURL: "https://rapid-stage-289208.firebaseio.com",
      projectId: "rapid-stage-289208",
    };
    SHOPIFY_CONFIG = {
      API_ENDPOINT: "https://shop.emkbeverlyhills.com/api/2020-10/graphql.json",
      STOREFRONT_ACCESS_TOKEN: "c1de63a9bba0c7b302561794c0eb3e66",
      SHOPIFY_SECRET:
        "742d031a27fc6c51675d7f88f0b1db32c69a873b6b3509b84a0d78382dcbec5e",
    };
    PRODUCTION = true;
    break;

  default:
    BASE_URL = "http://localhost:4003";
    API_BASE_URL = "http://localhost:4000/api";
    // API_BASE_URL = 'https://devapi.emkbeverlyhills.com/api'
    IMG_END_POINT = "https://storage.googleapis.com/emk_video_store";
    CDN_BUCKET_URL = "https://storage.googleapis.com/emk-beverly-hills-mvp";
    PORT = 4003;
    FIREBASE_CONFIG = {
      apiKey: "AIzaSyDq1QGour8SA6icZvbv72Ouy5Ram8yvSWM",
      authDomain: "rapid-stage-289208.firebaseapp.com",
      databaseURL: "https://rapid-stage-289208.firebaseio.com",
      projectId: "rapid-stage-289208",
    };
    SHOPIFY_CONFIG = {
      API_ENDPOINT: "https://shop.emkbeverlyhills.com/api/2020-10/graphql.json",
      STOREFRONT_ACCESS_TOKEN: "c1de63a9bba0c7b302561794c0eb3e66",
      SHOPIFY_SECRET:
        "742d031a27fc6c51675d7f88f0b1db32c69a873b6b3509b84a0d78382dcbec5e",
    };
    PRODUCTION = false;
}

let DEFAULT_METADATA = {
  TITLE: "EMK Skincare Video Shop",
  KEYWORDS:
    "video website, emk skincare, green beauty products, anti-aging skincare products",
  DESCRIPTION:
    "Try EMK’s new video shop today and shop all your favorite green beauty products. EMK offers a full range of super potent anti-aging skincare products for sensitive skin. See the latest dermatologists and celebrities recommendations of EMK products.",
  SOCIAL_TITLE: "EMK Skincare Video Shop",
  OG_DESCRIPTION:
    "Try EMK’s new video shop today and shop all your favorite green beauty products. EMK offers a full range of super potent anti-aging skincare products for sensitive skin. See the latest dermatologists and celebrities recommendations of EMK products.",
  OG_IMAGE: `${BASE_URL}/images/ogImage.jpg`,
  BASE_URL: BASE_URL,
};

let config = {
  ENV: process.env.NODE_APP,
  SERVICE_WORKER,
  BASE_URL,
  PORT,
  IMG_END_POINT,
  CDN_BUCKET_URL,
  API_BASE_URL,
  SHOPIFY_CONFIG,
  FIREBASE_CONFIG,
  DEFAULT_METADATA,
  SITE_ID: "xsandlriehwmqpdhk",
  DEFAULT_CATEGORY_SLUG: "whats-new",
  DEFAULT_PARENT_CATEGORY_SLUG: "discover",
  CONTACT_EMAIL: "info@vidiren.com",
  GOOGLE_KEY: "AIzaSyDq1QGour8SA6icZvbv72Ouy5Ram8yvSWM",
};

export default config;
