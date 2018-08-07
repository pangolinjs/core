# Blog

## "First heading"

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud [exercitation ullamco laboris](components/atoms/button/button.html) nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat `inline code is available, too` cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

| This is a nice   | little table             |
| :--------------- | -----------------------: |
| it is powered by | Github flavored Markdown |

## Heading

### Another heading

Sed ut perspiciatis unde omnis iste natus error sit _voluptatem accusantium doloremque_ laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.

A bit of code:

```js
const path = require('path')

/**
 * Get temp path
 * @param {string} context Project directory
 * @param {string} [file] Optional temp file
 * @returns {string} Path to temp folder or file
 */
module.exports = function (context, file) {
  if (file) {
    return path.join(context, '.temp', file)
  }

  return path.join(context, '.temp')
}
```

There is a line
break somewhere.

### Aaaand another heading

* Hello World
* Lists for everyone!

Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, **adipisci velit, sed quia non** numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. ~~Ut enim ad minima veniam~~, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?

1. Ordered lists
*  are available too!
  * With sublists.

> Blockquote anyone?
