module.exports = [
  "strapi::errors",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        directives: {
          "script-src": ["'self'", "'unsafe-inline'", "localhost:3000"],
          "connect-src": ["'self'", "https:", "localhost:1337"],
          "img-src": ["'self'", "data:", "cdn.jsdelivr.net", "strapi.io"],
        },
      },
    },
  },
  "strapi::poweredBy",
  {
    name: "strapi::cors",
    config: {
      enabled: true,
      headers: "*",
      origin: [
        "http://localhost:1337",
        "http://localhost:8000",
        "https://golfbox.sveitan.is",
        "https://golfbox.sveitan.is/getTournaments",
        "https://golfbox.sveitan.is/getLeaderboard",
      ],
    },
  },
  "strapi::logger",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
