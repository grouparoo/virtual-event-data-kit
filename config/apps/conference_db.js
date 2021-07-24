exports.default = async function buildConfig() {
  const options = parseURL();
  return [
    {
      class: "App",
      id: "conference_db",
      name: "Conference DB",
      type: "postgres",
      options,
    },
  ];
};

function parseURL() {
  // fetch warehouse connection from DATABASE_URL
  const parsed = new URL(process.env.DATABASE_URL);
  const options = {
    user: undefined,
    password: undefined,
    host: undefined,
    database: undefined,
    port: undefined,
    ssl: undefined,
    schema: "public",
  };
  if (parsed.username) options.user = parsed.username;
  if (parsed.password) options.password = parsed.password;
  if (parsed.hostname) options.host = parsed.hostname;
  if (parsed.port) options.port = parsed.port;
  if (parsed.pathname) options.database = parsed.pathname.substring(1);

  if (process.env.DATABASE_SSL_SELF_SIGNED?.toLowerCase() === "true") {
    options.ssl = "true";
  }
  return options;
}
