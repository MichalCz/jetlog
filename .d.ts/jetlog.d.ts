/**
 * Options for JetLog
 */
declare interface JetLogOptions {
    /**
     * minimum read level, if given, only entries of level ≤ will get processed.
     */
    read_level?: number | string;
    /**
     * should the stack trace be read to identify log line and file.
     */
    read_trace?: boolean;
    /**
     * a name for the logger
     */
    origin?: string;
}

declare class JetLog {
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
    error(): Promise;

    /**
     * Warn method - adds a message to the log at level 2
     */
    warn(): Promise;

    /**
     * Log method - adds a message to the log at level 3
     */
    log(): Promise;

    /**
     * Info method - adds a message to the log at level 4
     */
    info(): Promise;

    /**
     * Debug method - adds a message to the log at level 5
     */
    debug(): Promise;

    /**
     * Trace method - adds a message to the log at level 6
     */
    trace(): Promise;

    /**
     * Defaults
     */
    static defaults: JetLogOptions;

}

/**
 * Entry class
 */
declare class Entry {
    /**
     * Entry class
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

/**
 * The main export is a global instance of the JetLog class automatically.
 */
declare module 'jetlog' {
    class JetLog {
        /**
         * Constructor of jetlog
         * @param options options for the logger.
         */
        constructor(options: JetLogOptions);

    }

    /**
     * Entry class
     */
    class Entry {
        /**
         * Entry class
         */
        constructor(msg: string, level: number, origin: any, stack: CallSite, extra: Object);

    }

}

