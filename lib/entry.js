const {inspect} = require("util");

class Entry {
    /**
     * Single JetLog entry
     *
     * @param {string} msg
     * @param {number} level
     * @param {*} origin
     * @param {CallSite} stack
     * @param {Object} extra
     */
    constructor(msg, level, origin, stack, extra) {
        /**
         * @prop {Date}
         */
        this.ts = new Date();
        /**
         *
         * @prop {String}
         */
        this.msg = msg;
        this.level = level;
        this.origin = origin;
        this.stack = stack;
        this.extra = extra;
    }

    /**
     * @type String
     */
    get message () {
        return this.msg;
    }

    get text() {
        const value = inspect(this, {depth: 3});
        Object.defineProperty(this, "text", {value, writable: false});
        return value;
    }
};

module.exports = {Entry};
