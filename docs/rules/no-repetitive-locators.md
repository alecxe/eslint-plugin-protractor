# Discourage repeating locators 

This rule would warn if repetitive locators would be detected *in a single file* in support of the [DRY principle](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself). 

:thumbsdown: For example:

```js
var MyPage = function () {
   this.grids = element.all(by.css(".mygrid"));
   this.firstGrid = element.all(by.css(".mygrid")).first();
}
```

Here, `.mygrid` locator is used two times. 

:thumbsup: A better version:

```js
var MyPage = function () {
   this.grids = element.all(by.css(".mygrid"));
   this.firstGrid = this.grids.first();
}
```

Note that the rule is looking for exact duplicates of the locators - where both the `by` locator type and the value are repeated.

# When not to have this rule enabled

If this rule produces too much false positives and warns about locators being repetitive when repetition is something you have intended to have, disable the rule.
Though, I suggest leaving it enabled globally and having it disabled for specific files or problematic parts of code instead.
