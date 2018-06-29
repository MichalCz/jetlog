<a name="Entry"></a>

## Entry
Entry class

**Kind**: global class  

* [Entry](#Entry)
    * [new Entry(msg, level, origin, stack, extra)](#new_Entry_new)
    * [entry.ts](#Entry+ts)
    * [entry.msg](#Entry+msg)
    * [entry.level](#Entry+level)
    * [entry.origin](#Entry+origin)
    * [entry.stack](#Entry+stack)
    * [entry.extra](#Entry+extra)
    * [entry.message](#Entry+message)  <code>String</code>
    * [entry.text](#Entry+text)

<a name="new_Entry_new"></a>

### new Entry(msg, level, origin, stack, extra)
Single JetLog entry


| Param | Type |
| --- | --- |
| msg | <code>string</code> | 
| level | <code>number</code> | 
| origin | <code>\*</code> | 
| stack | <code>CallSite</code> | 
| extra | <code>Object</code> | 

<a name="Entry+ts"></a>

### entry.ts
**Kind**: instance property of [<code>Entry</code>](#Entry)  
**Properties**

| Type |
| --- |
| <code>Date</code> | 

<a name="Entry+msg"></a>

### entry.msg
**Kind**: instance property of [<code>Entry</code>](#Entry)  
**Properties**

| Type |
| --- |
| <code>string</code> | 

<a name="Entry+level"></a>

### entry.level
**Kind**: instance property of [<code>Entry</code>](#Entry)  
**Properties**

| Type |
| --- |
| <code>number</code> | 

<a name="Entry+origin"></a>

### entry.origin
**Kind**: instance property of [<code>Entry</code>](#Entry)  
**Properties**

| Type |
| --- |
| <code>Object</code> \| <code>string</code> | 

<a name="Entry+stack"></a>

### entry.stack
**Kind**: instance property of [<code>Entry</code>](#Entry)  
**Properties**

| Type |
| --- |
| <code>CallSite</code> | 

<a name="Entry+extra"></a>

### entry.extra
**Kind**: instance property of [<code>Entry</code>](#Entry)  
**Properties**

| Type |
| --- |
| <code>Array.&lt;Object&gt;</code> | 

<a name="Entry+message"></a>

### entry.message : String
**Kind**: instance property of [<code>Entry</code>](#Entry)  
<a name="Entry+text"></a>

### entry.text
Exposes text representation for indexing

**Kind**: instance property of [<code>Entry</code>](#Entry)  
**Internal**:   
