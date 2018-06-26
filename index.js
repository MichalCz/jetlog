const {JetLog} = require("./lib/jetlog");
const {testEnv, getEnv} = require("./lib/env-default");

const defaultLogger = new JetLog()
    .use(getEnv("JETLOG_REPORTER", "./lib/entry-reporter"))
    .catch(e => `Invalid log entry in ${e && e.stack && e.stack.split("\n")[1]}`);

if (testEnv("JETLOG", true)) {
    defaultLogger
        .pipe(process.stdout);
}

if (testEnv("JETLOG_FILTER")) {
    const filters = getEnv("JETLOG_FILTER").split(/\s+/);
    defaultLogger
        .filter(
            ({text}) => filters.find(needle => text.indexOf(needle) >= 0)
        );
}

module.exports = defaultLogger;
module.exports.JetLog = JetLog;
