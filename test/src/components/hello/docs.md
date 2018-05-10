---
title: Hello
description: Hello World
template: templates/components.njk
---

{% import "components/hello/templates.njk" as hello %}

# {{ page.title }}

{{ page.description }}

::: info
Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita consequatur nam hic, quod veritatis maxime exercitationem! Eligendi quod, cupiditate temporibus eaque quia dolor debitis rerum repudiandae maxime rem veniam voluptatem vitae alias a iste amet ut ab dolorum natus ipsam.
:::

## Example

### Default

::: component
{{ hello.default("World") }}
:::


### Longform

::: component A custom title
{{ hello.longform("World") }}
:::

## Description

This doesn't really do anything other than
* print `Hello World` and
* that's pretty much it…

## Code

```html
<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita consequatur nam hic, quod veritatis maxime exercitationem! Eligendi quod, cupiditate temporibus eaque quia dolor debitis rerum repudiandae maxime rem veniam voluptatem vitae alias a iste amet ut ab dolorum natus ipsam.</p>

<ul>
  <li>List item</li>
  <li>List item</li>
  <li>List item</li>
  <li>List item</li>
  <li>List item</li>
  <li>List item</li>
</ul>

<ol>
  <li>List item</li>
  <li>List item</li>
  <li>List item</li>
  <li>List item</li>
</ol>
```

Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita consequatur nam hic, quod veritatis maxime exercitationem! Eligendi quod, cupiditate temporibus eaque quia dolor debitis rerum repudiandae maxime rem veniam voluptatem vitae alias a iste amet ut ab dolorum natus ipsam.
