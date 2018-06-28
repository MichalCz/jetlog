const {JetLog} = require("./lib/jetlog");
const {Entry} = require("./lib/entry");
const {testEnv, getEnv} = require("./lib/env-default");

const getLog = (origin, out, reporter, filter) => {
    const logger = new JetLog({origin})
        .catch(e => `Invalid log entry in ${e && e.stack && e.stack.split("\n")[1]}`);

    const output = logger.use(reporter)

    if (filter)
        output
            .filter(
                ({text}) => filters.find(needle => text.indexOf(needle) >= 0)
            );

    if (out)
        output.pipe(process.stderr);

    return logger;
};

const defaultLogger = getLog(
    "jetlog",
    testEnv("JETLOG", true),
    getEnv("JETLOG_REPORTER", "./lib/entry-reporter"),
    testEnv("JETLOG_FILTER") ? getEnv("JETLOG_FILTER").split(/\s+/) : null
);

module.exports = defaultLogger;
module.exports.getLog = getLog;
module.exports.JetLog = JetLog;
module.exports.Entry = Entry;
