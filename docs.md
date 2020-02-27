## Classes

<dl>
<dt><a href="#LaMetric">LaMetric</a></dt>
<dd><p>A class that provides utility functions for the LaMetric json-format.</p>
</dd>
<dt><a href="#Timer">Timer</a></dt>
<dd><p>A class used to fetch data from <a href="https://github.com/InventivetalentDev">InventivetalentDevs</a> api.</p>
</dd>
<dt><a href="#JsonConfiguration">JsonConfiguration</a></dt>
<dd><p>Basic json-configuration.</p>
</dd>
<dt><a href="#TimeUtility">TimeUtility</a></dt>
<dd><p>A class that provides comparison methods for the estimated time.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#handleLegacyRequest">handleLegacyRequest(req, res)</a></dt>
<dd><p>Handles incoming requests.</p>
</dd>
<dt><a href="#handleRequest">handleRequest(req, res)</a></dt>
<dd><p>Handles requests with timer-names.</p>
</dd>
<dt><a href="#handleSummary">handleSummary(req, res)</a> ⇒ <code>Promise.&lt;{frames: {test: string, icon: string}}&gt;</code></dt>
<dd><p>Handles requests to the <i>getEstimations</i> path.</p>
</dd>
<dt><a href="#logRequest">logRequest(req, res, next)</a></dt>
<dd><p>Logs an incoming request.</p>
</dd>
<dt><a href="#stringifyResults">stringifyResults(req, result, timerName)</a> ⇒ <code>Object</code></dt>
<dd><p>&quot;Stingifies&quot; the results of a fetched result.</p>
</dd>
<dt><a href="#applyLeadingZeros">applyLeadingZeros(num, req)</a> ⇒ <code>string</code> | <code>number</code></dt>
<dd><p>Applies the leadingZeros query-parameter.</p>
</dd>
</dl>

<a name="LaMetric"></a>

## LaMetric
A class that provides utility functions for the LaMetric json-format.

**Kind**: global class  
<a name="LaMetric.generateResponse"></a>

### LaMetric.generateResponse(message, icon) ⇒
Generates a response for LaMetric devices.

