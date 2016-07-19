# Recommend against making assertions inside Page Objects

This rule enforces the [Avoid using `expect()` in page objects](https://github.com/angular/protractor/blob/master/docs/style-guide.md#avoid-using-expect-in-page-objects) Protractor Style Guide recommendation.

**Important:** This rule requires plugin `settings` to have the configured "glob"-style paths (see [`minimatch`](https://github.com/isaacs/minimatch) to learn more about the supported "glob" syntax) to distinguish Page Object files from others. 

Edit your ESLint config and add (this is example configuration):

    settings: {
      "eslint-plugin-protractor":
        paths: {
          po: ["**/test/e2e/po/*.po.js"]
        }
      }
    }

If this setting is not present, the rule would be disabled.

*Note: Because ESLint uses absolute paths and it is difficult to correctly locate base path of your project from within a plugin, so it is highly suggested to use complete paths to files you want to match to leverage the risk of targeting wrong directories and files.*

## Rule details

This rule would warn if it sees `expect()` function call inside a file that matches at least one of the patterns configured in paths/po array.
