---
layout: page
title: Scripts
permalink: /blog/
---

{% for post in site.categories.scripts %}
 + [{{ post.title }}]({{ page.url }})
{% endfor %}