**Kind**: static method of [<code>LaMetric</code>](#LaMetric)  
**Returns**: object  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | The message. |
| icon | <code>string</code> | The code of the icon that should be used. |

<a name="Timer"></a>

## Timer
A class used to fetch data from <a href="https://github.com/InventivetalentDev">InventivetalentDevs</a> api.

**Kind**: global class  

* [Timer](#Timer)
    * [.fetchData(timerKey)](#Timer.fetchData) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.magmaBoss()](#Timer.magmaBoss) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.newYear()](#Timer.newYear) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.darkAuction()](#Timer.darkAuction) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.interest()](#Timer.interest) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.spooky()](#Timer.spooky) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.winter()](#Timer.winter) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.zoo()](#Timer.zoo) ⇒ <code>Promise.&lt;Object&gt;</code>

<a name="Timer.fetchData"></a>

### Timer.fetchData(timerKey) ⇒ <code>Promise.&lt;object&gt;</code>
Fetches the estimated spawn time from the Magma-Boss-Timer api.

**Kind**: static method of [<code>Timer</code>](#Timer)  

| Param | Type | Description |
| --- | --- | --- |
| timerKey | <code>string</code> | The key of the the timers requestUrl item. |

<a name="Timer.magmaBoss"></a>

### Timer.magmaBoss() ⇒ <code>Promise.&lt;object&gt;</code>
Get the estimation for the magma-boss.

**Kind**: static method of [<code>Timer</code>](#Timer)  
<a name="Timer.newYear"></a>

### Timer.newYear() ⇒ <code>Promise.&lt;object&gt;</code>
Get the estimation for the next new-year event.

**Kind**: static method of [<code>Timer</code>](#Timer)  
<a name="Timer.darkAuction"></a>

### Timer.darkAuction() ⇒ <code>Promise.&lt;object&gt;</code>
Get the estimation for the next dark-auction.

**Kind**: static method of [<code>Timer</code>](#Timer)  
<a name="Timer.interest"></a>

### Timer.interest() ⇒ <code>Promise.&lt;object&gt;</code>
Get the estimation for the interest timer.

**Kind**: static method of [<code>Timer</code>](#Timer)  
<a name="Timer.spooky"></a>

### Timer.spooky() ⇒ <code>Promise.&lt;object&gt;</code>
Get the estimation for the spooky festival timer.

**Kind**: static method of [<code>Timer</code>](#Timer)  
<a name="Timer.winter"></a>

### Timer.winter() ⇒ <code>Promise.&lt;Object&gt;</code>
Get the estimation for the winter-event timer.

**Kind**: static method of [<code>Timer</code>](#Timer)  
<a name="Timer.zoo"></a>

### Timer.zoo() ⇒ <code>Promise.&lt;Object&gt;</code>
Get the estimation for the travelling zoo timer.

**Kind**: static method of [<code>Timer</code>](#Timer)  
<a name="JsonConfiguration"></a>

## JsonConfiguration
Basic json-configuration.

**Kind**: global class  

* [JsonConfiguration](#JsonConfiguration)
    * [new JsonConfiguration(file)](#new_JsonConfiguration_new)
    * [.set(key, val)](#JsonConfiguration+set)
    * [.get(key)](#JsonConfiguration+get) ⇒ <code>string</code> \| <code>number</code> \| <code>object</code>
    * [.isSet(key)](#JsonConfiguration+isSet) ⇒ <code>boolean</code>
    * [.default(key, val)](#JsonConfiguration+default)
    * [.defaults(obj)](#JsonConfiguration+defaults)
    * [.save(file)](#JsonConfiguration+save)

<a name="new_JsonConfiguration_new"></a>

### new JsonConfiguration(file)
Construction of JsonConfiguration.


| Param | Type | Description |
| --- | --- | --- |
| file | <code>string</code> | The configs filepath. |

<a name="JsonConfiguration+set"></a>

### jsonConfiguration.set(key, val)
Set a configuration value.

**Kind**: instance method of [<code>JsonConfiguration</code>](#JsonConfiguration)  

| Param | Type |
| --- | --- |
| key | <code>string</code> | 
| val | <code>string</code> \| <code>number</code> \| <code>object</code> | 

<a name="JsonConfiguration+get"></a>

### jsonConfiguration.get(key) ⇒ <code>string</code> \| <code>number</code> \| <code>object</code>
Get a configuration value.

**Kind**: instance method of [<code>JsonConfiguration</code>](#JsonConfiguration)  

| Param | Type |
| --- | --- |
| key | <code>string</code> | 

<a name="JsonConfiguration+isSet"></a>

### jsonConfiguration.isSet(key) ⇒ <code>boolean</code>
True if the given key is set.

**Kind**: instance method of [<code>JsonConfiguration</code>](#JsonConfiguration)  

| Param | Type |
| --- | --- |
| key | <code>string</code> | 

<a name="JsonConfiguration+default"></a>

### jsonConfiguration.default(key, val)
Set a keys default value.

**Kind**: instance method of [<code>JsonConfiguration</code>](#JsonConfiguration)  

| Param | Type |
| --- | --- |
| key | <code>string</code> | 
| val | <code>string</code> \| <code>number</code> \| <code>object</code> | 

<a name="JsonConfiguration+defaults"></a>

### jsonConfiguration.defaults(obj)
Set multiple defaults based on the given object.

**Kind**: instance method of [<code>JsonConfiguration</code>](#JsonConfiguration)  

| Param | Type |
| --- | --- |
| obj | <code>object</code> | 

<a name="JsonConfiguration+save"></a>

### jsonConfiguration.save(file)
Saves the current configuration.

**Kind**: instance method of [<code>JsonConfiguration</code>](#JsonConfiguration)  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>string</code> | Optional. The file path the configuration should be saved to. |

<a name="TimeUtility"></a>

## TimeUtility
A class that provides comparison methods for the estimated time.

**Kind**: global class  
<a name="TimeUtility.diff"></a>

### TimeUtility.diff(estimation) ⇒
Returns an object which contains the difference between present and estimation.

**Kind**: static method of [<code>TimeUtility</code>](#TimeUtility)  
**Returns**: object  

| Param | Type | Description |
| --- | --- | --- |
| estimation | <code>int</code> | The unix timestamp of the estimation. |

<a name="handleLegacyRequest"></a>

## handleLegacyRequest(req, res)
Handles incoming requests.

**Kind**: global function  

| Param | Type |
| --- | --- |
| req | <code>Request</code> | 
| res | <code>Response</code> | 

<a name="handleRequest"></a>

## handleRequest(req, res)
Handles requests with timer-names.

**Kind**: global function  

| Param | Type |
| --- | --- |
| req | <code>Request</code> | 
| res | <code>Response</code> | 

<a name="handleSummary"></a>

## handleSummary(req, res) ⇒ <code>Promise.&lt;{frames: {test: string, icon: string}}&gt;</code>
Handles requests to the <i>getEstimations</i> path.

**Kind**: global function  

| Param | Type |
| --- | --- |
| req | <code>Request</code> | 
| res | <code>Response</code> | 

<a name="logRequest"></a>

## logRequest(req, res, next)
Logs an incoming request.

**Kind**: global function  

| Param | Type |
| --- | --- |
| req | <code>Request</code> | 
| res | <code>Response</code> | 
| next | <code>function</code> | 

<a name="stringifyResults"></a>

## stringifyResults(req, result, timerName) ⇒ <code>Object</code>
"Stingifies" the results of a fetched result.

**Kind**: global function  

| Param | Type |
| --- | --- |
| req | <code>Request</code> | 
| result | <code>object</code> | 
| timerName | <code>string</code> | 

<a name="applyLeadingZeros"></a>

## applyLeadingZeros(num, req) ⇒ <code>string</code> \| <code>number</code>
Applies the leadingZeros query-parameter.

**Kind**: global function  

| Param | Type |
| --- | --- |
| num | <code>number</code> | 
| req | <code>Request</code> | 

