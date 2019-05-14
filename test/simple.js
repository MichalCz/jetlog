const {JetLog} = require("../");
const {Readable} = require("stream");

module.exports = {
    test_proto(test) {
        test.expect(10);

        const defaultLogger = require("../");

        test.ok(JetLog && JetLog.prototype && JetLog.prototype instanceof Readable, "Module exports a class derived from readable");
        test.equals(typeof JetLog.prototype.level, "function", "Exposes level method");
        test.equals(typeof JetLog.prototype.message, "function", "Exposes message method");
        test.equals(typeof JetLog.prototype.error, "function", "Exposes error method");
        test.equals(typeof JetLog.prototype.warn, "function", "Exposes warn method");
        test.equals(typeof JetLog.prototype.log, "function", "Exposes log method");
        test.equals(typeof JetLog.prototype.info, "function", "Exposes info method");
        test.equals(typeof JetLog.prototype.debug, "function", "Exposes debug method");
        test.equals(typeof JetLog.prototype.trace, "function", "Exposes trace method");

        test.ok(defaultLogger instanceof JetLog, "Exposes default logger");

        test.done();
    },
    async test_dynamic(test) {
        test.expect(6);

        const logger = new JetLog()
            .catch(e => test.fail(e));

        test.ok(logger.log("Test1") instanceof Promise, "Logging a message is asynchronous.");
        await logger.error("Test2");
        test.ok(true, "Write promise resolves.");

        const errors = logger.level("error");
        const all = logger.level("all");

        const err = await errors.whenRead();
        const all1 = await all.whenRead();
        const all2 = await all.whenRead();

        test.equals(err.message, "Test2", "Error log shows only one message");
        test.equals(all1.message, "Test1", "All log gets all messages");
        test.equals(all2.message, "Test2", "All log includes errors also");

        test.equals(err.origin, "jetlog", "Origin is correct");

        test.done();
    },
    async defaultOutput(test) {

        const logger = require("../");
        logger.info("Message1");
        logger.log("Message2");
        logger.error("Message3!");

        test.done();
    }
};
