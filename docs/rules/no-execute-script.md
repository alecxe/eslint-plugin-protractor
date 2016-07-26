# Recommend against executing scripts in specs and page objects

This rule disallows using `browser.executeScript()` or `browser.executeAsyncScript()` or `browser.driver.executeScript()` or `browser.driver.executeAsyncScript()` inside spec files and page objects.
Executing scripts should rather be a part of "helpers" or "libs".

**Important:** This rule requires plugin `settings` to have the configured "glob"-style paths (see [`minimatch`](https://github.com/isaacs/minimatch) to learn more about the supported "glob" syntax) to distinguish Page Object and Spec files from others. 

Edit your ESLint config and add (this is example configuration):

    settings: {
      "eslint-plugin-protractor":
        paths: {
          po: ["**/test/e2e/po/*.po.js"],
          specs: ["**/test/e2e/specs/*.spec.js"]
        }
      }
    }

If neither `po`, nor `specs` is specified, the rule would be disabled.

*Note: Because ESLint uses absolute paths and it is difficult to correctly locate base path of your project from within a plugin, so it is highly suggested to use complete paths to files you want to match to leverage the risk of targeting wrong directories and files.*

## Rule details

This rule would warn if it sees `browser.executeScript()` or `browser.executeAsyncScript()` or `browser.driver.executeScript()` or `browser.driver.executeAsyncScript()` function calls inside a file that matches at least one of the patterns configured in paths/po and paths/specs arrays.
