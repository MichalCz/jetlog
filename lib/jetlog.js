const {DataStream} = require("scramjet");
const {Entry} = require("./entry");

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
 * Main jetlog class.
 *
 * @memberof module:jetlog
 */
class JetLog extends DataStream {

    constructor(...args) {
        super(...args);

        this.on("options", () => this._handleOptions());
        this._handleOptions();
    }

    _handleOptions() {
        const {
            read_level,
            fetch_line,
            keep_size,
            origin
        } = Object.assign(this.constructor.defaults, this._options);

        this._jetlog_originator = origin;
        this._jetlog_fetch_trace = fetch_line;
        this._jetlog_read_level = typeof read_level === "number" ? read_level : this.constructor.levels[read_level];

        // this.keep(keep_size);

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

    async message(level, msg, ...extra) {
        const stack = this._jetlog_fetch_trace ? getStack(2) : null;
        const obj = new Entry(msg, level, this._jetlog_originator, stack, extra);
        return this.whenWrote(obj);
    }

    async error() {
        return Promise.resolve();
    }
    async warn() {
        return Promise.resolve();
    }
    async log() {
        return Promise.resolve();
    }
    async info() {
        return Promise.resolve();
    }
    async debug() {
        return Promise.resolve();
    }
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

JetLog.defaults = {
    read_level: Infinity,
    keep_size: 1e2,
    fetch_line: true,
    origin: "jetlog"
};


module.exports = {JetLog};
