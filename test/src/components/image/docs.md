---
title: Image
description: Most of the time they illustrate things
template: templates/components.njk
---

{% from "components/image/templates.njk" import default as image %}

# {{ page.title }}

{{ page.description }}

::: component
{{ image("assets/water.jpg", "Foamy water") }}
:::
