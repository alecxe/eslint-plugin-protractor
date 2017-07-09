# Discourage repeating parts of CSS selectors

In support of the [DRY principle](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) and to improve readability of page object fields definitions, this rule would try its best finding parts of CSS selectors that are unnecessarily repeated.

:thumbsdown: Consider this Page Object:

```js
var MyPage = function () {
   this.parent = $(".container #parent");
   this.child1 = $(".container #parent div:first-of-type");
   this.child2 = $(".container #parent #subcontainer > .add-client");
}
```

:thumbsup: The `.container #parent` part in this case is repeated and should be reused instead:

```js
var MyPage = function () {
   this.parent = $(".container #parent");
   this.child1 = this.parent.$("div:first-of-type");
   this.child2 = this.parent.$("#subcontainer > .add-client");
}
```

# When not to have this rule enabled

At the moment, I am not completely sure how well this rule would work for real-world Protractor codebases. 
If you see it reporting false positives, please report through the issue tracker and consider disabling the rule.
