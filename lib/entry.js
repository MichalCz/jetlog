const {inspect} = require("util");

module.exports = class Entry {
    /**
     *
     * @param {string} msg
     * @param {number} level
     * @param {*} originator
     * @param {string} stack
     * @param {Object} extra
     */
    constructor(msg, level, originator, stack, extra) {
        this.ts = new Date();
        this.msg = msg;
        this.level = level;
        this.originator = originator;
        this.stack = stack;
        this.extra = extra;
    }

    get text() {
        const value = inspect(this, {depth: 3});
        Object.defineProperty(this, 'text', {value, writable: false});
        return value;
    }
};
