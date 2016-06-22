# Don't allow to shadow the built-in Protractor globals

The rule is to prevent shadowing the built-in Protractor globals, like `element` or `by`.

## Rule details

Here is the list of global variables checked for not to be shadowed:

 * `browser`
 * `protractor`
 * `element`
 * `by`
 * `$`
 * `$$`

The following patterns are considered warnings: 

```js
var element = "something";
function test (browser) {};
var protractor;
function by () {};
var $ = 1;
var a = 2, $$ = 3;
for (var by = 0; by < 10; ++by) {}
try { json = JSON.parse(input) } catch (browser) {}
switch (element) { case 1: break; default: break; }
```

The following patterns are not warnings:

```js
var element2 = "something";
element(by.id("test"));
var EC = protractor.ExpectedConditions;
var elm = $(".myclass");
var elements = $$(".myclass");
for (var i = 0; i < 10; ++i) {}
try { json = JSON.parse(input) } catch (e) {}
switch (a) { case 1: break; default: break; }
```
