module.exports = class Entry {
    constructor(msg, level, name, stack, extra) {
        this.msg = msg;
        this.level = level;
        this.name = name;
        this.stack = stack;
        this.extra = extra;
    }
};