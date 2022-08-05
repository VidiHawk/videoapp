const settings = {
  config: {
    ENV: process.env['NODE_ENV'] || 'dev',
    PORT: process.env['PORT'],
    COOKIE_DOMAIN: process.env['COOKIE_DOMAIN'],
    LOG: {
      PATH: process.env['LOG_PATH'],
      LEVEL: process.env['LOG_LEVEL'] || 'info',
    },
    REDIS: {
      PORT: process.env['REDIS_PORT'],
      HOST: process.env['REDIS_HOST'],
      PASSWORD: process.env['REDIS_PASSWORD'],
    },
    SQL: {
      HOST: process.env['SQL_HOST'],
      PORT: process.env['SQL_PORT'],
      USERNAME: process.env['SQL_USERNAME'],
      PASSWORD: process.env['SQL_PASSWORD'],
      DB_NAME: process.env['SQL_DB_NAME'],
      DIALECT: process.env['SQL_DIALECT'],
    },
    JWT: {
      SECRET: process.env['JWT_SECRET'],
    },
    SENDGRID: {
      API_KEY: process.env['SENDGRID_API_KEY'],
      TEMPLATES: {
        NEWSLETTER_EMAIL_CONFIRMATION: 'd-db9903acc18f4bc0be91fad92da891e0',
        RESET_PASSWORD: 'd-4761bbf287404f0bb65b2b131ade722b',
      },
      EMAIL_LIST: {
        VIDIREN_HOST: 'info@vidiren.com',
      },
    },
    // "WEBSITE_HOST_URL": "http://35.241.106.215:4003/"
    WEBSITE_HOST_URL: 'http://localhost:4003/',
  },
};

module.exports = settings;

module.exports = settings;
