# JetLog

Streamed logger with multiple simltaneous output options.

The intention of this module is to allow pushing the log data to an API, some file and still be able to see the data in stdout.

Streams are based on [`scramjet`](https://github.com/signicode/scramjet) so you can use any transforms you like on your streams.

## Default output

```

```

## Usage

Simple version:

```javascript
const logger = require('jetlog');
jetlog.log("Some message", {some_extra: data});
```

More complex version:

```javascript
const {JetLog, Entry} = require('jetlog');

const logger = new JetLog({})
    .catch(e => new Entry("Invalid log entry", e)); // remember to handle errors

logger
    .use("my-decorator-module") // use stream modules to add data to logs
    .toJSONStream() // use `scramjet` transforms to do anything you like to your logs
    .tee(fs.createWriteStream("/var/log/myapp.log")) // push log to file

logger
    .filter(({level}) => level >= 3) // use scramjet functions on entries
    .stringify(myParser) // stringify your log
    .pipe(process.stdout); // pipe anywhere you like

logger
    .level("warn") // level will be assigned to the chained method
    .use("my-reporter") // you can use own reporters
    .pipe(process.stderr);
```

## Environment control

Jetlog's default logger (the one exposed as `module.exports`) behavior can be changed using the following environment variables:

* `JETLOG_REPORTER` - choose reporter module `"./lib/entry-reporter"` by default.
* `JETLOG` - boolean - set to `"0"` to disable stdout.
* `JETLOG_FILTER` - only log if Entry matches any of the words (space separated).

## API

* `module.exports : JetLog` - the default export is a JetLog instance piped to `stdout` using the standard log reporter.
* `module.exports.getLog(name, pipeToOutput, reporter, filterArray) ` - a facilitation method for creating loggers
* `module.exports.JetLog` - the main logger class is exported

### JetLog class



### JetLog Entries

Each log message is turned to a stream object.

Props:

* [`entry.ts`](docs/entry.md#Entry+ts) - Timestamp when the entry was created
* [`entry.msg`](docs/entry.md#Entry+msg) - Log message
* [`entry.level`](docs/entry.md#Entry+level) - Log level numeric value.
* [`entry.origin`](docs/entry.md#Entry+origin) - Logger name that contained this log
* [`entry.stack`](docs/entry.md#Entry+stack) - CallSite of the log (optional)
* [`entry.extra`](docs/entry.md#Entry+extra) - Array of any extra arguments passed on log time

[See more about Entry here](docs/entry.md)

### :JetLog

Main jetlog class.

[Detailed :JetLog docs here](docs/jetlog.md)

**Most popular methods:**




## License

JetLog is MIT licensed.
