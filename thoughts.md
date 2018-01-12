---
layout: page
title: Thoughts
permalink: /blog/
---

{% for post in site.categories.thoughts %}
 + [{{ post.title }}]({{ page.url }})
 {{ post.excerpt }}
{% endfor %}
