const {DataStream} = require("scramjet");
const Entry = require("./entry");

const getStack = function(depth) {
    const p = Error.prepareStackTrace;
    Error.prepareStackTrace = (dummy, stack) => stack;
    const e = new Error();
    Error.captureStackTrace(e, arguments.callee);
    const stack = e.stack;
    Error.prepareStackTrace = p;
    return stack[depth];
};

/**
 * Options for JetLog
 *
 * @internal
 * @typedef JetLogOptions
 * @extends module.scramjet:ScramjetOptions
 * @prop {number|string} [read_level=Infinity] minimum read level, if given, only entries of level ≤ will get processed.
 * @prop {boolean} [read_trace=true] should the stack trace be read to identify log line and file.
 * @prop {string} [origin="JetLog"] a name for the logger
 */

/**
 * Main jetlog class.
 *
 * @name JetLog
 * @lends jetlog
 * @class
 * @extends module:scramjet.DataStream
 */
class JetLog extends DataStream {

    /**
     * Constructor of jetlog
     *
     * @param {JetLogOptions} options options for the logger.
     */
    constructor(options) {
        super(options);

        this.on("options", () => this._handleOptions());
        this._handleOptions();
    }

    _handleOptions() {
        const {
            read_level,
            read_trace,
            origin
        } = Object.assign(this.constructor.defaults, this._options);

        this._jetlog_originator = origin;
        this._jetlog_read_trace = read_trace;
        this._jetlog_read_level = typeof read_level === "number" ? read_level : this.constructor.levels[read_level];

        this.constructor.functions.forEach(
            (funcName) => {
                const level = this.constructor.levels[funcName];
                if (level < this._jetlog_read_level) {
                    this[funcName] = (...args) => this.message(level, ...args);
                } else if (this.hasOwnProperty(funcName)) {
                    delete this[funcName];
                }
            }
        );
    }

    /**
     * Fetches a new
     *
     * @param {number} value the requested log level
     * @returns {JetLog}
     */
    level(value) {
        if (typeof value !== "number") {
            if (!(value in this.constructor.levels))
                throw new Error(`Unknown log level ${value}`);
            value = this.constructor.levels[value];
        }

        return this.tap().filter(
            ({level}) => level <= value
        );
    }

    /**
     * Message method - should not be called directly.
     *
     * @private
     * @param {number} level
     * @param {string} msg
     * @param {Object[]} extra
     */
    async message(level, msg, ...extra) {
        const stack = this._jetlog_read_trace ? getStack(2) : null;
        const obj = new Entry(msg, level, this._jetlog_originator, stack, extra);
        return this.whenWrote(obj);
    }

    /**
     * Error method - adds a message to the log at level 1
     * @async
     */
    async error() {
        return Promise.resolve();
    }
    /**
     * Warn method - adds a message to the log at level 2
     * @async
     */
    async warn() {
        return Promise.resolve();
    }
    /**
     * Log method - adds a message to the log at level 3
     * @async
     */
    async log() {
        return Promise.resolve();
    }
    /**
     * Info method - adds a message to the log at level 4
     * @async
     */
    async info() {
        return Promise.resolve();
    }
    /**
     * Debug method - adds a message to the log at level 5
     * @async
     */
    async debug() {
        return Promise.resolve();
    }
    /**
     * Trace method - adds a message to the log at level 6
     * @async
     */
    async trace() {
        return Promise.resolve();
    }

}

JetLog.functions = ["error", "warn", "log", "info", "debug", "trace"];

JetLog.levels = {
    "silent": 0,
    "error": 1,
    "warn": 2,
    "log": 3,
    "info": 4,
    "debug": 5,
    "trace": 6,
    "verbose": 6,
    "all": Infinity
};

JetLog.levelNumber = JetLog.functions.reduce(
    (acc, name) => (acc[JetLog.levels[name]] = name, acc),
    {}
);

/**
 * Defaults
 *
 * @type {JetLogOptions}
 */
JetLog.defaults = {
    read_level: Infinity,
    keep_size: 1e2,
    read_trace: true,
    origin: "jetlog"
};

module.exports = JetLog;
