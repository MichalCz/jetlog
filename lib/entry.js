const {inspect} = require("util");

module.exports = class Entry {
    /**
     *
     * @param {string} msg
     * @param {number} level
     * @param {*} origin
     * @param {CallSite} stack
     * @param {Object} extra
     */
    constructor(msg, level, origin, stack, extra) {
        this.ts = new Date();
        this.msg = msg;
        this.level = level;
        this.origin = origin;
        this.stack = stack;
        this.extra = extra;
    }

    get message () {
        return this.msg;
    }

    get text() {
        const value = inspect(this, {depth: 3});
        Object.defineProperty(this, "text", {value, writable: false});
        return value;
    }
};
