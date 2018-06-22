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

class JetLog extends DataStream {
    constructor(...args) {
        super(...args);

        this.on("options", () => this._handleOptions());
        this._handleOptions();
    }

    _handleOptions() {
        const {read_level, fetch_line, origin} = Object.assign(this.constructor.defaults, this._options);

        this._jetlog_originator = origin;
        this._jetlog_fetch_trace = fetch_line;
        this._jetlog_read_level = this.constructor.levels[read_level];

        this.constructor.functions.forEach(
            (funcName) => {
                if (this.constructor.levels[funcName] < this._jetlog_read_level) {
                    this[funcName] = this.message;
                } else if (this.hasOwnProperty(funcName)) {
                    delete this[funcName];
                }
            }
        );
    }

    level(value) {
        if (typeof value !== 'number') {
            if (!(value in this.constructor.levels))
                throw new Error(`Unknown log level ${value}`);
            value = this.constructor.levels[value];
        }

        return this.filter(({level}) => level < this._jetlog_read_level);
    }

    async message(level, msg, ...extra) {
        const stack = this._jetlog_fetch_trace ? getStack(1) : null;
        const obj = new Entry(msg, level, this._jetlog_originator, stack, extra);
        return this.whenWrote(obj);
    }

    error() {}
    warn() {}
    log() {}
    info() {}
    debug() {}
    trace() {}

}

JetLog.functions = ['error', 'warn', 'log', 'info', 'debug', 'trace'];

JetLog.levels = {
    'silent': 0,
    'error': 1,
    'warn': 2,
    'log': 3,
    'info': 4,
    'debug': 5,
    'trace': 6,
    'verbose': 6,
    'all': Infinity
};

JetLog.defaults = {
    read_level: 'all',
    fetch_line: true,
    origin: 'jetlog'
};


module.exports = {JetLog};
