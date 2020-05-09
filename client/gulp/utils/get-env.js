const DEFAULT_TO_LOCAL = true;
const EnvTargets = {
  LOCAL: 'local',
  STAGING: 'staging',
  PRODUCTION: 'production',
};

module.exports = function (RAW_ENV) {
  const ENV = EnvTargets[RAW_ENV] || (DEFAULT_TO_LOCAL ? EnvTargets.LOCAL : null);
  if (!ENV) {
    throw new Error(`Invalid client build ENV "${process.env.ENV}"`);
  }
  return ENV;
};