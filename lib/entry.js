const {inspect} = require("util");

/**
 * Entry class
 */
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
         * @prop {string}
         */
        this.msg = msg;
        /**
         * @prop {number}
         */
        this.level = level;
        /**
         * @prop {Object|string}
         */
        this.origin = origin;
        /**
         * @prop {CallSite}
         */
        this.stack = stack;
        /**
         * @prop {Object[]}
         */
        this.extra = extra;
    }

    /**
     * @type String
     */
    get message () {
        return this.msg;
    }

    /**
     * Exposes text representation for indexing
     * @internal
     */
    get text() {
        const value = inspect(this, {depth: 3});
        Object.defineProperty(this, "text", {value, writable: false});
        return value;
    }
};

module.exports = Entry;
