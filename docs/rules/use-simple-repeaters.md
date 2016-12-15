# Discourage using extended `ng-repeat` syntax in `by.repeater()` locators

Warn about using [filters, ordering or tracking](https://docs.angularjs.org/api/ng/directive/ngRepeat) inside `by.repeater()` locators.
Typically filters, ordering or tracking don't contribute to the usefulness and reliability of a locator.

Imagine you have the following elements you need to locate:

    <div ng-repeat="customer in customers | orderBy: 'id' track by $index">...</div>

Now the `| orderBy: 'id' track by $index"` part is not data-oriented and does not give any more useful or unique piece of information about the elements.

This rule would recommend against having this extra part inside `by.repeater()` values. This would be bad:

    element.all(by.repeater("customer in customers | orderBy: 'id' track by $index"));

And, this what would be better:

    element.all(by.repeater("customer in customers"));
    element.all(by.exactRepeater("customer in customers"));

## Rule details

The rule would warn if it detects a pipe - `|` inside a repeater or a `track by` substring.

Any use of the following patterns are considered warnings:

```js
element.all(by.repeater("item in items | filter : x | orderBy : order | limitTo : limit as results"));
element.all(by.repeater("item in items | filter:searchTerm"));
element.all(by.repeater("item in items track by $index"));
```

The following patterns are not warnings:

```js
element.all(by.repeater("item in items"));
element.all(by.exactRepeater("item in items"));
```
