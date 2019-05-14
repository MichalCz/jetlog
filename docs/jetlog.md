<a name="JetLog"></a>

## JetLog
**Kind**: global class  

* [JetLog](#JetLog)
    * [new JetLog(options)](#new_JetLog_new)
    * [jetLog.level(value)](#JetLog+level)  [<code>JetLog</code>](#JetLog)
    * [jetLog.error()](#JetLog+error)
    * [jetLog.warn()](#JetLog+warn)
    * [jetLog.log()](#JetLog+log)
    * [jetLog.info()](#JetLog+info)
    * [jetLog.debug()](#JetLog+debug)
    * [jetLog.trace()](#JetLog+trace)
    * [JetLog:defaults](#JetLog.defaults)  <code>JetLogOptions</code>
    * [JetLog:JetLogOptions](#JetLog.JetLogOptions)  <code>module.scramjet:ScramjetOptions</code>

<a name="new_JetLog_new"></a>

### new JetLog(options)
Constructor of jetlog


| Param | Type | Description |
| --- | --- | --- |
| options | <code>JetLogOptions</code> | options for the logger. |

<a name="JetLog+level"></a>

### jetLog.level(value) : JetLog
Fetches a new

**Kind**: instance method of [<code>JetLog</code>](#JetLog)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | the requested log level |

<a name="JetLog+error"></a>

### jetLog.error() ⇄
Error method - adds a message to the log at level 1

**Kind**: instance method of [<code>JetLog</code>](#JetLog)  
<a name="JetLog+warn"></a>

### jetLog.warn() ⇄
Warn method - adds a message to the log at level 2

**Kind**: instance method of [<code>JetLog</code>](#JetLog)  
<a name="JetLog+log"></a>

### jetLog.log() ⇄
Log method - adds a message to the log at level 3

**Kind**: instance method of [<code>JetLog</code>](#JetLog)  
<a name="JetLog+info"></a>

### jetLog.info() ⇄
Info method - adds a message to the log at level 4

**Kind**: instance method of [<code>JetLog</code>](#JetLog)  
<a name="JetLog+debug"></a>

### jetLog.debug() ⇄
Debug method - adds a message to the log at level 5

**Kind**: instance method of [<code>JetLog</code>](#JetLog)  
<a name="JetLog+trace"></a>

### jetLog.trace() ⇄
Trace method - adds a message to the log at level 6

**Kind**: instance method of [<code>JetLog</code>](#JetLog)  
<a name="JetLog.defaults"></a>

### JetLog:defaults : JetLogOptions
Defaults

**Kind**: static property of [<code>JetLog</code>](#JetLog)  
<a name="JetLog.JetLogOptions"></a>

### JetLog:JetLogOptions : module.scramjet:ScramjetOptions
Options for JetLog

**Kind**: static typedef of [<code>JetLog</code>](#JetLog)  
**Extends**: <code>module.scramjet:ScramjetOptions</code>  
**Internal**:   
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [read_level] | <code>number</code> \| <code>string</code> | <code>Infinity</code> | minimum read level, if given, only entries of level ≤ will get processed. |
| [read_trace] | <code>boolean</code> | <code>true</code> | should the stack trace be read to identify log line and file. |
| [origin] | <code>string</code> | <code>&quot;\&quot;JetLog\&quot;&quot;</code> | a name for the logger |

