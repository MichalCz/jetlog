const JetLog = require('./jetlog');

/**
 * Creates a new JetLog instance given the parameters below.
 *
 * @lends jetlog
 * @param {Object|string} origin
 * @param {boolean} out push to stdio (1 for stdout, 2 for stderr)
 * @param {string|Function} reporter reporter scramjet module
 * @param {string} filter
 */
module.exports = (origin, out, reporter, filter) => {
    const logger = new JetLog({origin})
        .catch(e => `Invalid log entry in ${e && e.stack && e.stack.split("\n")[1]}`);

    const output = logger.use(reporter)

    if (filter) {
        const filters = filter.split(' ');
        output
            .filter(
                ({text}) => filters.find(needle => text.indexOf(needle) >= 0)
            );
    }

    if (out)
        output.pipe(process.stderr);

    return logger;
};
