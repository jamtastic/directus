// Docs: https://docs.directus.io/self-hosted/config-options/

let environment = "development"

// * Common defaults

let config = {
  // Host and port will always be accessed behind a reverse proxy
	HOST: '0.0.0.0',
	PORT: 8055,

  PUBLIC_URL: "/",

	RATE_LIMITER_ENABLED: false,
  RATE_LIMITER_MEMCACHE: "localhost:5109",
  RATE_LIMITER_POINTS: 25,
  RATE_LIMITER_DURATION: 1,

  CACHE_ENABLED: false,
  CACHE_STORE: "memory",

  ASSETS_CACHE_TTL: "30m",

  STORAGE_LOCATIONS: "local",
  STORAGE_LOCAL_DRIVER: "local",
  STORAGE_LOCAL_ROOT: "./.local/uploads",

  // TODO: Replace with production tokens dynamically
  KEY: "ba51fa79-0e5e-432d-aa00-b378358c4cf0",
  SECRET: "xwZR-pZdWFaIb3iepjaEZBntIISDkvFm",

  ACCESS_TOKEN_TTL: "15m",
  REFRESH_TOKEN_TTL: "7d",
  REFRESH_TOKEN_COOKIE_SECURE: false,
  REFRESH_TOKEN_COOKIE_SAME_SITE: "lax",
  REFRESH_TOKEN_COOKIE_NAME: "directus_refresh_token",

  CORS_ENABLED: true,
  CORS_ORIGIN: true,
  CORS_METHODS: "GET,POST,PATCH,DELETE",
  CORS_ALLOWED_HEADERS: "Content-Type,Authorization",
  CORS_EXPOSED_HEADERS: "Content-Range",
  CORS_CREDENTIALS: true,
  CORS_MAX_AGE: 18000,

  AUTH_PROVIDERS: "",

  // * Extensions
  EXTENSIONS_PATH: "./.local/extensions",
  EXTENSIONS_AUTO_RELOAD: environment === 'development',

  EMAIL_FROM: "no-reply@directus.io",
  EMAIL_TRANSPORT: "sendmail",
  EMAIL_SENDMAIL_NEW_LINE: "unix",
  EMAIL_SENDMAIL_PATH: "/usr/sbin/sendmail",
}

// * Database

switch (environment) {
  case 'production':
    config.DB_CLIENT="pg"
    config.DB_HOST="localhost"
    config.DB_PORT=5432
    config.DB_DATABASE="directus"
    config.DB_USER="postgres"
    config.DB_PASSWORD="secret"
    break
  default:
    config.DB_CLIENT = "sqlite3"
    config.DB_FILENAME = "/Users/ben/.local/share/git/github.com/distingita/backend/.local/data.db"
}


if (environment == 'development') {
  config.ADMIN_EMAIL = "admin@example.com"
  config.ADMIN_PASSWORD = "password"
}

module.exports = config