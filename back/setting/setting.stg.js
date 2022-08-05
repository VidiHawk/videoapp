const settings = {
  "config": {
    "ENV": process.env["NODE_ENV"] || "stg",
    "PORT": process.env["PORT"],
    "COOKIE_DOMAIN": process.env["COOKIE_DOMAIN"],
    "LOG": {
      "PATH": process.env["LOG_PATH"],
      "LEVEL": process.env["LOG_LEVEL"] || "info"
    },
    "REDIS":{
      "PORT":process.env["REDIS:PORT"],
      "HOST":process.env["REDIS:HOST"],
      "PASSWORD":process.env["REDIS:PASSWORD"]
    },
    "SQL":{
      "HOST":process.env["SQL:HOST"],
      "PORT":process.env["SQL:PORT"],
      "USERNAME":process.env["SQL:USERNAME"],
      "PASSWORD":process.env["SQL:PASSWORD"],
      "DB_NAME":process.env["SQL:DB_NAME"],
      "DIALECT":process.env["SQL:DIALECT"],
    },
    "JWT": {
      "SECRET": process.env["JWT:SECRET"]
    },
    "SENDGRID": {
      "API_KEY": process.env["SENDGRID_API_KEY"],
      "TEMPLATES": {
        "NEWSLETTER_EMAIL_CONFIRMATION": "d-db9903acc18f4bc0be91fad92da891e0",
        "RESET_PASSWORD": "d-4761bbf287404f0bb65b2b131ade722b"
      },
      "EMAIL_LIST": {
        "VIDIREN_HOST": "info@vidiren.com"
      }
    },
    "WEBSITE_HOST_URL": "http://35.241.106.215:4003/"
  }
};

module.exports = settings;


module.exports = settings;
