const getLog = require("./getlog");
const JetLog = require("./jetlog");
const Entry = require("./entry");
const {testEnv, getEnv} = require("./env-default");

/**
 * The main export is a global instance of the JetLog class automatically.
 *
 * @module jetlog
 */

/**
 * @type {JetLog}
 */
module.exports = getLog(
    "jetlog",
    testEnv("JETLOG", true),
    getEnv("JETLOG_REPORTER", "./entry-reporter"),
    testEnv("JETLOG_FILTER") ? getEnv("JETLOG_FILTER").split(/\s+/) : null
);

/** @ignore */
module.exports.JetLog = JetLog;
/** @ignore */
module.exports.getLog = getLog;
/** @ignore */
module.exports.Entry = Entry;
