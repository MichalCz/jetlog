import {DataStream} from "scramjet";

declare class JetLog extends DataStream {
    /**
     * Constructor of jetlog
     * @param options options for the logger.
     */
    constructor(options: JetLogOptions);


    /**
     * Fetches a new
     * @param value the requested log level
     * @returns
     */
    level(value: number): JetLog;

    /**
     * Error method - adds a message to the log at level 1
     */
    error(): Promise<any>;

    /**
     * Warn method - adds a message to the log at level 2
     */
    warn(): Promise<any>;

    /**
     * Log method - adds a message to the log at level 3
     */
    log(): Promise<any>;

    /**
     * Info method - adds a message to the log at level 4
     */
    info(): Promise<any>;

    /**
     * Debug method - adds a message to the log at level 5
     */
    debug(): Promise<any>;

    /**
     * Trace method - adds a message to the log at level 6
     */
    trace(): Promise<any>;

    /**
     * Defaults
     */
    static defaults: JetLogOptions;

}

/**
 * The main export is a global instance of the JetLog class automatically.
 */
declare module 'jetlog' {
    /**
     * Entry class
     */
    class Entry {
        /**
         * Single JetLog entry
         * @param msg
         * @param level
         * @param origin
         * @param stack
         * @param extra
         */
        constructor(msg: string, level: number, origin: any, stack: CallSite, extra: Object);

        ts: any;

        msg: any;

        level: any;

        origin: any;

        stack: any;

        extra: any;

        message: String;

        /**
         * Exposes text representation for indexing
         */
        text: any;

    }

}

