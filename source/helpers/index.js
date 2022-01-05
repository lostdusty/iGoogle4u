function raise(reason) {
  throw new Error(reason);
}

function ensureEnvExists(key) {
  return process.env[key] || raise(`Missing ${key} environment variable`);
}

module.exports = {
  ensureEnvExists,
};
