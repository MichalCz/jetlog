const getLog = require("./getlog");
const JetLog = require("./jetlog");
const Entry = require("./entry");
const {testEnv, getEnv} = require("./env-default");

const defaultLogger = getLog(
    "jetlog",
    testEnv("JETLOG", true),
    getEnv("JETLOG_REPORTER", "./entry-reporter"),
    testEnv("JETLOG_FILTER") ? getEnv("JETLOG_FILTER").split(/\s+/) : null
);

/**
 * The main export is a global instance of the JetLog class automatically.
 *
 * @borrows JetLog as JetLog
 * @borrows Entry as Entry
 * @borrows getLog as getLog
 * @module jetlog
 * @type {JetLog}
 */
module.exports = defaultLogger;
module.exports.JetLog = JetLog;
module.exports.getLog = getLog;
module.exports.Entry = Entry;
