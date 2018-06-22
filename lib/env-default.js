/**
 *
 * @param {string} name
 * @param {boolean} def
 * @param {Object.<string,string>} env
 * @returns {boolean}
 */
const testEnv = (name, def = false, env = process.env) => {
    if (!(name in env)) return def;

    return env[name] && env[name].length && "0n-".indexOf(env[name].trim()[0].toLowerCase()) === -1;
};

/**
 *
 * @param {string} name
 * @param {string} def
 * @param {Object.<string,string>} env
 * @returns {boolean}
 */
const getEnv = (name, def, env = process.env) => {
    if (!(name in env)) return def;

    return env[name];
};

module.exports = {testEnv, getEnv};
